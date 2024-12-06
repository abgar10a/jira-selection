import React, { useState, useEffect } from 'react';
import { view } from '@forge/bridge';
import Form, { Field, FormSection, FormFooter } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import Tag from '@atlaskit/tag';
import SectionMessage from '@atlaskit/section-message';

function ContextConfig() {
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load existing configuration if available
    view.getContext().then(({ extension }) => {
      const config = extension.configuration || {};
      setCheckboxValues(config.checkboxValues || []);
    });
  }, []);

  const addOption = () => {
    if (newOption.trim() && !checkboxValues.includes(newOption.trim())) {
      setCheckboxValues([...checkboxValues, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (optionToRemove) => {
    setCheckboxValues(checkboxValues.filter((option) => option !== optionToRemove));
  };

  const onSubmit = async () => {
    try {
      await view.submit({
        checkboxValues,
      });
    } catch {
      setError("Couldn't save the configuration");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ formProps, dirty, submitting }) => (
        <form {...formProps}>
          <FormSection>
            {error && <SectionMessage appearance="error">{error}</SectionMessage>}
            <Field name="checkboxValues" label="Configure Checkbox Values">
              {() => (
                <>
                  {checkboxValues.map((option, index) => (
                    <Tag
                      key={index}
                      text={option}
                      removeButtonText="Remove"
                      onBeforeRemoveAction={() => removeOption(option)}
                    />
                  ))}
                  <div style={{ display: 'flex', marginTop: '8px' }}>
                    <TextField
                      placeholder="Add option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      style={{ flex: '1', marginRight: '8px' }}
                    />
                    <Button appearance="primary" onClick={addOption}>
                      Add
                    </Button>
                  </div>
                </>
              )}
            </Field>
          </FormSection>
          <FormFooter>
            <ButtonGroup>
              <Button type="submit" appearance="primary" isDisabled={!dirty || submitting}>
                Save
              </Button>
              <Button appearance="subtle" onClick={view.close}>
                Cancel
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
}

export default ContextConfig;

import React, { useState, useEffect } from 'react';
import { view } from '@forge/bridge';
import Form, { Field, FormSection, FormFooter } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import Tag from '@atlaskit/tag';
import SectionMessage from '@atlaskit/section-message';

function ConfigPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load existing configuration if available
    view.getContext().then(({ extension }) => {
      const config = extension.configuration || {};
      setTitle(config.title || '');
      setDescription(config.description || '');
      setOptions(config.options || []);
    });
  }, []);

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions((prevOptions) => [...prevOptions, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (optionToRemove) => {
    setOptions((prevOptions) => prevOptions.filter((option) => option !== optionToRemove));
  };

  const onSubmit = async () => {
    try {
      await view.submit({
        title,
        description,
        options,
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

            <Field name="title" label="Title" isRequired>
              {({ fieldProps }) => (
                <TextField
                  {...fieldProps}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title for the checkbox field"
                />
              )}
            </Field>

            <Field name="description" label="Description" isRequired>
              {({ fieldProps }) => (
                <TextField
                  {...fieldProps}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description for the checkbox field"
                />
              )}
            </Field>

            <Field name="options" label="Checkbox Options">
              {() => (
                <>
                  <div style={{ marginBottom: '8px' }}>
                    {options.map((option, index) => (
                      <Tag
                        key={index}
                        text={option}
                        removeButtonText="Remove"
                        onBeforeRemoveAction={() => removeOption(option)}
                        style={{ marginRight: '8px', marginBottom: '8px' }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex' }}>
                    <TextField
                      placeholder="Add an option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      style={{ flex: 1, marginRight: '8px' }}
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
              <Button appearance="subtle" onClick={() => view.close()}>
                Cancel
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
}

export default ConfigPage;

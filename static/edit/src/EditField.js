import React, { useEffect, useState } from 'react';
import { view } from '@forge/bridge';
import styled from 'styled-components';
import Form, { Field } from '@atlaskit/form';
import Checkbox from '@atlaskit/checkbox';
import SectionMessage from '@atlaskit/section-message';

const Content = styled.div`
  margin: ${({ isIssueView }) => (isIssueView ? '24px 24px 0' : 0)};
`;

function EditField() {
  const [extensionData, setExtensionData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    view.getContext().then(({ extension }) => {
      setExtensionData(extension);
      const savedValue = extension.fieldValue || '';
      setSelectedOptions(savedValue ? savedValue.split(',') : []);
    });
  }, []);

  const onSubmit = async () => {
    try {
      // Save the selected options as a comma-separated string
      await view.submit(selectedOptions.join(','));
    } catch {
      setError("Couldn't save the custom field");
    }
  };

  const toggleOption = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((o) => o !== option)
        : [...prevSelected, option]
    );
  };

  const isIssueView = extensionData?.renderContext === 'issue-view';

  if (!extensionData) {
    return <>Loading...</>;
  }

  const { configuration } = extensionData;
  const options = configuration?.options || [];

  return (
    <Content isIssueView={isIssueView}>
      {error && <SectionMessage appearance="error">{error}</SectionMessage>}
      <Form onSubmit={onSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field name="checkboxOptions" label="Select options11">
              {() =>
                options.map((option) => (
                  <Checkbox
                    key={option}
                    name="checkboxOptions"
                    value={option}
                    label={option}
                    isChecked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                  />
                ))
              }
            </Field>
          </form>
        )}
      </Form>
    </Content>
  );
}

export default EditField;

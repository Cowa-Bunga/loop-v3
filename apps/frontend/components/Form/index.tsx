import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui';
import { useState } from 'react';
import schema from './schema.json';

export default () => {
  const [state, setState] = useState({
    region: '',
    branch: '',
  });

  return (
    <MaterialJsonSchemaForm
      schema={schema.schema}
      uiSchema={schema.ui}
      formData={state}
      onChange={({ formData }) => setState(formData)}
      onSubmit={(data: IHubDemo) => console.log('form submitted', data)}
    />
  );
};

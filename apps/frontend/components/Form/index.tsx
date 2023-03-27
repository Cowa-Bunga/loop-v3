// import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui';
import { Button } from '@mui/material'
import { useState } from 'react';
import schema from './schema.json';

export default ({ submit }) => {
  const [state, setState] = useState({
    region: '',
    branch: '',
  });

  return (<div />
    // <MaterialJsonSchemaForm
    //   schema={schema.schema}
    //   uiSchema={schema.ui}
    //   formData={state}
    //   onChange={({ formData }) => setState(formData)}
    //   submit={false}
    //   // onSubmit={(data: IHubDemo) => console.log('form submitted', data)}
    // >
    //   <div>
    //   <button type="submit">cdsdcsddc</button>
    //   </div>
    //   </MaterialJsonSchemaForm>
  );
};

import { LayoutBase, JsonForm } from '@components'
import { Container, Card, Typography, Divider } from '@mui/material'
import { useState } from '@hooks'
import { mock } from './mock'

// @see: https://jsonforms.io
// @see: https://ginkgobioworks.github.io/react-json-schema-form-builder
const Settings = () => {
  const [model] = useState(mock.data)
  return (
    <LayoutBase>
      <br />
      <br />
      <Container>
        <Card sx={{ p: 2 }}>
          <Typography variant="h5">
            Data driven dynamic json-schema form example
          </Typography>
          <Divider />
          <br />
          <JsonForm
            schema={mock.schema}
            ui={mock.ui}
            model={model}
            // onChange={setModel}
          />
        </Card>
      </Container>
    </LayoutBase>
  )
}

export default Settings

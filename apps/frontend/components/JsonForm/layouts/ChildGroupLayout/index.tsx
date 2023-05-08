import React from 'react'
import type { MaterialLayoutRendererProps } from '@jsonforms/material-renderers'
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers'
import { withJsonFormsLayoutProps } from '@jsonforms/react'
import { Hidden, Typography } from '@mui/material'

const ChildGroupLayout = (props) => {
  const { uischema, schema, path, visible, renderers } = props

  const layoutProps = {
    elements: uischema.elements,
    schema: schema,
    path: path,
    direction: 'column',
    visible: visible,
    uischema: uischema,
    renderers: renderers
  } as MaterialLayoutRendererProps

  return (
    <div style={{ padding: 0 }}>
      <Hidden xsUp={!visible}>
        <Typography variant="h5">{uischema.label}</Typography>
        <MaterialLayoutRenderer {...layoutProps} />
      </Hidden>
    </div>
  )
}

export default withJsonFormsLayoutProps(ChildGroupLayout)

import React from 'react'
import {
  MaterialLayoutRenderer,
  MaterialLayoutRendererProps
} from '@jsonforms/material-renderers/src/util/layout'
import { withJsonFormsLayoutProps } from '@jsonforms/react'
import { Typography } from '@mui/material'

const GroupRender = (props) => {
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
    <>
      <Typography>{uischema.label}</Typography>
      <MaterialLayoutRenderer {...layoutProps} />
    </>
  )
}

export default withJsonFormsLayoutProps(GroupRender)

import type { MaterialLayoutRendererProps } from '@jsonforms/material-renderers'
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers'
import { withJsonFormsLayoutProps } from '@jsonforms/react'
import { Hidden, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  return (
    <div style={{ padding: 0 }}>
      <Hidden xsUp={!visible}>
        <Typography variant="h5">{t(uischema['i18n'])}</Typography>
        <MaterialLayoutRenderer {...layoutProps} />
      </Hidden>
    </div>
  )
}

export default withJsonFormsLayoutProps(ChildGroupLayout)

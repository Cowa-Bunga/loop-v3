import { Box, CircularProgress, Modal } from '@mui/material'
import { JsonForm } from '@components'
import { useEffect, useMergeState, useState, useTranslation } from '@hooks'
import ParcelsForm from './components/ParcelsForm'
import { Actions } from './actions'
import { createJobFormLocalePathBuilder } from '@locale/locale-utils'
import { IForm } from '@pages/api/forms/[reference]/type'
import { ui } from './style'
import { memo } from 'react'

const CreateJob = ({ handleClose }: IappCreateJobProps) => {
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(true)

  const [state, setState] = useMergeState<IappCreateJobState>({
    data: { parcels: null },
    createForm: {} as IForm,
    parcelsForm: {} as IForm
  })

  useEffect(() => {
    getForms().then(() => setLoading(false))
    return
  })

  const _t = (path: string) => t(createJobFormLocalePathBuilder(path))

  const { addEmptyParcel, updateParcel, updateFormData, getForms } = Actions(state, setState)

  return (
    <Modal open onClose={handleClose} aria-labelledby={_t('aria.label')} aria-describedby={_t('aria.description')}>
      <Box sx={ui.container}>
        {isLoading ? (
          <Box sx={ui.container} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <JsonForm
              schema={state.createForm.schema}
              ui={state.createForm.ui}
              model={state.data}
              onChange={updateFormData}
            />

            <ParcelsForm
              ui={state.parcelsForm.ui}
              model={state.parcelsForm.data}
              schema={state.parcelsForm.schema}
              onChange={updateParcel}
              addParcel={addEmptyParcel}
              parcels={state.data.parcels}
            />
          </>
        )}
      </Box>
    </Modal>
  )
}

export default CreateJob

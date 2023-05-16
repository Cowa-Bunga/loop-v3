import { Box, CircularProgress, Modal } from '@mui/material'
import { JsonForm } from '@components'
import { useMergeState, useState, useTranslation } from '@hooks'
import ParcelsForm from '@pages/dashboard/components/CreateJob/components/ParcelsForm'
import { Actions } from './actions'
import { createJobFormLocalePathBuilder } from '@locale/locale-utils'
import { useEffect } from 'react'
import { IForm } from '@pages/api/forms/[reference]/type'

export interface CreateJobProps {
  handleClose: () => void
}

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: '80%',
  height: '80%',
  overflow: 'scroll'
}

interface IState {
  data: any
  createForm: IForm
  parcelsForm: IForm
}

const CreateJob = ({ handleClose }: CreateJobProps) => {
  const [isLoading, setLoading] = useState(true)

  const [state, setState] = useMergeState<IState>({
    data: {},
    createForm: {} as IForm,
    parcelsForm: {} as IForm
  })
  const { addEmptyParcel, updateParcel, updateFormData, getForms } = Actions(
    state,
    setState
  )
  const { t } = useTranslation()
  const _t = (path: string) => t(createJobFormLocalePathBuilder(path))

  useEffect(() => {
    getForms().then(() => setLoading(false))

    return
  }, [])

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby={_t('aria.label')}
      aria-describedby={_t('aria.description')}
    >
      <Box sx={style}>
        {isLoading ? (
          <Box
            sx={style}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
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

import { Box, Modal } from '@mui/material'
import { JsonForm } from '@components'
import { useMergeState, useTranslation } from '@hooks'
import { createJob } from '@pages/dashboard/components/CreateJob/create-job.schema'
import { createJobParcels } from '@pages/dashboard/components/CreateJob/create-job-parcels.schema'
import ParcelsForm from '@pages/dashboard/components/CreateJob/components/ParcelsForm'
import { Actions } from './actions'
import { createJobFormLocalePathBuilder } from '@locale/locale-utils'

export interface CreateJobProps {
  isOpen: boolean
  handleClose: () => void
}

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: '80%',
  height: '80%',
  overflow: 'scroll',
  backgroundColor: 'white'
}

const CreateJob = ({ isOpen, handleClose }: CreateJobProps) => {
  const [formData, setFormData] = useMergeState(createJob.data)
  const { addEmptyParcel, updateParcel, updateFormData } = Actions(
    formData,
    setFormData
  )
  const { t } = useTranslation()
  const _t = (path: string) => t(createJobFormLocalePathBuilder(path))

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby={_t('aria.label')}
      aria-describedby={_t('aria.description')}
    >
      <Box sx={style}>
        <JsonForm
          schema={createJob.schema}
          ui={createJob.ui}
          model={formData}
          onChange={updateFormData}
        />

        <ParcelsForm
          ui={createJobParcels.ui}
          model={createJobParcels.data}
          schema={createJobParcels.schema}
          onChange={updateParcel}
          addParcel={addEmptyParcel}
          parcels={formData.parcels}
        />
      </Box>
    </Modal>
  )
}

export default CreateJob

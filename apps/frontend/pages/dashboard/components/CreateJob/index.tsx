import { Box, Modal } from '@mui/material'
import { JsonForm } from '@components'
import { useState } from '@hooks'
import { createJob } from '@pages/dashboard/components/CreateJob/create-job.schema'

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
  p: 4,
  overflow: 'scroll'
}

const CreateJob = ({ isOpen, handleClose }: CreateJobProps) => {
  const [model] = useState(createJob.data)

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <JsonForm
          schema={createJob.schema}
          ui={createJob.ui}
          model={model}
          onChange={console.log}
        />
      </Box>
    </Modal>
  )
}

export default CreateJob

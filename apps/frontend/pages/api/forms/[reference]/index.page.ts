import { createJob } from '@pages/api/forms/[reference]/create-job.schema'
import { createJobParcels } from '@pages/api/forms/[reference]/create-job-parcels.schema'
import { IForm } from '@pages/api/forms/[reference]/type'

const GetFormAPI = async (req, res): Promise<void> => {
  const { reference } = req.query
  // const response = await handler<IForm>(req, res, 'me', 'GET')
  console.log('reference', reference)
  let data = {}

  if (reference === 'create_task_form') {
    data = createJob
  } else if (reference === 'parcels_form') {
    data = createJobParcels
  }

  res.send({
    reference,
    ...data
  } as IForm)
}

export default GetFormAPI

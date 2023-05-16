import { Actions } from '../actions'
import { IForm } from '@pages/api/forms/[reference]/type'
import fetchMock from 'jest-fetch-mock'
import { createJob } from '@pages/api/forms/[reference]/create-job.schema'
import { createJobParcels } from '@pages/api/forms/[reference]/create-job-parcels.schema'

fetchMock.enableMocks()

describe('Actions', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('should add an empty parcel to the parcels array', () => {
    const state = {
      data: {
        address: '',
        latitude: 0,
        longitude: 0,
        collectionTime: '',
        alcohol: false,
        taskNumber: '',
        customerName: '',
        mobileNo: '',
        deliveryTime: '',
        instructions: '',
        abandonFlow: [],
        deliveryFlow: [],
        taskType: '',
        parcels: []
      }
    }
    const setState = jest.fn()
    const { addEmptyParcel } = Actions(state, setState)
    addEmptyParcel()
    expect(setState).toHaveBeenCalledWith({
      data: { parcels: [{ qrCode: '', size: '' }] }
    })
  })

  it('should update an existing parcel in the parcels array', () => {
    const state = {
      data: {
        address: '',
        latitude: 0,
        longitude: 0,
        collectionTime: '',
        alcohol: false,
        taskNumber: '',
        customerName: '',
        mobileNo: '',
        deliveryTime: '',
        instructions: '',
        abandonFlow: [],
        deliveryFlow: [],
        taskType: '',
        parcels: []
      }
    }
    const setState = jest.fn()
    const { updateParcel } = Actions(state, setState)
    updateParcel(0, { qrCode: 'QR_CODE', size: 'small' })
    expect(setState).toHaveBeenCalledWith({
      data: { parcels: [{ qrCode: 'QR_CODE', size: 'small' }] }
    })
  })

  describe('updateFormData', () => {
    it('should update the forms data', () => {
      const state = {
        data: {
          address: '',
          latitude: 0,
          longitude: 0,
          collectionTime: '',
          alcohol: false,
          taskNumber: '',
          customerName: '',
          mobileNo: '',
          deliveryTime: '',
          instructions: '',
          abandonFlow: [],
          deliveryFlow: [],
          taskType: '',
          parcels: []
        }
      }
      const setState = jest.fn()
      const { updateFormData } = Actions(state, setState)
      updateFormData({ address: '123 Fake Street' })
      expect(setState).toHaveBeenCalledWith({
        data: { address: '123 Fake Street' }
      })
    })

    it('should not update the forms data', () => {
      const state = {
        data: {
          address: '123 Fake Street',
          latitude: 0,
          longitude: 0,
          collectionTime: '',
          alcohol: false,
          taskNumber: '',
          customerName: '',
          mobileNo: '',
          deliveryTime: '',
          instructions: '',
          abandonFlow: [],
          deliveryFlow: [],
          taskType: '',
          parcels: []
        }
      }
      const setState = jest.fn()
      const { updateFormData } = Actions(state, setState)
      updateFormData(state.data)
      expect(setState).not.toHaveBeenCalled()
    })
  })

  it('should get the forms from the api', async () => {
    const state = {
      data: {},
      createForm: {} as IForm,
      parcelsForm: {} as IForm
    }
    const setState = jest.fn()
    const { getForms } = Actions(state, setState)

    fetchMock.mockResponseOnce(JSON.stringify(createJob))
    fetchMock.mockResponseOnce(JSON.stringify(createJobParcels))

    await getForms()

    expect(setState).toHaveBeenCalledWith({
      data: createJob.data,
      createForm: createJob,
      parcelsForm: createJobParcels
    })
  })
})

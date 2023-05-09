import { Actions } from '../actions'

describe('Actions', () => {
  it('should add an empty parcel to the parcels array', () => {
    const state = {
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
    const setState = jest.fn()
    const { addEmptyParcel } = Actions(state, setState)
    addEmptyParcel()
    expect(setState).toHaveBeenCalledWith({
      parcels: [{ qrCode: '', size: '' }]
    })
  })

  it('should update an existing parcel in the parcels array', () => {
    const state = {
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
    const setState = jest.fn()
    const { updateParcel } = Actions(state, setState)
    updateParcel(0, { qrCode: 'QR_CODE', size: 'small' })
    expect(setState).toHaveBeenCalledWith({
      parcels: [{ qrCode: 'QR_CODE', size: 'small' }]
    })
  })

  describe('updateFormData', () => {
    it('should update the forms data', () => {
      const state = {
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
      const setState = jest.fn()
      const { updateFormData } = Actions(state, setState)
      updateFormData({ address: '123 Fake Street' })
      expect(setState).toHaveBeenCalledWith({
        address: '123 Fake Street'
      })
    })

    it('should not update the forms data', () => {
      const state = {
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
      const setState = jest.fn()
      const { updateFormData } = Actions(state, setState)
      updateFormData(state)
      expect(setState).not.toHaveBeenCalled()
    })
  })
})

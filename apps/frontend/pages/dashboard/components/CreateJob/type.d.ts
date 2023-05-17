interface IappCreateJobProps {
  handleClose: () => void
}
interface IappCreateJobState {
  data: {
    parcels: any
  }
  createForm: IForm
  parcelsForm: IForm
  parcels?: any[]
}

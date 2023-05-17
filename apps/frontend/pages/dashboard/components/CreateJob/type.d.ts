interface IappCreateJobProps {
  handleClose: () => void
}
interface IappCreateJobState {
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parcels: any[] | null
  }
  createForm: IForm
  parcelsForm: IForm
  parcels?: unknown[] | void
}

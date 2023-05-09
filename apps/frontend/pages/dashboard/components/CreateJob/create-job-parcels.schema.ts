export const createJobParcels = {
  schema: {
    type: 'object',
    properties: {
      qrCode: {
        type: 'string'
      },
      size: {
        type: 'string',
        enum: ['small', 'medium', 'large'] // enums should be localized keys
      }
    }
  },

  ui: {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'TextInputControl',
        scope: '#/properties/qrCode',
        i18n: 'create_task_form.parcels.qrCode'
      },
      {
        type: 'DropdownControl',
        scope: '#/properties/size',
        i18n: 'create_task_form.parcels.size'
      }
    ]
  },

  data: {
    qrCode: '',
    size: ''
  }
}

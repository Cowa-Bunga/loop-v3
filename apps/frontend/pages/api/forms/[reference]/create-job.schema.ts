export const createJob = {
  schema: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        options: {
          api_key: 'AIzaSyCgiluwpE3dNxGLL_iAPaV4SKZDTm_tpME',
          update_lat_long: true
        }
      },
      latitude: {
        type: 'integer'
      },
      longitude: {
        type: 'integer'
      },
      collectionTime: {
        type: 'string',
        format: 'date'
      },
      alcohol: {
        type: 'boolean'
      },
      taskNumber: {
        type: 'string'
      },
      customerName: {
        type: 'string'
      },
      mobileNo: {
        type: 'string'
      },
      deliveryTime: {
        type: 'string',
        format: 'date'
      },
      instructions: {
        type: 'string'
      },
      abandonFlow: {
        type: 'string',
        enum: ['sog', 'otp', 'img', 'qrCode', 'item'], // enums should be localized keys
        options: {
          oneOf: ['item', 'qrCode']
        }
      },
      deliveryFlow: {
        type: 'string',
        enum: ['sog', 'otp', 'img', 'qrCode', 'item'] // enums should be localized keys
      },
      taskType: {
        type: 'string',
        enum: ['delivery', 'collection'] // enums should be localized keys
      }
    },
    required: [
      'collectionTime',
      'deliveryTime',
      'taskType',
      'customerName',
      'mobileNo',
      'taskNumber',
      'address',
      'latitude',
      'longitude'
    ]
  },

  ui: {
    type: 'Group',
    label: 'Create Task',
    i18n: 'create_task_form.title.label',
    elements: [
      {
        type: 'HorizontalLayout',
        elements: [
          // Left Side
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'GooglePlacesControl',
                scope: '#/properties/address',
                i18n: 'create_task_form.address'
              },
              {
                type: 'TextInputControl',
                scope: '#/properties/latitude',
                i18n: 'create_task_form.latitude'
              },
              {
                type: 'TextInputControl',
                scope: '#/properties/longitude',
                i18n: 'create_task_form.longitude'
              },
              {
                type: 'DateTimeControl',
                scope: '#/properties/collectionTime',
                i18n: 'create_task_form.collectionTime'
              },
              {
                type: 'CheckboxControl',
                scope: '#/properties/alcohol',
                i18n: 'create_task_form.alcohol'
              }
            ]
          },
          // Right Side
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'TextInputControl',
                scope: '#/properties/taskNumber',
                i18n: 'create_task_form.taskNumber'
              },
              {
                type: 'TextInputControl',
                scope: '#/properties/customerName',
                i18n: 'create_task_form.customerName'
              },
              {
                type: 'PhoneNumberControl',
                scope: '#/properties/mobileNo',
                i18n: 'create_task_form.mobileNo'
              },
              {
                type: 'DateTimeControl',
                scope: '#/properties/deliveryTime',
                i18n: 'create_task_form.deliveryTime'
              },
              {
                type: 'TextInputControl',
                scope: '#/properties/instructions',
                i18n: 'create_task_form.instructions'
              },
              {
                type: 'DropdownControl',
                scope: '#/properties/taskType',
                i18n: 'create_task_form.taskType'
              }
            ]
          }
        ]
      },
      {
        type: 'ChildGroup',
        label: 'Delivery/Abandon Flows',
        i18n: 'create_task_form.proof.label',
        elements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'MultiSelectControl',
                scope: '#/properties/deliveryFlow',
                i18n: 'create_task_form.deliveryFlow'
              },
              {
                type: 'MultiSelectControl',
                scope: '#/properties/abandonFlow',
                i18n: 'create_task_form.abandonFlow'
              }
            ]
          }
        ]
      }
    ]
  },

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

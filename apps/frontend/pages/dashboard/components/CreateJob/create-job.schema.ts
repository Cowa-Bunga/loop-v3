export const createJob = {
  schema: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        enum: ['1 Main Street', '2 Main Street', '3 Main Street']
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
        enum: ['sog', 'otp', 'img', 'qrCode', 'item'] // enums should be localized keys
      },
      deliveryFlow: {
        type: 'string',
        enum: ['sog', 'otp', 'img', 'qrCode', 'item'] // enums should be localized keys
      },
      taskType: {
        type: 'string',
        enum: ['delivery', 'collection'] // enums should be localized keys
      },
      parcels: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            qrCode: {
              type: 'string'
            },
            size: {
              type: 'string',
              enum: ['small', 'medium', 'large'] // enums should be localized keys
            }
          },
          required: ['qrCode', 'size']
        }
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
    label: 'Create Task Form',
    i18n: 'create_task_form.title',
    elements: [
      {
        type: 'HorizontalLayout',
        elements: [
          // Left Side
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address',
                options: {
                  autocomplete: true
                },
                i18n: 'create_task_form.address'
              },
              {
                type: 'Control',
                scope: '#/properties/latitude',
                i18n: 'create_task_form.latitude'
              },
              {
                type: 'Control',
                scope: '#/properties/longitude',
                i18n: 'create_task_form.longitude'
              },
              {
                type: 'Control',
                scope: '#/properties/collectionTime',
                i18n: 'create_task_form.collectionTime'
              },
              {
                type: 'Control',
                scope: '#/properties/alcohol',
                i18n: 'create_task_form.alcohol'
              },
              {
                type: 'Control',
                scope: '#/properties/abandonFlow',
                i18n: 'create_task_form.abandonFlow',
                options: {
                  multi: true
                }
              }
            ]
          },
          // Right Side
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/taskNumber',
                i18n: 'create_task_form.taskNumber'
              },
              {
                type: 'Control',
                scope: '#/properties/customerName',
                i18n: 'create_task_form.customerName'
              },
              {
                type: 'Control',
                scope: '#/properties/mobileNo',
                i18n: 'create_task_form.mobileNo'
              },
              {
                type: 'Control',
                scope: '#/properties/deliveryTime',
                i18n: 'create_task_form.deliveryTime'
              },
              {
                type: 'Control',
                scope: '#/properties/instructions',
                i18n: 'create_task_form.instructions'
              },
              {
                type: 'Control',
                scope: '#/properties/deliveryFlow',
                i18n: 'create_task_form.deliveryFlow',
                options: {
                  multi: true
                }
              },
              {
                type: 'Control',
                scope: '#/properties/taskType',
                i18n: 'create_task_form.taskType'
              }
            ]
          }
        ]
      },
      // Bottom optional items like QR Codes and Items...
      {
        type: 'Group',
        i18n: 'create_task_form.parcels',
        elements: [
          {
            type: 'HorizontalLayout',
            scope: '#/properties/parcels',
            i18n: 'create_task_form.parcels',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/parcels/items/properties/qrCode',
                i18n: 'create_task_form.parcels.qrCode'
              },
              {
                type: 'Control',
                scope: '#/properties/parcels/items/properties/size',
                i18n: 'create_task_form.parcels.size'
              }
            ]
          }
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#',
            schema: {
              anyOf: [
                {
                  properties: {
                    deliveryFlow: {
                      const: 'qrCode'
                    }
                  },
                  required: ['deliveryFlow']
                },
                {
                  properties: {
                    abandonFlow: {
                      const: 'qrCode'
                    }
                  },
                  required: ['abandonFlow']
                }
              ]
            }
          }
        }
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
    abandonFlow: '',
    deliveryFlow: '',
    taskType: '',
    parcels: [
      {
        qr_code: '',
        size: ''
      }
    ]
  }
}

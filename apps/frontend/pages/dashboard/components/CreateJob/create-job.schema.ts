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
            qr_code: {
              type: 'string'
            },
            size: {
              type: 'string',
              enum: ['small', 'medium', 'large'] // enums should be localized keys
            }
          },
          required: ['qr_code', 'size']
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
                }
              },
              {
                type: 'Control',
                scope: '#/properties/latitude'
              },
              {
                type: 'Control',
                scope: '#/properties/longitude'
              },
              {
                type: 'Control',
                scope: '#/properties/collectionTime'
              },
              {
                type: 'Control',
                scope: '#/properties/alcohol'
              },
              {
                type: 'Control',
                scope: '#/properties/abandonFlow',
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
                scope: '#/properties/taskNumber'
              },
              {
                type: 'Control',
                scope: '#/properties/customerName'
              },
              {
                type: 'Control',
                scope: '#/properties/mobileNo'
              },
              {
                type: 'Control',
                scope: '#/properties/deliveryTime'
              },
              {
                type: 'Control',
                scope: '#/properties/instructions'
              },
              {
                type: 'Control',
                scope: '#/properties/deliveryFlow',
                options: {
                  multi: true
                }
              },
              {
                type: 'Control',
                scope: '#/properties/taskType'
              }
            ]
          }
        ]
      },
      // Bottom optional items like QR Codes and Items...
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/parcels',
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

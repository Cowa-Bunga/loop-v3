/// <reference types="Cypress" />

describe('cb-driver-api', () => {
  it('should simulate new app fcm', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/pooling/simulate/fcm'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it(`should updates driver's push token`, () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/update/push-token'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should send SOS', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/send/sos'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should me - get logged in driver', () => {
    cy.request({ method: 'get', url: 'http://localhost:8080/driver/me' }).then(
      (resp) => {
        // Assertions here
        expect(resp.status).to.equal(200)
      }
    )
  })

  it('should start lunch', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/start-lunch'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should end lunch', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/end-lunch'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should go online', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/go-online'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should go offline', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/go-offline'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should simulate push notification - (deprecated)', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/notify-fcm'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get trip', () => {
    cy.request({
      method: 'get',
      url: 'http://localhost:8080/trip/ckw3pYRwD8FJNznzyU2r/client/6IB4FgVQZyQIG9T2xdEx'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should check wallet', () => {
    cy.request({
      method: 'get',
      url: 'http://localhost:8080/trip/ke3QmxMCSosaFRX8ga31/client/YmuHJz2QrNqwznyG1Y9D'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should accept trip', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/accept'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should accept adhoc 2', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/acceptAdhoc'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should reject trip', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/reject'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should trip notification received', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/received/notification'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should rollback trip - (deprecated)', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/rollback'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should arrived at branch/collection point', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/arrived/collection-point'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should start trip', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/start'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should collect order', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/collect'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should collect order with parcels', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/collect-with-parcels'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should in transit (driver departed)', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/in-transit'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should arrived at customer', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/arrived-at-customer'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should new abandon order', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/abandon'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should deliver order', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/deliver'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should abandon order (deprecated)', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/abandon-order'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should signed POD after delivery -  (deprecated)', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/sign/pod'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should end trip', () => {
    cy.request({ method: 'post', url: 'http://localhost:8080/trip/end' }).then(
      (resp) => {
        // Assertions here
        expect(resp.status).to.equal(200)
      }
    )
  })

  it('should driver event webhook', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/driver/activity'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should return order', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/return'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get trip Copy 2', () => {
    cy.request({
      method: 'get',
      url: 'http://localhost:8080/trip/HiH83P7y3iDGjtNO5MUj/client/YmuHJz2QrNqwznyG1Y9D'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should reject adhoc order', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/trip/rejectAdhoc'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should update parcels', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/update/parcels'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should update order payment fields', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/update/payment-fields'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should verify order cash pin', () => {
    cy.request({
      method: 'post',
      url: 'http://localhost:8080/order/payment/verify-pin'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })
})

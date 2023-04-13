/// <reference types="Cypress" />

describe('cb-dos-api', () => {
  it('should get loggedin user info', () => {
    cy.request({ method: 'get', url: 'http://{{base_url}}/me' }).then(
      (resp) => {
        // Assertions here
        expect(resp.status).to.equal(200)
      }
    )
  })

  it('should get drivers - servicing hub', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/drivers/hub/IWKb2xsLtnAgR2UqqmuN'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get drivers - servicing region', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/drivers/region/xSxl3SeETEQXZRyCjzOU'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get driver', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/drivers/oLpggkccIMOw2Cm7LKwI'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should acknowledge driver sos', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/drivers/HfU5uxdyrlifalIamJNW/acknowledge-sos'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should cancel order', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/orders/U7bGd1ValUgCnk9UaS2C/cancel'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should reset order', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/orders/w0fElhy0e6Eu8em7EbaU/reset'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should driver returned order', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/orders/y6WFlBd8keZ9YEEyHcsD/returned'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should cancel order in a trip', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/orders/L233jwHGtRzRlh64AYqx/cancel/in/trip'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should create order - without parcels', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/orders/create'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should set order assignable', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/orders/9THPpCvIfzOOfrzP0RbR/set-order-asignable'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get order', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/orders/EF2TrA5Smo8jmr6MhSRS'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get orders', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/orders/branch/0sBcNNQzHoRDciNv4wqg'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get active orders', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/orders/active'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get abandoned orders', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/orders/abandoned'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should mark order as returned', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/orders/y13Peqf1iRJ5qOKURitn/returned'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get trips', () => {
    cy.request({ method: 'get', url: 'http://{{base_url}}/trips' }).then(
      (resp) => {
        // Assertions here
        expect(resp.status).to.equal(200)
      }
    )
  })

  it('should create trip (fail safe)', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/trips/create'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should create trip manual (fail safe)', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/trips/create-manual'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get trip', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/trips/lOz50EBqEkgYNxUsMhVi'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should assign driver to trip', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/trips/zpjbRYHHfescHI3zHrs1/assign-driver'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should remove driver from trip', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/trips/zpjbRYHHfescHI3zHrs1/remove-driver'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get active clusters', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/clusters/branch/1g9ckRkuzBl8B6Kmvf4J'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should get cluster', () => {
    cy.request({
      method: 'get',
      url: 'http://{{base_url}}/clusters/fZC9UOnBKkQd9I0zLvhP'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })

  it('should lock cluster prematurely', () => {
    cy.request({
      method: 'post',
      url: 'http://{{base_url}}/clusters/fZC9UOnBKkQd9I0zLvhP/lock-cluster'
    }).then((resp) => {
      // Assertions here
      expect(resp.status).to.equal(200)
    })
  })
})

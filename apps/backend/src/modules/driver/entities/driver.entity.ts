import { DocumentSnapshot } from '@google-cloud/firestore'

export class EssentialDriver {
  id: string
  name: string

  constructor(driver: DocumentSnapshot) {
    const data = driver.data()
    this.id = driver.id
    this.name = data.name
  }
  getEssentialData() {
    return {
      id: this.id,
      name: this.name
    }
  }
}

export class Driver extends EssentialDriver {
  constructor(driver: DocumentSnapshot) {
    super(driver)
  }
}

import { Injectable } from '@nestjs/common'
import { ClientRequest } from '../../shared/entities/request.entity'

@Injectable()
export class NotificationService {
  async sendTrackingPage(client: ClientRequest) {
    if (client.settings.sms_enabled) {
      console.log('Sending tracking page via SMS')
      // create CM account.
    }
  }
}

import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
        getClientId(): string {
            // Replace this with your actual implementation to get the client_id
            return 'client_id'
          }
      }

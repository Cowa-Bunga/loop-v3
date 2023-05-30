import { Type, applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

class ApiDocument {
  service: string
  operation?: string
  ok_response?: string
  bad_request_response?: string

  constructor(args) {
    this.service = args.service
    this.operation = args.operation
    this.ok_response = args.ok_response
    this.bad_request_response = args.bad_request_response
  }

  getOperation(): string {
    return `Retrieves all ${this.service} documents`
  }

  getOkResponse(): string {
    return this.ok_response || `The document was returned successfully`
  }

  getBadRequest(): string {
    return this.bad_request_response || `Invalid input data provided.`
  }
}

class ApiGetDocument extends ApiDocument {
  constructor(args) {
    super(args)
  }

  getOperation(): string {
    return `Retrieve ${this.service} object for given id`
  }
}

class ApiPostDocument extends ApiDocument {
  created_response?: string

  constructor(args) {
    super(args)
    this.created_response = args.created_response
  }

  getOperation(): string {
    return `Creates a new ${this.service} object`
  }

  getCreatedResponse(): string {
    return this.created_response || `The ${this.service} has been successfully created.`
  }
}

export type ApiDocOptions = {
  operation_content?: string
  ok_response_content?: string
  bad_request_response_content?: string
  created_response?: string
}

export function ApiGetRequest(service: string, options?: ApiDocOptions) {
  const content = new ApiDocument({ service, ...options })
  return applyDecorators(
    ApiOperation({ summary: content.getOperation() }),
    ApiOkResponse({ description: content.getOkResponse() }),
    ApiBadRequestResponse({ description: content.getBadRequest() })
  )
}

export function ApiGetOneRequest(service: string, options?: ApiDocOptions) {
  const content = new ApiGetDocument({ service, ...options })
  return applyDecorators(
    ApiOperation({ summary: content.getOperation() }),
    ApiOkResponse({ description: content.getOkResponse() }),
    ApiBadRequestResponse({ description: content.getBadRequest() })
  )
}

export function ApiPostRequest(service: string, dto: Type<unknown>, options?: ApiDocOptions) {
  const content = new ApiPostDocument({ service, ...options })

  return applyDecorators(
    ApiOperation({ summary: content.getOperation() }),
    ApiCreatedResponse({ description: content.getCreatedResponse() }),
    ApiBadRequestResponse({
      description: content.getBadRequest()
    }),
    ApiBody({ type: dto })
  )
}

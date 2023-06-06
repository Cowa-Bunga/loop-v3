import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { FormsService } from './forms.service'
import { CreateFormDto } from './dto/create-form.dto'
import { UpdateFormDto } from './dto/create-form-submission.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('forms')
@ApiTags('Forms Service')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('model/:id')
  @ApiOperation({ summary: '∞ Create a new form model' })
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto)
  }

  @Get('model/:id')
  @ApiOperation({ summary: '∞ Get a form model by id' })
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id)
  }
}

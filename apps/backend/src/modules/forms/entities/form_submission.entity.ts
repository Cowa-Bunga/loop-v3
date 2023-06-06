import { Column, Entity, RelationId, PrimaryGeneratedColumn } from 'typeorm'
import { Form } from './form.entity'
import { ExtendedColumnOptions, AutoEncryptSubscriber, JSONEncryptionTransformer } from 'typeorm-encrypted'
import { JsonEncryptionConfig } from '../../../shared/utils/encryption.utils'

@Entity('form_submission')
export class FormSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  client_id: string

  @Column()
  @RelationId('form.id')
  form_id: string

  // test if json compliant / workable
  @Column({
    type: 'json',
    nullable: false,
    transformer: new JSONEncryptionTransformer(JsonEncryptionConfig)
  })
  data: JSON

  @Column()
  assets: JSON

  @Column()
  created: Date

  @Column()
  created_by: string

  @Column()
  last_updated: Date
}

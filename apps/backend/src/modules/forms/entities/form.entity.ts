import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * @rule ROF - rule of forms
 * @desc Forms can be revised with new versions but never updated / deleted (create/read only)
 */
@Entity('form')
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  schema: JSON

  @Column()
  ui_schema: JSON

  @Column()
  data_schema: JSON

  @Column()
  active: boolean

  @Column()
  created_by?: string

  @Column()
  revision: boolean

  @Column()
  revision_ref: string
}

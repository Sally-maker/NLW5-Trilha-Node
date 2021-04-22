import {Entity, CreateDateColumn, Column, PrimaryColumn} from 'typeorm'


import { v4 as uuid } from 'uuid'

@Entity()
class User {
  @PrimaryColumn()
  Id: string

   @Column()
  email: string

  @CreateDateColumn()
  create_at: Date


  constructor(){
    if(!this.Id){
      this.Id = uuid()
    }
  }
}


export {User}
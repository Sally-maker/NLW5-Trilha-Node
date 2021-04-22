import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

import {v4 as uuid} from 'uuid'
import { User } from './User'


@Entity("Connections")
class Connection{
  @PrimaryColumn()
   id:string

   @Column()
   admin_id:string

   @Column()
   user_id:string

   @Column()
   socket_id:string

   @JoinColumn({name: "user_id"})
   @ManyToOne(()=> User)
   user:User

    @CreateDateColumn()
   create_at:Date
   @UpdateDateColumn()
   update_at: Date


   constructor(){
     if(!this.id){
       this.id = uuid()
     }
   }
}

export {Connection} 
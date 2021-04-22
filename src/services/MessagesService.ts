import { getCustomRepository, Repository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository"
import { Message } from '../entities/message'

interface IMessageCreate{
 admin_id?:string
 text:string
 user_id:string
}
 
class MessagesService {
  private MessagesRepo: Repository<Message>

  constructor(){
    this.MessagesRepo = getCustomRepository(MessagesRepository)
  }
  async create({admin_id, text, user_id}:IMessageCreate){

  const message =  this.MessagesRepo.create({
     admin_id,
     text,
     user_id,
   })

   await this.MessagesRepo.save(message)

   return message
  }

  async listByUser(user_id:string){
     const list = await this.MessagesRepo.find({
       where:{user_id},
       relations: ['user']
     })
     return list
  }

}

export {MessagesService}
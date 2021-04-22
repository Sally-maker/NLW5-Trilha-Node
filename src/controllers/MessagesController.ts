import {Request, Response, text} from 'express'
import { MessagesService } from '../services/MessagesService'


class MessagesController {
  async create(req:Request, res:Response){

    const {admin_id, text, user_id} = req.body
    const Messages = new MessagesService()

    const message = await Messages.create({
      admin_id,
      text,
      user_id
    })

    return res.json(message)
  }

  async showByUser(req:Request, res:Response){
    const {id} = req.params

    const MessagesServicee = new MessagesService()

    const list = await MessagesServicee.listByUser(id)

    return res.json(list)
  }
}
export {MessagesController}
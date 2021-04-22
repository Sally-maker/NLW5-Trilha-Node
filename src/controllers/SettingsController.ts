import {Response, Request, } from 'express'
import { SettingsService } from '../services/SettingsService'


class SettingsController {
   
  async create(req:Request,res:Response){
      const {chat , username} = req.body

      const SettingsServices = new SettingsService()

    try {
      const settingsss = await SettingsServices.create({chat, username})

      return res.json(settingsss)

    } catch (error) {
       return res.status(400).json({
         message:error.message
       })
    }
  }

  async findByUserName(req:Request,res:Response){
    const {username} = req.params

    const SettingsServicee = new SettingsService()

    const settings = await SettingsServicee.findByUserName(username)
    return res.json(settings)
  }

  async update(req:Request,res:Response){
    const {username} = req.params
    const {chat } = req.body

    const SettingsServicee = new SettingsService()

    const settings = await SettingsServicee.update(username,chat)
    return res.json(settings)
}
}


export { SettingsController }
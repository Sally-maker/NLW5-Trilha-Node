import {getCustomRepository, Repository} from 'typeorm'
import { Setting } from '../entities/Setting'
import {SettingsRepositories} from '../repositories/SettingsRepositories'



interface ISettingsCreate {
  chat: boolean,
  username: string
}


class SettingsService {
  private settingsRepo: Repository<Setting>
  constructor(){
    this.settingsRepo = getCustomRepository(SettingsRepositories)
  }
  async create({chat, username}: ISettingsCreate){

    
    const UserExist = await this.settingsRepo.findOne({username})

    if(UserExist){
      throw new Error("User already exists") 
    }

   const Usersettingsss = this.settingsRepo.create({
      chat,
      username,
    })
  
    await this.settingsRepo.save(Usersettingsss)
    return Usersettingsss
  }
  async findByUserName(username:string){
    const settings = await this.settingsRepo.findOne({
      username
    })
    return settings
  }

  async update(username:string, chat:boolean){
    const settings = await this.settingsRepo.createQueryBuilder()
    .update(Setting)
    .set({chat})
    .where("username = :username",{
      username
    }).execute()
  }
} 

export { SettingsService }
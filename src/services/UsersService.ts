import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UsersRepository"


class UserService {

  private UsersRepo:Repository<User>
  constructor(){
    this.UsersRepo = getCustomRepository(UserRepository)
  }
  async create(email:string){

    const UserAlreadyExist = await this.UsersRepo.findOne({
      email,
    })

    if(UserAlreadyExist){
      return UserAlreadyExist
    }

    const user = this.UsersRepo.create({
      email,
    })

    await this.UsersRepo.save(user)

    return user
  }
  async findByEmail(email: string) {
    const user = await this.UsersRepo.findOne({ email });
  
    return user;
  }
}

export { UserService }
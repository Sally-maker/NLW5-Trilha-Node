import { Request, Response} from 'express'
import { UserService } from '../services/UsersService'



class UsersController {
  async create(Request:Request, Response:Response):Promise<Response>{
    const { email } = Request.body

    const Users = new UserService()

     const user = await Users.create(email)

     return Response.json(user)
  }
}

export {UsersController}
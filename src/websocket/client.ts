import {io} from '../http'
import {ConnectionService} from '../services/ConnetionService'
import {UserService} from '../services/UsersService'
import {MessagesService} from '../services/MessagesService'

interface IParams{
  text:string
  email:string
}

io.on("connect", (socket)=>{
  const connectionService = new ConnectionService()
  const userService = new UserService()
  const messagesService = new MessagesService()


  socket.on("client_first_access", async(params) =>{
    const socket_id = socket.id
    const {text, email} = params as IParams
    let user_id = null

   const UserExist = await userService.findByEmail(email)

   if(!UserExist){
     const user = await userService.create(email)
     await connectionService.create({
      socket_id,
      user_id : user.Id
    })

    user_id = user.Id

   }else{
      user_id = UserExist.Id
     const connection = await connectionService.findByUserId(UserExist.Id)
     if(!connection){
       
       await connectionService.create({
         socket_id,
         user_id :UserExist.Id
       })

     }else{
       connection.socket_id = socket_id
       await connectionService.create(connection)
     }

   }

   await messagesService.create({
     text,
     user_id
   })

   const allMessages = await messagesService.listByUser(user_id)
    
   socket.emit("client_list_all_messages", allMessages)

   const allUsers = await connectionService.findAllAdmin()
   io.emit("admin_list_all_users", allUsers)


  })
  socket.on("client_send_to_admin", async(params) =>{
    const {text ,socket_admin_id} = params 

    const socket_id = socket.id

    const {user_id} = await connectionService.findBySocketId(socket_id)
  

    const message = await messagesService.create({
      text,
      user_id
    })
    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id:socket.id
    })
  })
})
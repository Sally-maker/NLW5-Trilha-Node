import {io} from '../http'
import { ConnectionService } from '../services/ConnetionService'
import { MessagesService } from '../services/MessagesService'

io.on("connect",async (socket)=>{
  const connectionService = new ConnectionService()
  const messagesServicee = new MessagesService()
  const allConnectionadmin = await connectionService.findAllAdmin()

  io.emit("admin_list_all_users", allConnectionadmin)

  socket.on("admin_list_messages_by_user", async(params, callback) => {
    const {user_id} = params 

    const allMessages = await messagesServicee.listByUser(user_id)

    callback(allMessages)
  })

  socket.on("admin_send_message", async(params) =>{
    const {user_id, text} = params  


    await messagesServicee.create({
      text,
      user_id,
      admin_id:socket.id
    })

    const {socket_id} = await connectionService.findByUserId(user_id)
    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id:socket.id
    })
  })

  socket.on("admin_user_in_support", async(params) =>{
    const {user_id} = params
    await connectionService.updateAdminId(user_id, socket.id)

    const allConnectionadmin = await connectionService.findAllAdmin()

    io.emit("admin_list_all_users", allConnectionadmin)
  })
})  
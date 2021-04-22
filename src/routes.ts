import { Router } from 'express'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'
import { MessagesController } from './controllers/MessagesController'



const routes = Router()

const SettingsControllerr = new SettingsController()
const UsersControllerr = new UsersController()
const MessagesControllerr = new MessagesController()


routes.post('/settings', SettingsControllerr.create)
routes.get('/settings/:username', SettingsControllerr.findByUserName)
routes.put('/settings/:username', SettingsControllerr.update)


routes.post('/users', UsersControllerr.create)
routes.post('/messages', MessagesControllerr.create)
routes.get('/messages/:id', MessagesControllerr.showByUser)




export { routes }
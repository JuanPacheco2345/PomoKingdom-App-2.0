import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js"
import CharacterDAO from "./dao/characterDAO.js"
import FriendsDAO from "./dao/friendsDAO.js"
import TasksDAO from "./dao/tasksDAO.js"
import ItemShopDAO from "./dao/itemshopDAO.js"
import conversationsDAO from "./routes/conversationsDAO.js"
import messagesDAO  from "./routes/messagesDAO.js"
import InventoryDAO from "./dao/inventoryDAO.js"
import groupupDAO from "./dao/groupupDAO.js"
import notifyDAO from "./dao/notifyDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.USERDETAILS_DB_URI, {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    },
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await UsersDAO.injectDB(client)
    await CharacterDAO.injectDB(client)
    await FriendsDAO.injectDB(client)
    await TasksDAO.injectDB(client)
    await ItemShopDAO.injectDB(client)
    await InventoryDAO.injectDB(client)
    await conversationsDAO.injectDB(client)
    await messagesDAO.injectDB(client)
    await groupupDAO.injectDB(client)
    await notifyDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

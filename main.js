import express from "express"
import prodRouter from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import ProductManager from "./controllers/ProductManager.js"
import {Server} from "socket.io"


//------------------Configuracion Inicial--------------------------------------//
//El funcionamiento se valido con la extensión Thunder Client desde Visual Studio Code
const app = express()
//Se define puerto 8080 para ejecutar la aplicacion
const PORT = 8080
//LLamamos a ProductManager() para acceder a los productos desde el archivo JSON//
const product = new ProductManager()
//-----------------------------------------------------------------------------//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//---------------------------------------------------------------------//
//-------------Validación de conexión mostrando el puerto-----------------//
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})
//-------------------------------------------------------------------------//
//-------------------------Socket.io-----------------------------------//

const socketServer = new Server(httpServer)


socketServer.on("connection", socket => {
    console.log("Nuevo Cliente Conectado")
//------Recibir información del cliente----------//
    socket.on("message", data => {
        console.log(data)
    })
//-----------------------------------------------//

    socket.on("newProd", (newProduct) => {
        product.addProducts(newProduct)
        socketServer.emit("success", "Producto Agregado Correctamente");
    });
//-----------------------------Enviar información al cliente----------------------------------//
    socket.emit("test","mensaje desde servidor a cliente, se valida en consola de navegador")
//--------------------------------------------------------------------------------------------//
})


//------------------------------------------------------------------------//

//------------------------Handlebars----------------------------------//
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//CSS Static
app.use("/", express.static(__dirname + "/public"))

//Socket View
app.use("/realtimeproducts", prodRouter)

//Handelbars View
app.get("/", async (req, res) => {
    let allProducts  = await product.getProducts()
    res.render("home", {
        title: "Handlebars",
        products : allProducts
    })
})
//------------------------------------------------------------------------//

//Se simplifica codigo de middleware colocando lo siguiente
// app.use("/api/products", prodRouter)
// app.use("/api/carts", cartRouter)
//-------------------------------------------------------------------------//
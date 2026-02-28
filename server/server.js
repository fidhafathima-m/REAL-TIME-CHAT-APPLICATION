const express = require('express')
const cors = require("cors")
const socketIO = require("socket.io")
const http = require("http")
const app = express()
const port = 5000

app.use(cors({
    origin: '*'
}))
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("sendMessage", (message) => {
        io.emit("message", message);       // broadcast message to all connected clients
    })
    socket.on("disconnect", (message) => {
        console.log("User disconnected")
    })
})

server.listen(port, () => console.log(`Server running on port ${port}!`))
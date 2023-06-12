const app = require('express')()
const http = require('http')
const { Server } = require('socket.io')
const cors = require("cors")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.get('/', function (req, res) {
  res.send('Hello from the server!')
})

const socketID_to_Users_Map = {}
const roomID_to_Code_Map = {}

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected', socket.id)

  socket.on("when a user joins", ({ roomId, username }) => {
    console.log("username: ", username)
    socketID_to_Users_Map[socket.id] = username
    socket.join(roomId)

    // for other users, updating the client list
    socket.in(roomId).emit("updating client list", { userslist: Object.values(socketID_to_Users_Map) })

    // for this user, syncing the client list
    io.to(socket.id).emit("updating client list", { userslist: Object.values(socketID_to_Users_Map) })

    // send the latest code changes to this user when joined to existing room
    if (roomId in roomID_to_Code_Map) {
      io.to(socket.id).emit("on code change", { code: roomID_to_Code_Map[roomId] })
    }

    // alerting other users in room that new user joined
    socket.in(roomId).emit("new member joined", {
      username
    })
  })

  // for other users in room to view the changes
  socket.on("on code change", ({ roomId, code }) => {
    socket.in(roomId).emit("on code change", { code })
    roomID_to_Code_Map[roomId] = code
  })

  // for user editing the code to reflect on his/her screen
  socket.on("syncing the code", ({ socketId, code }) => {
    io.to(socketId).emit("on code change", { code })
  })

  socket.on("leave room", ({ roomId }) => { 
    socket.leave(roomId)
    socket.in(roomId).emit("member left", {username: socketID_to_Users_Map[socket.id]})
    
    // update the user list
    delete socketID_to_Users_Map[socket.id]
    socket.in(roomId).emit("updating client list", { userslist: Object.values(socketID_to_Users_Map) })
  })

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected')
    delete socketID_to_Users_Map[socket.id]
  })
})

//you can store your port number in a dotenv file, fetch it from there and store it in PORT
//we have hard coded the port number here just for convenience
const PORT = 5000

server.listen(PORT, function () {
  console.log(`listening on port : ${PORT}`)
})

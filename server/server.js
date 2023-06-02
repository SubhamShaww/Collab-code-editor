const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.send('Hello from the server!')
})

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected')

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected')
  })
})

//you can store your port number in a dotenv file, fetch it from there and store it in PORT
//we have hard coded the port number here just for convenience
const PORT = 5000

http.listen(PORT, function () {
  console.log(`listening on port : ${PORT}`)
})

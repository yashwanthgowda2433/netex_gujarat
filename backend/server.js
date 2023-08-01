require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/tasks')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/tasks', taskRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests  
    var server = require('http').createServer(app);
    // var io = require('socket.io')(server);
    // io.sockets.on('connection', function(client){

    //   console.log("client connected: " + client.id);
    //   client.on("message", async function(msg){
    //     var jsonData = JSON.parse(msg)
    //     var status = 1;
    //     const get_device_status = await devices_controller.updateDeviceStatus(jsonData,status)
    //     console.log(get_device_status)
    //     if(get_device_status){
    //         setTimeout(() => {
    //             client.emit("message","hello");
    //         }, 3000);
    //       }
    //   });

    //   client.on("disconnect", async function(msg){
    //     console.log("Disconnected")
    //   });
      
    // });
    server.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
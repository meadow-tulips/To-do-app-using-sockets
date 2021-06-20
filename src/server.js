const http = require('http');
const server = require('socket.io');


let data = [];


const httpServer = http.createServer();
const io = new server.Server(httpServer,
    {
        cors: {
          origin: ["http://localhost:3000"],
          allowedHeaders: ['bobo'],
          credentials: true,
          methods: ["GET", "POST"],
        },
        allowEIO3: true
    })
io.on("connection", (socket) => {
  console.log('Connection Formed');

  socket.on('delete', (id) => {
    data = data.filter((item) => item.id !== id)
    io.emit('updateFromServer', data);
  })

  socket.on('select', (index) => {
    data = [...data.slice(0, index), {...data[index], selected: !data[index].selected}, ...data.slice(index + 1, data.length)]
    io.emit('updateFromServer', data);
  })

  socket.on('add', (val) => {
    data = data.concat({ text:val, selected: false, id: new Date().toISOString()})
    io.emit('updateFromServer', data)
  })

  socket.emit('updateFromServer', data);
});

httpServer.listen(5000);
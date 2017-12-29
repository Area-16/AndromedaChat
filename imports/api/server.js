let serverBootstrap = () => {
  const server = require('express')()
  let io = require('socket.io')

  let app = server.listen(3080, () => {
    console.log('servidor rodando na porta 3080')
  })

  let socket = io(app)

  socket.on('connection', socketServer => {
    socketServer.on('SEND_MESSAGE', data => {
      data.time = new Date().getDate() + '/' + new Date().getMonth()
      data.timeframe = new Date().getHours() + ':' + new Date().getMinutes()
      socket.emit('RECEIVE_MESSAGE', data)
    })
  })
}

export { serverBootstrap }

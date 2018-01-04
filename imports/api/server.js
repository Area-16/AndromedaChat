let serverBootstrap = () => {
  const server = require('express')()
  const io = require('socket.io')
  const moment = require('moment')

  let app = server.listen(3080, () => {
    console.log('servidor rodando na porta 3080')
  })

  let socket = io(app)

  socket.on('connection', socketServer => {
    socketServer.on('SEND_MESSAGE', data => {
      data.timeframe = `${moment().hours()}:${moment().minutes()}`
      socket.emit('RECEIVE_MESSAGE', data)
    })
  })
}

export { serverBootstrap }

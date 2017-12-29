import React, { Component } from 'react'
import './Chat.css'
import io from 'socket.io-client'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.userHolder = 'Digite seu nome de usuário do chat aqui...'
    this.msgHolder = 'Digite sua mensagem aqui...'
    this.state = {
      username: '',
      message: '',
      time: '',
      timeframe: '',
      messages: []
    }

    this.socket = io(`localhost:3080`)
    
    this.socket.on('RECEIVE_MESSAGE', data => {
      this.addMessage(data)
    })
    
    this.sendMessage = this.sendMessage.bind(this)
    this.keyVerify = this.keyVerify.bind(this)
    this.setUser = this.setUser.bind(this)
  }

  setUser (e) {
    if (this.state.username) {
      document.getElementById('user').setAttribute('disabled', 'true')
    }
  }

  sendMessage (e) {
    e.preventDefault()
    if (this.state.message) {
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
      })

      this.setState({
        message: ''
      })
    }
  }

  addMessage (data) {
    this.setState({
      messages: [...this.state.messages, data]
    })
  }

  keyVerify (e) {
    if (e.key === 'Enter') {
      const btn = document.getElementById('btnEnvia')
      btn.click()
    }
  }

  render () {
    return (
      <div className='container jumbotron'>
        <div className='row'>
          <div className='col-8 offset-md-2' align='center'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title'>
                  {this.props.title}
                  <hr />
                </div>
                <div className='messages'>
                  {this.state.messages.map((message, index) => (
                    <div key={index}>
                      <strong>{message.author}</strong>: {message.message}
                      <div className='time'>
                        {message.time} {message.timeframe}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='card-footer'>
                <input
                  type='text' maxLength='20'
                  id='user'
                  placeholder={this.userHolder}
                  className='form-control' onBlur={this.setUser}
                  value={this.state.username}
                  onChange={ev => this.setState({ username: ev.target.value })}
                />
                <br />
                <input
                  type='text'
                  placeholder={this.msgHolder}
                  className='form-control'
                  value={this.state.message}
                  onKeyPress={this.keyVerify}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                <br />
                <button
                  id='btnEnvia'
                  className='btn btn-success form-control'
                  onClick={this.sendMessage}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat

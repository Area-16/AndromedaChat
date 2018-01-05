import React, { Component } from 'react'
import io from 'socket.io-client'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.userHolder = 'Digite seu usuário do chat aqui...'
    this.msgHolder = 'Digite sua mensagem aqui, Enter para enviar...'
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
    Chat.onChangeMessage = Chat.onChangeMessage.bind(this)
    Chat.onChangeUser = Chat.onChangeUser.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }
  
  componentDidMount() {
    this.handleSend()
  }

  static async onChangeUser (e) {
    await this.setState({...this.state, username: e.target.value })
    this.handleSend()
  }

  static async onChangeMessage (e) {
    await this.setState({...this.state, message: e.target.value })
    this.handleSend()
  }

  handleSend () {
    if (this.state.message && this.state.username) {
      document.getElementById('btnEnvia').removeAttribute('disabled')
    } else {
      document.getElementById('btnEnvia').setAttribute('disabled', 'true')
    }
  }

  setUser () {
    if (this.state.username) {
      document.getElementById('user').setAttribute('disabled', 'true')
    }
  }

  sendMessage (e) {
    e.preventDefault()
    if (this.state.message && this.state.username) {
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
      })

      this.setState({
        message: ''
      })

      document.getElementById('message').focus()
    }

    if (!this.state.username) {
      document.getElementById('user').focus()
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
      <div className='background container-fluid jumbotron'>
        <div className='row'>
          <div className='col-8 offset-md-2' align='center'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title'>
                  {this.props.title}
                  <hr />
                </div>
                <div className='messages'>
                  {this.state.messages.map((text, index) => (
                    <div key={index}>
                      <strong>{text.author}</strong>: {text.message}
                      <div className='time'>
                        {text.timeframe}
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
                  className='form-control' onBlur={() => this.setUser()}
                  value={this.state.username}
                  onChange={Chat.onChangeUser}
                />
                <br />
                <input
                  type='text' id='message'
                  placeholder={this.msgHolder}
                  className='form-control'
                  value={this.state.message}
                  onKeyPress={this.keyVerify}
                  onChange={Chat.onChangeMessage}
                />
                <br />
                <button
                  id='btnEnvia'
                  className='btn btn-outline-info btn-block'
                  onClick={this.sendMessage} >
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

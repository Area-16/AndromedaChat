import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Chat from './Chat'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  render () {
    return (
      <div>

        <h1 className='title' > Andromeda Chat </h1>
        <Router>
          <div className='container'>
            <div className='row'>
              <div className='col-6 offset-md-3' align='center'>
                <input
                  type='text'
                  maxLength='20'
                  placeholder='Digite seu usuário a ser usado no chat'
                  className='form-control user'
                  value={this.state.username}
                  onChange={ev => this.setState({ username: ev.target.value })}
                  />
                <br />
                <div>
                  <ul>
                    <Link to='/chat'>Entrar</Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Route exact path='/' component={Login} />
          <Route path='/chat' component={Chat} />
        </Router>
      </div>
    )
  }
}

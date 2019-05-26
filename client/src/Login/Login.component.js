import React , {Component} from 'react';
import './Login.component.css';
import { Form , Button } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@gmail.com',
      password: '',
      notValidEmailMsg: '',
      notValidPasswordMsg: '',
    }
  }

  onChangeEmail = (e) =>
  {
    this.setState({email: e.target.value})
  }

  onChangePassword = (e) =>
  {
    this.setState({password: e.target.value})
  }

  loginClick = () =>
  {
    if (this.isValid())
    {
      this.props.loginClickEvent(this.state.email , this.state.password);
    }
  }

  isValid = () =>
  {
    let isValid = true;
    if (this.state.email == "" || !this.state.email.includes('@') || this.state.email.length < 3)
    {
      this.setState({notValidEmailMsg: 'Not valid or empty email'})
      isValid = false;
    }
    else
    {
      this.setState({notValidEmailMsg: ''})
    }

    if (this.state.password == "" || this.state.password.length < 6)
    {
      isValid = false;
      this.setState({notValidPasswordMsg: 'Not valid or empty password'})
    }
    else {
      this.setState({notValidPasswordMsg: ''})
    }
    return isValid;
  }

  render() {
    return (
      <div className="loginBody">
        <div className="loginContainer">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} value={this.state.email}/>
              <Form.Text id="notValidEmail" className="notValidMessage">{this.state.notValidEmailMsg}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} value={this.state.password}/>
              <Form.Text id="notValidPassword" className="notValidMessage">{this.state.notValidPasswordMsg}</Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={this.loginClick}>Log In</Button>
            <Form.Text id="notValidAuth" className="notValidMessage">{this.props.notValidAuth}</Form.Text>
          </Form>
        </div>
      </div>
    );
  }
}

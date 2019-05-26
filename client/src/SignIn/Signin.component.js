import React , {Component} from 'react';
import './Signin.component.css';
import { Form , Button } from 'react-bootstrap';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      notValidEmailMsg: '',
      notValidPasswordMsg: '',
      notValidNameMsg: '',
      notValidRepeatPasswordMsg: ''
    }
  }

  onChangeName = (e) =>
  {
    this.setState({name: e.target.value})
  }

  onChangeEmail = (e) =>
  {
    this.setState({email: e.target.value})
  }

  onChangePassword = (e) =>
  {
    this.setState({password: e.target.value})
  }

  onChangeRepeatPassword = (e) =>
  {
    this.setState({repeatPassword: e.target.value})
  }

  signinClick = () =>
  {
    if (this.isValid())
    {
      this.props.signinClickEvent({email: this.state.email , name: this.state.name, password: this.state.password});
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

    if (this.state.name == "")
    {
      this.setState({notValidNameMsg: 'Not valid or empty full name'})
      isValid = false;
    }
    else
    {
      this.setState({notValidNameMsg: ''})
    }

    if (this.state.password == "" || this.state.password.length < 6)
    {
      isValid = false;
      this.setState({notValidPasswordMsg: 'Not valid or empty password'})
    }
    else {
      this.setState({notValidPasswordMsg: ''})
    }

    if (this.state.password != this.state.repeatPassword || this.state.repeatPassword == "")
    {
      this.setState({notValidRepeatPasswordMsg: 'Repeat password is empty or not matching'});
      return;
    }
    else {
      this.setState({notValidRepeatPasswordMsg: ''});
    }

    return isValid;
  }

  render() {
    return (
      <div className="loginBody">
        <div className="loginContainer">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" onChange={this.onChangeName} value={this.state.name}/>
              <Form.Text id="notValidName" className="notValidMessage">{this.state.notValidNameMsg}</Form.Text>
            </Form.Group>

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

            <Form.Group controlId="formBasicPassword2">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password Again" onChange={this.onChangeRepeatPassword} value={this.state.repeatPassword}/>
              <Form.Text id="notValidRepeatPassword" className="notValidMessage">{this.state.notValidRepeatPasswordMsg}</Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={this.signinClick}>Sign In</Button>
          </Form>
        </div>
      </div>
    );
  }
}

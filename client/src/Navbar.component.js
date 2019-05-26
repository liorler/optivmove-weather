import React , {Component} from 'react'
import { Navbar }  from 'react-bootstrap'
import './Navbar.component.css'

var navRightDisplay = null;

export default class SNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props,
      navRightDisplay: null,
      isLoggedIn: this.getIsLoggedIn(),
      loggedUserName: null
    }
  }

  invokeChangePage = (pageName) =>
  {
    this.props.changePageEvent(pageName);
  }

  logout = (pageName) =>
  {
    this.props.logoutEvent();
    this.setLoggedNavBarDisplay();
  }

  getIsLoggedIn = () => {
    return this.props.isLoggedIn;
  }

  setLoggedNavBarDisplay = (isLogged , name) => {
    if (isLogged == 'false')
    {
      this.setState({navRightDisplay: <div className="logControl">
        <span><h6 onClick={() => this.invokeChangePage('Login')}>Log In</h6></span>
        <span><h4 onClick={() => this.invokeChangePage('Signin')}>Sign In</h4></span>
      </div>})
    }
    else {
      this.setState({navRightDisplay:<div className="loggedComp">
        <div className="personIcon">
          <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-512.png"/>
        </div>
        <div className="loggedText">
          <div>Hello, {name}</div>
          <div className="logoutText" onClick={() => this.logout()}>Logout</div>
        </div>
      </div>})
    }
  }

  componentWillReceiveProps = (props) => {
    this.setLoggedNavBarDisplay(props.isLoggedIn , props.loggedUserName);
  }

  componentDidMount = () => {
    this.setLoggedNavBarDisplay(this.state.props.isLoggedIn , this.state.props.loggedUserName);
  }


  render() {

    return (
      <Navbar bg="light" expand="lg">
        <div className="app-icon" onClick={() => this.invokeChangePage('main')} title="Home page">
          <img src="http://aux.iconspalace.com/uploads/1755770701.png"/>
          <h3 className="weatherIconText">L-Weather</h3>
        </div>

        <div className="rightNav">
          {this.state.navRightDisplay}
        </div>
      </Navbar>
    )
  }
}

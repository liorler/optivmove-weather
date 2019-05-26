import React , {Component} from 'react';
import './App.css';
import LoginPage from './Login/Login.component.js';
import MainPage from './Main/Main.component.js';
import SigninPage from './SignIn/Signin.component.js';
import SNavbar from './Navbar.component.js';

const apiKey = '7f808f9bcd764a0086f165325192205'
const defaultCities = ['Berlin' , 'Amsterdam' , 'Paris']

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dispalyComponent: null ,
      page: '',
      isLoggedIn: this.isUserLogged(),
      loggedUserName: this.getLoggedUserName(),
      userSearches: [],
      citiesWeather: [],
      notValidCityMsg: null,
      notValidAuth: null
    }
  }

  //get main component
  mainComponent = () => {return <MainPage deleteCityWeather={this.deleteCityFromState} notValidCityMsg={this.state.notValidCityMsg} addCity={this.addCity} userSearches={this.state.userSearches}
          citiesWeather={this.state.citiesWeather}/>};

  //Detect if there is logged in user from session storage
  isUserLogged = () => {
      return sessionStorage.getItem('isLogged');
  }

  //get logged user full name from session storage
  getLoggedUserName = () => {
      return sessionStorage.getItem('loggedUserName');
  }

  //get logged user email from session storage
  getLoggedEmail = () => {
      return sessionStorage.getItem('loggedEmail');
  }

  //reset some properties also at session storage if user logged out or not logged
  notLogged = () => {
    console.log('notlogged')
    sessionStorage.setItem('isLogged', 'false');
    sessionStorage.setItem('loggedUserName', null);
    sessionStorage.setItem('loggedEmail', null);
    this.setState({isLoggedIn: 'false', loggedUserName: null , userSearches: []}, () => {
        this.changePage('main');
    })
    this.getCitiesWeatherAndDisplay(defaultCities);
  }

  //define some properties values when user log in and get user searches from db
  logged = (name , email) => {
    this.setState({isLoggedIn: 'true', loggedUserName: name});
    sessionStorage.setItem('isLogged', 'true');
    sessionStorage.setItem('loggedUserName', name);
    sessionStorage.setItem('loggedEmail', email);
    this.getUserSearches(email);
  }

  //get user preferences and update view
  getUserSearches = (email) => {
    fetch(`http://localhost:8888/search?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        res.json().then(searches => {
          if (searches != null && searches.length > 0)
          {
            this.setCitiesSearchesList(searches);
          }
          else {
            this.getCitiesWeatherAndDisplay(defaultCities);
          }
        });
    }).catch(err => console.log(err));
  }

  //update user preferences (searches) at state
  updateUserSearchesList = (searches) => {
    var sortedSearches = searches.sort(function(a,b){
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    this.setState({userSearches: sortedSearches.reverse()});
  }

  //invoke function of updating search list and cities weather on view
  setCitiesSearchesList = (searches) => {
    this.updateStateSearchHistoryList(searches);

    this.setState({citiesWeather: []});
    this.getCitiesWeatherAndDisplay(searches.map(search => {return search.cityName}));
  }

  //get cities weather and invoke display function on view
  getCitiesWeatherAndDisplay = (cities) => {
    var promises = cities.map(city => {
      return this.getCityWeather(city);
    })
    Promise.all(promises).then(cities => {
        this.updateDisplayedCities(cities)
    })
  }

  //update cities weather list in state
  updateDisplayedCities = (cities) => {
    this.setState({citiesWeather: cities}, () => {this.changePage('main')});
  }

  //login event handler
  handleLoginClick = (email, password) => {
    var userLoginRequest = {email: email , password: password};
    fetch('http://localhost:8888/login', {
        method: 'POST',
        body: JSON.stringify(userLoginRequest),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        res.json().then(body => {
          if (body.loginSuccess)
          {
            this.logged(body.userInfo.name , email);
            console.log("logged in");
          }
          else {
            this.setState({notValidAuth: 'Email or Password are incorrect'} , () => {this.changePage('Login')})
            console.log("not logged in");
          }
        });
    }).catch(err => console.log(err));
  }

  //signin event handler
  handleSigninClick = (newUser) => {
    fetch('http://localhost:8888/signin', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        res.json().then(body => {
          if (body.loginSuccess)
          {
            this.logged(newUser.name);
            console.log("logged in");
          }
          else {
            this.notlogged();
            console.log("not logged in");
          }
        });
    }).catch(err => console.log(err));
  }

  //logout event handler
  handleLogoutClick = () => {
    this.notLogged();
  }

  //change page function
  changePage = (page) => {
    switch (page)
    {
      case 'Login':
        this.setState({dispalyComponent: <LoginPage loginClickEvent={this.handleLoginClick} notValidAuth={this.state.notValidAuth}/>});
        break;
      case 'Signin':
        this.setState({dispalyComponent: <SigninPage signinClickEvent={this.handleSigninClick}/>});
        break;
      default:
        this.setState((state, props) => {
          return {dispalyComponent: this.mainComponent(), notValidAuth: null};
        });
        break;
    }
    this.setState({page: page});
  }

  //fetch get city weather from api
  getCityWeather = (city) => {
    return fetch(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return res.json().then(cityCurrent => {
          var city = {
            cityName: cityCurrent.location.name,
            feelsLike: cityCurrent.current.feelslike_c.toString(),
            temp: cityCurrent.current.temp_c.toString(),
            wind: cityCurrent.current.wind_kph.toString(),
            icon: cityCurrent.current.condition.icon
          }
          return city;
        });
    }).catch(err => console.log(err));
  }

  //check if city allready displayed
  isCityAllreadyDisplay = (city) => {
    var cities = this.state.citiesWeather.map(cityWeather => {return cityWeather.cityName});
    if (cities.indexOf(city) > -1) {
      return true;
    }
    else {
      return false
    };
  }

  updateStateWithNewCity = (cityWeather) => {
    var cities = this.state.citiesWeather
    cities.push(cityWeather);
    this.setState({citiesWeather: cities}, () => {this.changePage('main')});
  }

  deleteCityFromState = (cityName) => {
    var cities = this.state.citiesWeather
    cities.some((city, i) => {
      if(city.cityName === cityName){
        cities.splice(i,1);
        this.setState({citiesWeather: cities}, () => {this.changePage('main')});
        return;
      }
    })

    if (this.isUserLogged() == 'true')
    {
        this.deleteCityFromUserSearches(cityName);
    }
  }

  deleteCityFromUserSearches = (cityName) => {
    var body = {'email' : this.getLoggedEmail() , 'cityName': cityName}
    fetch('http://localhost:8888/deleteCity', {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
          res.json().then(body => {
          //update user search list
          console.log(body)
          this.updateStateSearchHistoryList(body);
        });
    }).catch(err => console.log(err));
  }

  addCity = (city) => {
    var promise = this.getCityWeather(city);
    promise.then(cityWeather => {
        if(this.isCityAllreadyDisplay(cityWeather.cityName)) {
          this.setState({notValidCityMsg: 'City allready exists at cities weather list'} , () => {this.changePage('main')});
          return;
        }
        else {
          this.setState({notValidCityMsg: ''}, () => {this.updateStateWithNewCity(cityWeather)});
        }

        if (this.state.isLoggedIn == 'true') //update user searches if logged - at db and display
        {
          this.updateUserSearches(cityWeather.cityName);
        }
    })
  }

  updateUserSearches = (city) => {
      fetch(`http://localhost:8888/addCity?email=${this.getLoggedEmail()}&city=${city}`, {
          method: 'POST',
      }).then(res => {
          res.json().then(userSearches => {
            var cities = this.state.citiesWeather.map(search => {return search.cityName})
            this.updateStateSearchHistoryList(userSearches.searches);
          });
      }).catch(err => console.log(err));
  }

  updateStateSearchHistoryList = (searches) => {
    this.setState({userSearches: searches}, () => this.changePage('main'))
  }



  componentDidMount = () => {
    if(this.isUserLogged() == 'true')
    {
      this.getUserSearches(this.getLoggedEmail());
    }
    else {
      this.notLogged();
      this.setState((state, props) => {
        return {dispalyComponent: this.mainComponent()};
      });
    }
  }

  render() {
    return (
      <div className="appContainer">
      <SNavbar changePageEvent={this.changePage} isLoggedIn={this.state.isLoggedIn} loggedUserName={this.state.loggedUserName}
        logoutEvent={this.handleLogoutClick}/>
        {this.state.dispalyComponent}
      </div>
    );
  }
}

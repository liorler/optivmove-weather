import React , {Component} from 'react';
import './Main.component.css';
import CityWeather from './CityWeather.component.js';
import SearchBox from './SearchBox.component.js';
import SearchHistory from './SearchHistory.component.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props
    }
  }

  componentWillReceiveProps = (props) => {
    var state = {...this.state.props};
    state.userSearches = props.userSearches;
    this.setState({props: state});
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="layoutContainer">
        <div className="leftContainer">
          <SearchBox addCity={this.props.addCity} notValidCityMsg={this.props.notValidCityMsg} notValidAuth={this.props.notValidAuth}/>
          <SearchHistory userSearches={this.state.props.userSearches}/>
        </div>
          <div className="citiesContainer">
            {
              this.props.citiesWeather.map(city => {
                return <CityWeather key={city.cityName} city={city} deleteCityWeather={this.props.deleteCityWeather}/>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

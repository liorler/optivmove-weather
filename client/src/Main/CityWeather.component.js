import React , {Component} from 'react';
import './CityWeather.component.css';

export default class CityWeather extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="cityContainer">
      <div className="deleteIcon" onClick={() => this.props.deleteCityWeather(this.props.city.cityName)}>x</div>
        <div className="cityName">
          {this.props.city.cityName}
          <img src={this.props.city.icon}/>
        </div>
        <table>
          <tbody>
            <tr>
              <td>Temp</td>
              <td>{this.props.city.temp}</td>
            </tr>
            <tr>
              <td>Feels Like</td>
              <td>{this.props.city.feelsLike}</td>
            </tr>
            <tr>
              <td>Wind</td>
              <td>{this.props.city.wind}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

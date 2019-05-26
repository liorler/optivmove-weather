import React , {Component} from 'react';
import './SearchBox.component.css';
import {InputGroup , FormControl , Button , Form} from 'react-bootstrap'

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
    }
  }

  addCity = () => {
    this.props.addCity(this.state.cityName)
  }

  onChangeCityName = (e) => {
    this.setState({cityName: e.target.value});
  }

  render() {
    return (
      <div className="searchContainer">
        <InputGroup className="mb-3">
         <FormControl placeholder="City name" value={this.state.cityName} onChange={this.onChangeCityName} />
         <InputGroup.Append>
           <Button variant="outline-secondary" onClick={() => this.addCity(this.state.cityName)}>Add</Button>
         </InputGroup.Append>
        </InputGroup>
        <Form.Text id="notValidCity" className="notValidMessage">{this.props.notValidCityMsg}</Form.Text>
      </div>
    );
  }
}

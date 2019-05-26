import React , {Component} from 'react';
import './SearchHistory.component.css';
import {InputGroup , FormControl} from 'react-bootstrap'

export default class SearchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props
    }
  }

  componentWillReceiveProps = (props) => {
    this.setState({props: props});
  }

  getNormalizedDT = (dtString) => {
    var dt = new Date(dtString);
    return `${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  }

  render() {
    return (
      <div className="historyContainer">
        <h3>Search History</h3>
        <table>
          <tbody>
          {
            this.state.props.userSearches
              .reverse()
              .slice(0,5)
              .map((search,index) => {
                return  <tr key={index+1}>
                          <td>{index+1}.</td>
                          <td>{search.cityName}</td>
                          <td>{this.getNormalizedDT(search.timestamp)}</td>
                        </tr>
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

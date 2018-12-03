import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import DatePicker from '../src';
import { ru } from 'date-fns/locale';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange(date) {
    this.setState({ date });
    console.log(date);
  }

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col">

            <h3>DatePicker input</h3>
            <DatePicker
              type="input"
              value={this.state.date}
              onChange={this.onChange}
              format="dd.MM.yyyy, HH:mm"
              locale={ru}
            />

            <hr />

            <h3>DatePicker button</h3>
            <DatePicker
              type="element"
              value={this.state.date}
              onChange={this.onChange}>
              <button className="btn btn-secondary">📅</button>
            </DatePicker>

          </div>
          <div className="col">

            <h3>Inline DatePicker 🇺🇸</h3>
            <DatePicker
              type="inline"
              value={this.state.date}
              onChange={this.onChange}
            />

          </div>
          <div className="col">

            <h3>Inline DatePicker 🇷🇺</h3>
            <DatePicker
              type="inline"
              value={this.state.date}
              onChange={this.onChange}
              locale={ru}
            />

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

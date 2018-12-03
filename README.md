
# React Bootstrap 4 DateTime picker

![DatePicker](https://i.imgur.com/nlSfa9Q.png)

---

### Props
- `value` - date object
- `onChange` - update function, get date object as attribute
- `type` - string
  - `input` - default
  - `element` - any child element as popup trigger
  - `inline` - datepicker without popup
 - `format` - date format string, default `yyyy-MM-dd HH:mm`
 - `locale` - date-fns locale object, default `enUS`

### Example

```bash
$ yarn add https://github.com/artemershov/DatePicker.git
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import DatePicker from 'DatePicker';
import { ru } from 'date-fns/locale';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange(date) {
    this.setState({ date });
  }

  render() {
    return (
      <div className="container">
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

            <h3>DatePicker button</h3>
            <DatePicker
              type="element"
              value={this.state.date}
              onChange={this.onChange}>
              <button className="btn btn-secondary">📅</button>
            </DatePicker>

          </div>
          <div className="col">

            <h3>Inline DatePicker</h3>
            <DatePicker
              type="inline"
              value={this.state.date}
              onChange={this.onChange}
            />

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
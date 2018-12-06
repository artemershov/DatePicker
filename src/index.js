import React from 'react';
import MainView from './MainView';
import { Popover, PopoverBody } from 'reactstrap';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import getDate from 'date-fns/getDate';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import setSeconds from 'date-fns/setSeconds';
import isDate from 'date-fns/isDate';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { forIn, uniqueId } from 'lodash';

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
      inputValue: '',
      viewData: {
        year: null,
        month: null,
        day: null,
        hours: null,
        minutes: null,
      },
    };

    this.format = this.props.format || 'yyyy-MM-dd HH:mm';
    this.today = setHours(setMinutes(setSeconds(Date.now(), 0), 0), 12);
    this.onChange = this.onChange.bind(this);

    this.viewDataSet = this.viewDataSet.bind(this);
    this.viewDataGet = this.viewDataGet.bind(this);
    this.viewDataUpdate = this.viewDataUpdate.bind(this);

    this.handleTodayBtn = this.handleTodayBtn.bind(this);
    this.handleClearBtn = this.handleClearBtn.bind(this);

    this.inputChange = this.inputChange.bind(this);

    this.popoverId = uniqueId('datapicker_');
    this.popoverToggle = this.popoverToggle.bind(this);
  }

  onChange(date) {
    const inputValue = date
      ? format(date, this.format, { locale: this.props.locale })
      : '';
    this.setState({ inputValue });
    this.viewDataUpdate(date || this.today);
    this.props.onChange(date);
  }

  viewDataSet(obj, cb = null) {
    this.setState(prev => {
      forIn(obj, (val, key) => (prev.viewData[key] = val));
      return prev;
    }, cb);
  }

  viewDataGet() {
    const { year, month, day, hours, minutes } = this.state.viewData;
    return new Date(year, month, day, hours, minutes);
  }

  viewDataUpdate(date) {
    this.setState({
      viewData: {
        year: getYear(date),
        month: getMonth(date),
        day: getDate(date),
        hours: getHours(date),
        minutes: getMinutes(date),
      },
    });
  }

  handleTodayBtn() {
    this.onChange(this.today);
  }

  handleClearBtn() {
    this.onChange(null);
  }

  inputChange(e) {
    const { value } = e.target;
    const date = parse(value, this.format, Date.now(), {
      locale: this.props.locale,
    });
    if (isDate(date) && isValid(date)) this.onChange(date);
    if (!value) this.onChange(null);
    this.setState({ inputValue: value });
  }

  popoverToggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  componentDidMount() {
    if (this.props.date) {
      this.onChange(this.props.date);
    } else {
      this.viewDataUpdate(this.today);
    }
  }

  render() {
    const viewActions = {
      set: this.viewDataSet,
      get: this.viewDataGet,
      select: this.onChange,
    };
    const controlActions = {
      today: this.handleTodayBtn,
      clear: this.handleClearBtn,
    };
    const main = (
      <MainView
        current={this.state.viewData}
        date={this.props.value}
        actions={viewActions}
        control={controlActions}
        locale={this.props.locale}
      />
    );
    const type = this.props.type ? this.props.type : 'input';
    return type == 'inline' ? (
      main
    ) : (
      <div>
        {type == 'element' &&
          React.cloneElement(this.props.children, {
            id: this.popoverId,
            onClick: this.popoverToggle,
          })}
        {type == 'input' && (
          <input
            id={this.popoverId}
            type="text"
            className="form-control"
            value={this.state.inputValue}
            onClick={this.popoverToggle}
            onChange={this.inputChange}
          />
        )}
        <Popover
          placement="top"
          isOpen={this.state.popoverOpen}
          toggle={this.popoverToggle}
          target={this.popoverId}>
          <PopoverBody>{main}</PopoverBody>
        </Popover>
      </div>
    );
  }
}

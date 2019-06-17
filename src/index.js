import React from 'react';
import Popover from 'reactstrap/lib/Popover';
import PopoverBody from 'reactstrap/lib/PopoverBody';
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
import formatDate from 'date-fns/format';
import uniqueId from 'lodash/uniqueId';
import MainView from './MainView';

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
        minutes: null
      }
    };

    const { format } = this.props;
    this.format = format || 'yyyy-MM-dd HH:mm';
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

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.onChange(value);
    } else {
      this.viewDataUpdate(this.today);
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (prevProps.value !== value) this.onChange(value);
  }

  onChange(date) {
    const { locale, onChange } = this.props;
    const inputValue = date ? formatDate(date, this.format, { locale }) : '';
    this.setState({ inputValue });
    this.viewDataUpdate(date || this.today);
    if (onChange) onChange(date);
  }

  viewDataSet(obj, cb = null) {
    this.setState(state => {
      const { viewData } = this.state;
      return { ...state, viewData: { ...viewData, ...obj } };
    }, cb);
  }

  viewDataGet() {
    const { viewData } = this.state;
    const { year, month, day, hours, minutes } = viewData;
    return new Date(year, month, day, hours, minutes);
  }

  viewDataUpdate(date) {
    this.setState({
      viewData: {
        year: getYear(date),
        month: getMonth(date),
        day: getDate(date),
        hours: getHours(date),
        minutes: getMinutes(date)
      }
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
    if (value) {
      const { locale } = this.props;
      const date = parse(value, this.format, Date.now(), { locale });
      if (isDate(date) && isValid(date)) this.onChange(date);
    } else {
      this.onChange(null);
    }
    this.setState({ inputValue: value });
  }

  popoverToggle() {
    const { popoverOpen } = this.state;
    this.setState({ popoverOpen: !popoverOpen });
  }

  render() {
    const viewActions = {
      set: this.viewDataSet,
      get: this.viewDataGet,
      select: this.onChange,
      hide: this.popoverToggle
    };
    const controlActions = {
      today: this.handleTodayBtn,
      clear: this.handleClearBtn
    };
    const { viewData, inputValue, popoverOpen } = this.state;
    const { locale, value, type, children } = this.props;

    const main = (
      <MainView
        current={viewData}
        date={value}
        actions={viewActions}
        control={controlActions}
        locale={locale}
      />
    );

    if (type === 'inline') return main;

    const input = (
      <input
        id={this.popoverId}
        type="text"
        className="form-control"
        value={inputValue}
        onClick={this.popoverToggle}
        onChange={this.inputChange}
      />
    );

    return (
      <div>
        {type === 'element' &&
          React.cloneElement(children, {
            id: this.popoverId,
            onClick: this.popoverToggle
          })}
        {(type === 'input' || type === undefined) && input}
        <Popover
          placement="top"
          isOpen={popoverOpen}
          toggle={this.popoverToggle}
          target={this.popoverId}
        >
          <PopoverBody>{main}</PopoverBody>
        </Popover>
      </div>
    );
  }
}

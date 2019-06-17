import React from 'react';
import Calendar from './Calendar';
import Months from './Months';
import Years from './Years';

export default class DateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'calendar' };
    this.setView = this.setView.bind(this);
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    const { view } = this.state;
    const { date, locale, current, actions } = this.props;
    const { month, year } = current;
    const dateActions = { ...actions, view: this.setView };
    switch (view) {
      default:
      case 'calendar':
        return (
          <Calendar month={month} year={year} actions={dateActions} date={date} locale={locale} />
        );
      case 'months':
        return (
          <Months current={month} year={year} actions={dateActions} date={date} locale={locale} />
        );
      case 'years':
        return <Years current={year} actions={dateActions} date={date} />;
    }
  }
}

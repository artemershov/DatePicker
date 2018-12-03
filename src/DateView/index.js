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
    const { date, locale } = this.props;
    const { month, year } = this.props.current;
    const actions = {
      ...this.props.actions,
      view: this.setView,
    };
    switch (this.state.view) {
      default:
      case 'calendar':
        return (
          <Calendar
            month={month}
            year={year}
            actions={actions}
            date={date}
            locale={locale}
          />
        );
      case 'months':
        return (
          <Months
            current={month}
            year={year}
            actions={actions}
            date={date}
            locale={locale}
          />
        );
      case 'years':
        return <Years current={year} actions={actions} date={date} />;
    }
  }
}

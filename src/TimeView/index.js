import React from 'react';
import Time from './Time';
import Hours from './Hours';
import Minutes from './Minutes';

export default class TimeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'time' };
    this.setView = this.setView.bind(this);
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    const { view } = this.state;
    const { date, current, actions } = this.props;
    const { hours, minutes } = current;
    const timeActions = { ...actions, view: this.setView };
    switch (view) {
      default:
      case 'time':
        return <Time hours={hours} minutes={minutes} actions={timeActions} date={date} />;
      case 'hours':
        return <Hours current={hours} actions={timeActions} date={date} />;
      case 'minutes':
        return <Minutes current={minutes} actions={timeActions} date={date} />;
    }
  }
}

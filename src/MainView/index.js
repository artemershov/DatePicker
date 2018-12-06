import React from 'react';
import { Wrapper } from '../Styles';
import DateView from '../DateView';
import TimeView from '../TimeView';
import Control from './Control';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'date' };
    this.handleToggleBtn = this.handleToggleBtn.bind(this);
  }

  handleToggleBtn() {
    this.setState({ view: this.state.view == 'date' ? 'time' : 'date' });
  }

  render() {
    const props = {
      current: this.props.current,
      date: this.props.date,
      actions: this.props.actions,
      locale: this.props.locale,
    };
    const controlActions = {
      ...this.props.control,
      toggle: this.handleToggleBtn,
    };
    return (
      <Wrapper>
        {this.state.view == 'date' ? (
          <DateView {...props} />
        ) : (
          <TimeView {...props} />
        )}
        <Control actions={controlActions} view={this.state.view} />
      </Wrapper>
    );
  }
}

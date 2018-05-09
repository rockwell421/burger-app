import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  /* Lifecycle hook ensures that we only render the
  modal when orderSummary is clicked vs each time an ingredient is added */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentWillUpdate () {
    console.log('[Modal] Will Update');
  }
    render() {
      return (
          <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
              className={classes.Modal}
              style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
              }}>
                {this.props.children}
            </div>
          </Aux>
      );
    }
}





export default Modal;

import React, { Component } from 'react';

class Accordion extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse () {
    this.setState({
      open: !this.state.open,
    })
  }

  render () {
    return (
      <li className="accordion-container">
        <div className="row">
          <span className="header">{this.props.header}</span>
          <div className="click-space" onClick={() => this.handleCollapse()}>&nbsp;</div>
        </div>
        <div className={this.state.open ? "row" : "hide"}>
          <div className="body-content">
            {this.props.body}
          </div>
        </div>
      </li>
    )
  }
}

export default Accordion;

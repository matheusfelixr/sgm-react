import React, { Component } from 'react';
import './styles.css';

import Alert from 'react-bootstrap/Alert';


class AlertInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show : true,
        }
    }

    
  componentDidMount() {
    console.log(this.state.show)

    setTimeout(
        function() {
            this.setState({ show: false });
        }
        .bind(this),
        6000
    );

  }

    render() {
        return (
            <div>  
            {this.state.show  &&
                <Alert variant={this.props.variant} >{this.props.description} </Alert> }
                </div>
        );
     }
}
export default AlertInfo;
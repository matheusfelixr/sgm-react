import React, { Component } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export default class Loader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div> {this.props.show &&

                <div className="modal">
                    <FontAwesomeIcon icon={faSync} color='white' spin={true} style={{ fontSize: '70px' }} />
                </div>}
            </div>
        )
    }
}
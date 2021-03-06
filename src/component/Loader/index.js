import React, { Component } from 'react';
import {LoaderModal} from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export default class Loader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <> {this.props.show &&

                <LoaderModal>
                    <FontAwesomeIcon icon={faSync} color='white' spin={true} style={{ fontSize: '70px' }} />
                </LoaderModal>}
            </>
        )
    }
}
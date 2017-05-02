import './TimeSlotEvent.css';
import {isCurrentEventDisabled} from '../utils';
import React, {PureComponent} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import PropTypes from 'prop-types'; // ES6 

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    render() {
        let {
            event: {start,title, color,id},
            onSelect,
        } = this.props;

        // disable button that represents an event in the past 
        let buttonStatus ;
        if(isCurrentEventDisabled(start)){
            buttonStatus = "time-slot-event--disabled";
        }
        else{
            buttonStatus = "time-slot-event--"+color;
        }

        return (
            <button data-id={id} className={`time-slot-event ${buttonStatus}`} onClick={onSelect}>
                {title}
            </button>
        );
    }
}



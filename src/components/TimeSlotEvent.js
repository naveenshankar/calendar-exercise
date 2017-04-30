import React, {PureComponent} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import PropTypes from 'prop-types'; // ES6 

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        hour: PropTypes.number.isRequired,
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    render() {
        let {
            hour ,
            event: {title, color},
            onSelect,
        } = this.props;

        /* disable button that represents an event in the past */
        console.log("hour in TimeSlotEvent",hour);
        let buttonStatus = "time-slot-event--"+color;
        let currentHour = new Date().getHours();
        if(currentHour > hour){
            buttonStatus = "time-slot-event--disabled";
        }

        return (
            <button className={`time-slot-event ${buttonStatus}`} onClick={onSelect}>
                {title}
            </button>
        );
    }
}

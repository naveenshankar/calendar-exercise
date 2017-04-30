import React, {PureComponent} from 'react';
import {EVENTS_PROP_TYPE} from './constants';
import {getDisplayHour} from '../utils';
import TimeSlotEvent from './TimeSlotEvent';
import PropTypes from 'prop-types'; // ES6 

import './TimeSlot.css';

export default class TimeSlot extends PureComponent {
    static propTypes = {
        hour: PropTypes.number.isRequired,
        events: EVENTS_PROP_TYPE.isRequired,
        onSelectEvent: PropTypes.func.isRequired,
    }

    _renderEvents() {
        let {events, hour, onSelectEvent} = this.props;

        console.log("event in TimeSlot",events);

        return events.map((event) => (
            /* passing props hour into child component */
            <div key={event.id} className="time-slot__event">
                <TimeSlotEvent hour={hour} event={event} onSelect={onSelectEvent.bind(null, event.id)} />
            </div>
        ));
    }

    render() {
        let {hour} = this.props;
        let displayHour = getDisplayHour(hour);

        return (
            <section className="time-slot">
                <span className="time-slot__hour-label">
                    {displayHour}
                </span>
                <div className="time-slot__events">
                    {this._renderEvents()}
                </div>
            </section>
        );
    }
}

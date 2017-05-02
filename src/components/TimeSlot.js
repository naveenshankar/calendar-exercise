import PropTypes from 'prop-types'; // ES6 
import React from 'react';
import './TimeSlot.css';
import {getDisplayHour} from '../utils';
import TimeSlotEvent from './TimeSlotEvent';
import {PureComponent} from 'react';
import {EVENTS_PROP_TYPE} from './constants';

export default class TimeSlot extends PureComponent {
    static propTypes = {
        events: EVENTS_PROP_TYPE.isRequired,
        onSelectEvent: PropTypes.func.isRequired,
    }

    _renderEvents() {
        let {events, onSelectEvent} = this.props;

        return events.map((event) => (
            <div key={event.id} className="time-slot__event">
                <TimeSlotEvent event={event} onSelect={onSelectEvent.bind(null, event.id)} />
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







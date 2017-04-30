import React, {PureComponent} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';
import PropTypes from 'prop-types'; // ES6 

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentWillMount() {
        /* ENABLING PAGE SCROLL IN THE BACKGROUND */
        //window.onkeydown = this._handleEventDetailOverlayClose.bind(this);
    }

    render() {
        let {event, onClose} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour)
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`
        let overlayClassName = "event-detail-overlay fade-in";

        // TODO: The event label color should match the event color
        // TODO: Add appropriate ARIA tags to overlay/dialog
        // TODO: Support clicking outside of the overlay to close it
        // TODO: Support clicking ESC to close it

        console.log("hours in EventDetail",hours);

        return (
            <section id="event-detail-overlay" className={overlayClassName}>
                <div className="event-detail-overlay__container">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        onClick={onClose}
                    />
                    <div className="event-detail-overlay__heading">
                        {displayDateTime}
                        <span 
                            className={'event-detail-overlay__'+color}
                            title={`Event label color: ${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p className="event-detail-overlay__description">{description}</p>
                </div>
            </section>
        );
    }
}

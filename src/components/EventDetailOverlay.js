import React, {PureComponent} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';
import PropTypes from 'prop-types'; // ES6 
import {isCurrentEventDisabled} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentWillMount() {
        /* ENABLING PAGE SCROLL IN THE BACKGROUND */
        setTimeout(function(){
                /* FOCUS ON THE FIRST ACTIONABLE ELEMENT IN THE MODAL WINDOW */
                if(document.getElementById("event-detail-overlay__close") !== null){
                    document.getElementById("event-detail-overlay__close").focus();
                }
        },500);
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

        /* changes to match label color with event color */
        let colorStatus ;
        if(isCurrentEventDisabled(start)){
            colorStatus = 'event-detail-overlay__disabled';
        }
        else{
            colorStatus = 'event-detail-overlay__'+color;
        }

        return (
            <section id="event-detail-overlay" className={overlayClassName} role="dialog" aria-labelledby="Event Description" aria-describedby="Event Description">
                <div className="event-detail-overlay__container">
                    <button id="event-detail-overlay__close"
                        className="event-detail-overlay__close"
                        title="Close event detail view"
                        onClick={onClose}
                    />
                    <div className="event-detail-overlay__heading">
                        {displayDateTime}
                        <span 
                            className={colorStatus}
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

import {connect} from "react-redux";
import {closeOverlay} from '../actions/TimeSlotEventActions';
import React from 'react';
import './EventDetailOverlay.css';
import {isCurrentEventDisabled} from '../utils';
import PropTypes from 'prop-types'; // ES6 
import {getDisplayDate, getDisplayHour} from '../utils';

class EventDetailOverlay extends React.Component {
    componentWillMount() {
        setTimeout(function(){
                /* FOCUS ON THE FIRST ACTIONABLE ELEMENT IN THE MODAL WINDOW */
                if(document.getElementById("event-detail-overlay__close") !== null){
                    document.getElementById("event-detail-overlay__close").focus();
                }
        },500);
    }
    
    render() {

        if(this.props.timeSlotEventState.overlayReadyToLaunch){
            let overlayClassName = "event-detail-overlay fade-in";
            let start = this.props.timeSlotEventState.selectedTimeSlot.start;
            let title = this.props.timeSlotEventState.selectedTimeSlot.title;
            let description = this.props.timeSlotEventState.selectedTimeSlot.description;
            let color = this.props.timeSlotEventState.selectedTimeSlot.color;
            let hours = this.props.timeSlotEventState.selectedTimeSlot.hours;
            let displayDate = getDisplayDate(start);
            let startHour = (new Date(start)).getHours();

            // TODO: Fix. If hours was other than 1 the UI would break
            let endHour = startHour + hours;
            let startHourDisplay = getDisplayHour(startHour)
            let endHourDisplay = getDisplayHour(endHour);
            let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`

            // changes to match label color with event color 
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
                                onClick={() => this.props.closeOverlay()}
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
        else{
            return (
                <section>
                </section>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
       timeSlotEventState: state.timeSlotEvent
    };
};

const mapDispatchToProps = (dispatch) => {
     return {
        closeOverlay: () => {
            dispatch(closeOverlay());
        },
     };
};

EventDetailOverlay.propTypes = {
    timeSlotEventState: PropTypes.object.isRequired,
    closeOverlay: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailOverlay);


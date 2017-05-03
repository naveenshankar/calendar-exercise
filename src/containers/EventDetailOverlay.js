import {connect} from "react-redux";
import {closeOverlay} from '../actions/TimeSlotEventActions';
import React from 'react';
import './EventDetailOverlay.css';
import {isCurrentEventDisabled} from '../utils';
import PropTypes from 'prop-types'; // ES6 
import {getDisplayDate, getDisplayHour} from '../utils';

class EventDetailOverlay extends React.Component {
    componentWillMount() {
        window.addEventListener("keydown",this._handleKeyDownEvent.bind(this),false);
        document.onclick = this._handleEventDetailOverlayClose.bind(this);
    }

    _handleKeyDownEvent(e){
        if(e.keyCode === 27 && this.props.timeSlotEventState.selectedTimeSlot !== undefined){
            this.props.closeOverlay();
        }
    }

     _handleEventDetailOverlayClose(evt) {
        if(
           (this.props.timeSlotEventState.overlayReadyToLaunch === true && evt && evt.target.className.indexOf("event-detail-overlay__") < 0) || 
           (this.props.timeSlotEventState.overlayReadyToLaunch === true && evt.target.className === "event-detail-overlay__close")
           )
        {
            this.props.closeOverlay();
        }
    }

    _handleEvents(){
            let timeSlotEventObject = this.props.timeSlotEventState.selectedTimeSlot;
            let selectedUIIndex;
           
            /* ENABLING PAGE SCROLL IN THE BACKGROUND AND ENABLING OVERFLOW CLOSE FOR ESCAPE/CLICK OUTSIDE OVERFLOW*/
            if(document.body.classList !== null){
                document.body.classList.remove("unscrollable");
            }

            /* FADE OUT ANIMATION FOR MODAL WINDOW CLOSING */
            // if(document.getElementById("event-detail-overlay") != null){
            //     document.getElementById("event-detail-overlay").classList.remove("fade-in");
            //     document.getElementById("event-detail-overlay").classList.add("fade-out");
            // }

            /*UPDATING STATE AFTER FADEOUT ANIMATION */
            //setTimeout(function(){
                 /* FOCUS BACK ON THE ELEMENT THAT TRIGGERED THE MODAL WINDOW */
                Array.prototype.forEach.call(document.getElementsByClassName("time-slot-event"),function(val,index){
                            if(val.dataset.id.toString() === timeSlotEventObject.id.toString()){
                                selectedUIIndex = index;
                            }
                });

                if(selectedUIIndex !== undefined)
                {
                    document.getElementsByClassName("time-slot-event")[selectedUIIndex].focus();
                }                
            //},500);
    }

    render() {
        let overlayClassName;
        let timeSlotEventObject = this.props.timeSlotEventState.selectedTimeSlot;

        if(this.props.timeSlotEventState.overlayReadyToLaunch){
                overlayClassName = "event-detail-overlay fade-in";

                /* FOCUS ON THE FIRST ACTIONABLE ELEMENT IN THE MODAL WINDOW */
                setTimeout(function(){
                    if(document.getElementById("event-detail-overlay__close") !== null){
                        document.getElementById("event-detail-overlay__close").focus();
                    }
                },500);
                    
                /* DISABLING PAGE SCROLL IN THE BACKGROUND */
                document.body.classList.add("unscrollable");

                let start = timeSlotEventObject.start;
                let title = timeSlotEventObject.title;
                let description = timeSlotEventObject.description;
                let color = timeSlotEventObject.color;
                let hours = timeSlotEventObject.hours;
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
            overlayClassName = "";

            this._handleEvents();

            return (
                        <section id="event-detail-overlay" className={overlayClassName}>
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


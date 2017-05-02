import {connect} from "react-redux";
import React from 'react';
import {launchOverlay} from '../actions/TimeSlotEventActions';
import PropTypes from 'prop-types'; // ES6 
import './TimeSlotEvent.css';
import {isCurrentEventDisabled} from '../utils';

class TimeSlotEvent extends React.Component {
    render() 
    {
        let timeSlotEventData = this.props["data-tseIndex"];

        /* disable button that represents an event in the past */
        let buttonStatus ;
        if(isCurrentEventDisabled(timeSlotEventData.start)){
            buttonStatus = "time-slot-event--disabled";
        }
        else{
            buttonStatus = "time-slot-event--"+timeSlotEventData.color;
        }

        return (
            <button data-id={timeSlotEventData.id} className={`time-slot-event ${buttonStatus}`} onClick={() => this.props.launchOverlay(timeSlotEventData)}>
                {timeSlotEventData.title}
            </button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
       timeSlotEventState: state.timeSlotEvent
    };
};

const mapDispatchToProps = (dispatch) => {
     return {
        launchOverlay: (data) => {
            dispatch(launchOverlay(data));
        }
     };
};

TimeSlotEvent.propTypes = {
    launchOverlay: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSlotEvent);


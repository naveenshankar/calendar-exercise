import {connect} from "react-redux";
import PropTypes from 'prop-types'; // ES6 
import React from 'react';
import './TimeSlot.css';
import {getDisplayHour} from '../utils';
import TimeSlotEvent from './TimeSlotEvent';

class TimeSlot extends React.Component {

    render() {

        let displayHour = getDisplayHour(this.props["data-tsIndex"]);
        let timeSlotEventsArray = this.props.calendarState.slotsMap[this.props["data-tsIndex"]];

        return (
            <section className="time-slot">
                <span className="time-slot__hour-label">
                    {displayHour}
                </span>
                <div className="time-slot__events">
                    {timeSlotEventsArray.map(function(val,index){
                        return (
                            <div key={index} className="time-slot__event">
                                <TimeSlotEvent data-tseIndex={val} />
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       calendarState: state.calendar
    };
};

const mapDispatchToProps = (dispatch) => {
     return {

     };
};

TimeSlot.propTypes = {
    calendarState: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSlot);


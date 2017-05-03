import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'; // ES6 
import TimeSlot from './TimeSlot';
import './Calendar.css';

class Calendar extends React.Component {
    render() {
        if(this.props.calendarState.timeSlotsPopulated === true){
            return (
                    <div>
                    {Object.keys(this.props.calendarState.slotsMap).map(function(val,index){
                                return <TimeSlot data-tsIndex={index} key={index}/>
                    })}
                    </div>
            )
        }
        else{
            return (
                    <div>
                    </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
       calendarState: state.calendar,
       dayNavigatorState: state.dayNavigator
    };
};

const mapDispatchToProps = (dispatch) => {
     return {
     };
};

Calendar.propTypes = {
    calendarState: PropTypes.object.isRequired,
    dayNavigatorState: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);



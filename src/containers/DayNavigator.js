import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'; // ES6 
import {filterEventsByDay, getDisplayDate} from '../utils';
import DATA_SET from '../utils/data';
import {setEventsByDay} from '../actions/DayNavigatorActions';

class DayNavigator extends React.Component {
    componentWillMount()
    {
        this.props.setEventsByDay(this.props.dayNavigatorState.events,this.props.dayNavigatorState.day);
    }

    render() {
        let previousDate = new Date(new Date(this.props.dayNavigatorState.day).setDate(new Date(this.props.dayNavigatorState.day).getDate() -1));
        let nextDate = new Date(new Date(this.props.dayNavigatorState.day).setDate(new Date(this.props.dayNavigatorState.day).getDate() +1));
        let eventForPreviousDate = filterEventsByDay(DATA_SET, previousDate);
        let eventForNextDate = filterEventsByDay(DATA_SET, nextDate);
        let prevButton;
        let nextButton;

        if(eventForPreviousDate.length > 0){
            prevButton = <button id="page__nav-previous"
                    className="page__nav-button page__prev-day"
                    title="Go to previous day"
                    onClick={() => 
                                {
                                this.props.setEventsByDay(DATA_SET,previousDate)
                                }
                            }
                />;
        }
        else{
            prevButton = <button id="page__nav-previous"
                    className="page__nav-button page__prev-day page__nav-button-disabled"
                    title="Go to previous day"
                />;
        }

        if(eventForNextDate.length > 0){
            nextButton = <button id="page__nav-next"
                    className="page__nav-button page__next-day"
                    title="Go to next day"
                    onClick={() => 
                                {
                                    this.props.setEventsByDay(DATA_SET,nextDate)
                                }
                            }
                />;
        }
        else{
            nextButton = <button id="page__nav-next"
                    className="page__nav-button page__next-day page__nav-button-disabled"
                    title="Go to next day"
                />;
        }

        return (
            <nav className="page__nav">
                {prevButton}
                <h2 className="page__date">{getDisplayDate(this.props.dayNavigatorState.day)}</h2>
                {nextButton}
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
       dayNavigatorState: state.dayNavigator
    };
};

const mapDispatchToProps = (dispatch) => {
     return {
        setEventsByDay: (events,day) => {
            dispatch(setEventsByDay(events,day));
        }
     };
};

DayNavigator.propTypes = {
    dayNavigatorState: PropTypes.object.isRequired,
    setEventsByDay : PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DayNavigator);




import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'; // ES6 
import {filterEventsByDay} from '../utils';

export default class DayNavigator extends PureComponent {
    static propTypes = {
        events: PropTypes.array.isRequired,
        onPrev: PropTypes.func.isRequired,
        onNext: PropTypes.func.isRequired,
        dateDisplay: PropTypes.string.isRequired,
    }

    render() {
        let {onPrev, onNext, dateDisplay,events} = this.props;
        let previousDate = new Date(new Date(dateDisplay).setDate(new Date(dateDisplay).getDate() -1));
        let nextDate = new Date(new Date(dateDisplay).setDate(new Date(dateDisplay).getDate() +1));
        let eventForPreviousDate = filterEventsByDay(events, previousDate);
        let eventForNextDate = filterEventsByDay(events, nextDate);
        let prevButton;
        let nextButton;

        if(eventForPreviousDate.length > 0){
            prevButton = <button id="page__nav-previous"
                    className="page__nav-button page__prev-day"
                    title="Go to previous day"
                    onClick={onPrev}
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
                    onClick={onNext}
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
                <h2 className="page__date">{dateDisplay}</h2>
                {nextButton}
            </nav>
        );
    }
}
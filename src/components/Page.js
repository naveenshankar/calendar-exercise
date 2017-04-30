import React, {PureComponent} from 'react';
//import ReactDOM from 'react-dom';
import Calendar from './Calendar';
import EventDetailOverlay from './EventDetailOverlay';
import {filterEventsByDay, getEventFromEvents, getDisplayDate} from '../utils';
import DATA_SET from '../utils/data';

import './Page.css';

const DayNavigator = ({dateDisplay, onPrev, onNext}) => {
    return (
        <nav className="page__nav">
            <button id="page__nav-previous"
                className="page__nav-button page__prev-day"
                title="Go to previous day"
                onClick={onPrev}
            />
            <h2 className="page__date">{dateDisplay}</h2>
            <button id="page__nav-next"
                className="page__nav-button page__next-day"
                title="Go to next day"
                onClick={onNext}
            />
        </nav>
    );
};

export default class Page extends PureComponent {
    state = {
        // unfiltered list of events
        events: DATA_SET,

        // The currently selected day represented by numerical timestamp
        day: Date.now(),

        // The currently selected event in the agenda
        // (mainly to trigger event detail overlay)
        selectedEventId: undefined
    }

    _handleSelectEvent(selectedEventId) {
        /* DISABLING PAGE SCROLL IN THE BACKGROUND */
        document.body.classList.add("unscrollable");
        document.onclick = this._handleEventDetailOverlayClose.bind(this);
        this.setState({selectedEventId});
    }

    _handleEventDetailOverlayClose(evt) {

        // let clickStatus = ReactDOM.findDOMNode(this.refs.overlay);
        // if(evt.target.className === "event-detail-overlay__close"){
        //     clickStatus = false;
        // }
        // else if(clickStatus != null){
        //     clickStatus = clickStatus.contains(evt.target);
        // }

        if(
            //(clickStatus === false ) ||
            (evt && evt.target.className.indexOf("event-detail-overlay__") < 0) || evt.target.className === "event-detail-overlay__close")
        {

            /* ENABLING PAGE SCROLL IN THE BACKGROUND AND ENABLING OVERFLOW CLOSE FOR ESCAPE/CLICK OUTSIDE OVERFLOW*/
            if(document.body.classList !== null){
                document.body.classList.remove("unscrollable");
            }

            /* FADE OUT ANIMATION FOR MODAL WINDOW CLOSING */
            if(document.getElementById("event-detail-overlay") != null){
                document.getElementById("event-detail-overlay").classList.remove("fade-in");
                document.getElementById("event-detail-overlay").classList.add("fade-out");
            }

            /*UPDATING STATE AFTER FADEOUT ANIMATION */
            setTimeout(function(){
                 this.setState({selectedEventId: undefined});
                 /* FOCUS BACK ON THE FIRST SIMILAR ELEMENT THAT TRIGGERED THE MODAL WINDOW */
                 if(document.getElementsByClassName("time-slot-event")[0] !== undefined){
                    document.getElementsByClassName("time-slot-event")[0].focus();
                }
            }.bind(this),500);
        }
    }

    _handlePrev() {
        // TODO: Update this.state.day to go back 1 day so previous button works
    }

    _handleNext() {
        // TODO: Update this.state.day to go forward 1 day so next button works
    }

    _handleKeyDownEvent(e){
        if(e.keyCode === 27){

            /* ENABLING PAGE SCROLL IN THE BACKGROUND AND ENABLING OVERFLOW CLOSE FOR ESCAPE/CLICK OUTSIDE OVERFLOW*/
            if(document.body.classList !== null){
                document.body.classList.remove("unscrollable");
            }

            /* FADE OUT ANIMATION FOR MODAL WINDOW CLOSING */
            if(document.getElementById("event-detail-overlay") != null){
                document.getElementById("event-detail-overlay").classList.remove("fade-in");
                document.getElementById("event-detail-overlay").classList.add("fade-out");
            }

            /*UPDATING STATE AFTER FADEOUT ANIMATION */
            setTimeout(function(){
                 this.setState({selectedEventId: undefined});
                 /* FOCUS BACK ON THE FIRST SIMILAR ELEMENT THAT TRIGGERED THE MODAL WINDOW */
                 if(document.getElementsByClassName("time-slot-event")[0] !== undefined){
                    document.getElementsByClassName("time-slot-event")[0].focus();
                }
            }.bind(this),500);

        }
    }

    _handleClickEvent(e){
        console.log("inside _handleClickEvent");
        console.log("this in _handleClickEvent",this);
        
        if(e.keyCode === 27){
            console.log("not escape");
            setTimeout(function(){
                 this.setState({selectedEventId: undefined});
                 /* FOCUS BACK ON THE FIRST SIMILAR ELEMENT THAT TRIGGERED THE MODAL WINDOW */
                 if(document.getElementsByClassName("time-slot-event")[0] !== undefined){
                    document.getElementsByClassName("time-slot-event")[0].focus();
                }
            }.bind(this),500);
        }
    }

    componentWillMount() {
        /* ENABLING PAGE SCROLL IN THE BACKGROUND */
        window.addEventListener("keydown",this._handleKeyDownEvent.bind(this),false);
        //window.addEventListener("keydown",this._handleEventDetailOverlayClose.bind(this),false);
    }

    render() {
        let {events, day, selectedEventId} = this.state;
        let filteredEvents = filterEventsByDay(events, day);
        let selectedEvent = getEventFromEvents(events, selectedEventId);
        let eventDetailOverlay;

        if (selectedEvent) {
            eventDetailOverlay = (
                <EventDetailOverlay 
                    ref='overlay'
                    event={selectedEvent}
                    onClose={this._handleEventDetailOverlayClose.bind(this)}
                />
            );
        }

        return (
            <div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                </header>
                <DayNavigator
                    dateDisplay={getDisplayDate(day)}
                    onPrev={this._handlePrev.bind(this)}
                    onNext={this._handleNext.bind(this)}
                />
                <Calendar events={filteredEvents} onSelectEvent={this._handleSelectEvent.bind(this)} />
                {eventDetailOverlay}
            </div>
        );
    }
}

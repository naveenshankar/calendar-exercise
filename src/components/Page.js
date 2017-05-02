import React, {PureComponent} from 'react';
import Calendar from './Calendar';
import DayNavigator from './DayNavigator';
import EventDetailOverlay from './EventDetailOverlay';
import {filterEventsByDay, getEventFromEvents, getDisplayDate} from '../utils';
import DATA_SET from '../utils/data';

import './Page.css';

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

    _handlePrev() {
        /* SETTING STATE TO PREVIOUS DAY */
        this.setState({selectedEventId: undefined});
        let currentDate = (new Date(this.state.day));
        this.setState({"day":currentDate.setDate(currentDate.getDate() -1)});
    }

    _handleNext() {
        /* SETTING STATE TO NEXT DAY */
        this.setState({selectedEventId: undefined});
        let currentDate = (new Date(this.state.day));
        this.setState({"day":currentDate.setDate(currentDate.getDate()+1)});
    }

    _handleSelectEvent(selectedEventId) {
        /* DISABLING PAGE SCROLL IN THE BACKGROUND */
        document.body.classList.add("unscrollable");
        document.onclick = this._handleEventDetailOverlayClose.bind(this);
        this.setState({selectedEventId});
    }

    _handleEventDetailOverlayClose(evt) {
        if(
           (this.state.selectedEventId !== undefined && evt && evt.target.className.indexOf("event-detail-overlay__") < 0) || 
           (this.state.selectedEventId !== undefined && evt.target.className === "event-detail-overlay__close")
           )
        {
            this._handleEvents.call(this);
        }
    }

    _handleKeyDownEvent(e){
        if(e.keyCode === 27 && this.state.selectedEventId !== undefined){
            this._handleEvents.call(this);
        }
    }

    _handleEvents(){
        let eventId = this.state.selectedEventId;
        let selectedUIIndex;
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
                 /* FOCUS BACK ON THE ELEMENT THAT TRIGGERED THE MODAL WINDOW */
                Array.prototype.forEach.call(document.getElementsByClassName("time-slot-event"),function(val,index){
                            if(val.dataset.id.toString() === eventId.toString()){
                                selectedUIIndex = index;
                            }
                });
                document.getElementsByClassName("time-slot-event")[selectedUIIndex].focus();
                this.setState({selectedEventId: undefined});
            }.bind(this),500);
    }

    componentWillMount() {
        window.addEventListener("keydown",this._handleKeyDownEvent.bind(this),false);
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
                    events={events}
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

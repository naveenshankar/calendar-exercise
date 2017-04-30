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
            <button
                className="page__nav-button page__prev-day"
                title="Go to previous day"
                onClick={onPrev}
            />
            <h2 className="page__date">{dateDisplay}</h2>
            <button
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
        console.log("inside _handleSelectEvent");
        console.log("this",this);
        document.body.classList.add("unscrollable");
        
        document.onclick = this._handleEventDetailOverlayClose.bind(this);
        //document.addEventListener("click",this._handleEventDetailOverlayClose.bind(this),{ capture: true });
        //document.addEventListener("click",this._handleEventDetailOverlayClose.bind(this),{ once: true});
        this.setState({selectedEventId});
    }

    _handleEventDetailOverlayClose(evt) {
        console.log("inside _handleEventDetailOverlayClose");
        //var thisObj = this;
        console.log("evt",evt);
        console.log("evt.target.className",evt.target.className);
        console.log("this",this);

        // if (ReactDOM.findDOMNode(this.refs.overlay).contains(evt.target)) {
        //   console.log("clicked inside overlay");
        // }
        // else{
        //     console.log("clicked outside overlay");
        // }

        if((evt && evt.keyCode === 27) || (evt && evt.dispatchConfig !== undefined) || (evt && evt.target.className.indexOf("event-detail-overlay__") < 0)){
            /* ENABLING PAGE SCROLL IN THE BACKGROUND AND ENABLING OVERFLOW CLOSE FOR ESCAPE/CLICK OUTSIDE OVERFLOW*/
            if(document.body.classList !== null){
                document.body.classList.remove("unscrollable");
            }
            console.log("document.getElementById('event-detail-overlay')",document.getElementById("event-detail-overlay"));
            if(document.getElementById("event-detail-overlay") != null){
                document.getElementById("event-detail-overlay").classList.remove("fade-in");
                document.getElementById("event-detail-overlay").classList.add("fade-out");
            }

            //console.log("thisObj",thisObj);
            //document.removeEventListener("click",thisObj._handleEventDetailOverlayClose.bind(thisObj),{ capture: true });

            setTimeout(function(){
                 this.setState({selectedEventId: undefined});
            }.bind(this),500);
        }
    }

    _handlePrev() {
        // TODO: Update this.state.day to go back 1 day so previous button works
    }

    _handleNext() {
        // TODO: Update this.state.day to go forward 1 day so next button works
    }

    componentWillMount() {
        /* ENABLING PAGE SCROLL IN THE BACKGROUND */
        window.onkeydown = this._handleEventDetailOverlayClose.bind(this);
    }

    render() {
        let {events, day, selectedEventId} = this.state;
        let filteredEvents = filterEventsByDay(events, day);
        let selectedEvent = getEventFromEvents(events, selectedEventId);
        let eventDetailOverlay;

        if (selectedEvent) {
            eventDetailOverlay = (
                <EventDetailOverlay 
                    isOpen="false" ref='overlay'
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
                <Calendar isModalOpen={caldr => this.modalStatus = caldr}  events={filteredEvents} onSelectEvent={this._handleSelectEvent.bind(this)} />
                {eventDetailOverlay}
            </div>
        );
    }
}

import {filterEventsByDay} from '../utils';
import store from "../store";
import {populateTimeSlots} from '../actions/CalendarActions';
import {filterEventsByHour} from '../utils';
import {HOURS_DAY} from '../utils/constants';

export function setEventsByDay(events,day) {
    return {
        type: "FILTER_EVENTS_BY_DAY",
		payload: new Promise((resolve, reject) => {
			let filteredEvents = filterEventsByDay(events, day);
			var slotsMap = {};
			new Array(HOURS_DAY)
                .fill(0)
                .forEach((item, index) => {
                    let hour = index;
                    let filteredEventsByHour = filterEventsByHour(filteredEvents, hour);
                    slotsMap[hour] = filteredEventsByHour;
                });

			store.dispatch(populateTimeSlots(slotsMap));
            setTimeout(() => {
                resolve({"day":day,"events":events,"eventsFilteredbyDay":filteredEvents});
            }, 0);
        })
    };
}
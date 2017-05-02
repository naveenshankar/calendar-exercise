import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import {routerReducer } from 'react-router-redux';
import calendar from "./reducers/CalendarReducer";
import dayNavigator from "./reducers/DayNavigatorReducer";
import timeSlotEvent from "./reducers/TimeSlotEventReducer";
import promiseMiddleware from "redux-promise-middleware";

var storeConfig;

//PERSISTING REDUX STATES WITH LOCAL STORAGE
export const loadState = () => {
	try{
		if(localStorage.getItem('state') == null){
			let initialState = undefined;
			return initialState;
		}
		return JSON.parse(localStorage.getItem('state'));
	}
	catch(err){
		return undefined;
	}
}
export const saveState = (state) => {
	try{
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state',serializedState);
	}
	catch(err){
		//ignore
	}
}
export const deleteState = (state) => {
	try{
		localStorage.removeItem('state');
	}
	catch(err){
		//ignore
	}
}

storeConfig = createStore(
		    combineReducers({
		        calendar,
		        dayNavigator,
		        timeSlotEvent,
		        routing:routerReducer
		    }),
		    loadState(),
		    applyMiddleware(logger,promiseMiddleware())
		);

export default storeConfig;


import React, {PureComponent} from 'react';
import './Page.css';
//import Page from './Page';

import Calendar from '../containers/Calendar';
import EventDetailOverlay from '../containers/EventDetailOverlay';
import DayNavigator from '../containers/DayNavigator';

export default class App extends PureComponent {
	//IMPLEMENTED WITHOUT REDUX
    // render() {
    //     return (<Page />);
    // }

    // IMPLEMENTED WITH REDUX
    render() {
        return (
        	<div className="page">
                <header className="page__header">
                    <h1 className="page__title">Daily Agenda</h1>
                </header>
                <DayNavigator />
                <Calendar />
        		<EventDetailOverlay />
        	</div>
        );
    }

};

import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute , browserHistory} from "react-router";
import App from './components/App';
import {NoMatch} from "../src/components/NoMatch";
import {Welcome} from "../src/components/Welcome";
import {Root} from "../src/components/Root";
import './index.css';
import {Provider} from "react-redux";
import { syncHistoryWithStore } from 'react-router-redux';
import store from "./store";
import {saveState,deleteState} from "./store";

const app = document.getElementById('root');
var react_router_redux_history ;
react_router_redux_history = syncHistoryWithStore(browserHistory, store);

store.subscribe(() => {
  // persist your state
  if(!store.getState().calendar.deleteCache){
    saveState(store.getState());
  }
  else{
    deleteState(store.getState());
  }
})

export class DailyCalendarApp extends React.Component {
    render() {
        return (
        <Router history={react_router_redux_history}>
				<Route path="/" component={Root}>
  					<IndexRoute component={Welcome} />
  					<Route path="activity" component={App} />
  					<Route path="*" component={NoMatch} />
				</Route>
		  	</Router>
        )
    }
}

render(<Provider store={store}><DailyCalendarApp/></Provider>, app);
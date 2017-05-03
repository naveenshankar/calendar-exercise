
import React from "react";

class Welcome extends React.Component {
  	render() {
  			return (
				<div className="message__container">
				  <h1>Welcome to the Calendar App</h1>
			      <p>Expertly manage your schedule!</p>
				  <div className="calendar__link">
				  	<a className="link__activity"href="/activity">Click to Navigate to activity page</a>
				  </div>
			    </div>
			);
		}
}

export {Welcome};

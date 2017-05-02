import React from "react";
import {Link} from "react-router";

export class NoMatch extends React.Component {
  render()
  		{
  			return (
					<div className="rs_message container">
				      <h1>404 Page Not Found!!</h1>
				      <p>This url does not exist</p>
				      <Link className="back__on__track" to="/">This should get you back on track</Link>
				    </div>
			);
		}
}
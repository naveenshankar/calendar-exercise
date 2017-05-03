import React from "react";

export class Root extends React.Component {
  	render() {
  			return (
				<div className="rs_mainContainer">
					<div className="rs_body col-xs-12 col-sm-12 col-lg-10">
						{this.props.children}
					</div>
				</div>
			);
		}
}

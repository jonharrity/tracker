var React = require('react');

import Note from './Note.js';

import User from './User.js';

export default class Square extends React.Component
{

	constructor(props)
	{
		super(props);

		this.setAdminStatus = this.setAdminStatus.bind(this);
		new User().isAdmin(this.setAdminStatus);

		this.state = {
			data: props.data,
			isAdmin: false,
		};
	}

	render()
	{
		var keys = Object.keys(this.state.data);
		var notes = keys.map( (key) => {
			return <Note key={key} text={this.state.data[key]} />;
		});

		var addNoteButton = '';
		if( this.state.isAdmin )
		{
			addNoteButton = 	<button>
									add note
								</button>;
		}
		return 	<div className='square' style={this.getStyle()}>
							<div className='square-title'>{this.props.name}</div>
							{notes}
							{addNoteButton}
						</div>;

	}

	setAdminStatus(newStatus)
	{
		this.setState({
			isAdmin: newStatus,
		});
	}

	getStyle() {
		return {
			backgroundColor: this.props.bgcolor
		}
	}


}

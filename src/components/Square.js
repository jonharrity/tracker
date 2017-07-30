var React = require('react');

import Note from './Note.js';

import User from './User.js';

export default class Square extends React.Component
{

	constructor(props)
	{
		super(props);

		this.setAdminStatus = this.setAdminStatus.bind(this);
		this.handleAddNote = this.handleAddNote.bind(this);
		this.handleCancelNote = this.handleCancelNote.bind(this);
		this.refreshData = this.refreshData.bind(this);
		this.handleSubmitNote = this.handleSubmitNote.bind(this);
		new User().isAdmin(this.setAdminStatus);

		this.state = {
			data: props.data,
			isAdmin: false,
			isAddingNote: false,
		};
	}

	render()
	{
		var keys = Object.keys(this.state.data);
		var notes = [];
		for( var i=keys.length-1 ; i>=0 ; i--)
		{
			var key = keys[i];
			notes.push(<Note key={key} text={this.state.data[key]} />);
		}


		var addNote = '';

		if( this.state.isAddingNote )
		{
			addNote = 	<div>
							<br />
							<input ref='addNoteInput' />
							&nbsp;
							<button onClick={this.handleSubmitNote}>add</button>
							&nbsp;
							<button onClick={this.handleCancelNote}>cancel</button>
						</div>;
		}
		else
		{
			if( this.props.canEdit )
			{
				addNote = 	<div>
								<br />
								<button onClick={this.handleAddNote}>add note</button>
							</div>;
			}
		}


		return 	<div className='square' style={this.getStyle()}>
					<div className='square-title'>{this.props.name}</div>
					{addNote}
					{notes}
				</div>;

	}

	handleCancelNote()
	{
		this.setState({
			isAddingNote: false,
		});
	}

	handleSubmitNote()
	{
		var noteValue = this.refs.addNoteInput.value;
		if( noteValue === '' )
			return;

		var key = Date.now();

		firebase.database().ref(this.props.firebaseRef)
		.push(noteValue, (error) =>
		{
			if( error )
				console.log('>> error adding note['+noteValue+']:',error);

			this.setState({
				isAddingNote: false,
			});
			this.refreshData();
		});
	}

	refreshData()
	{
		firebase.database().ref(this.props.firebaseRef)
		.once('value').then( (snapshot) =>
		{
			this.setState({
				data: snapshot.val(),
			});
		});
	}

	handleAddNote()
	{
		this.setState({
			isAddingNote: true,
		});
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
		};
	}


}

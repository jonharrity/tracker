var React = require('react');

import Square from './Square.js';
import User from './User.js';
import UserStatus from './UserStatus.js';
import './styles.css';


export default class App extends React.Component
{

	constructor(props)
	{
		super(props);
		this.user = new User();
		this.uidChangeCallback = this.uidChangeCallback.bind(this);
		this.user.onUID(this.uidChangeCallback);
		this.state = {
			public: null,
			user: null,
			userData: 'loading',
			uid: this.user.getUID(),
		}
		var db = firebase.database();
		db.ref('/public').once('value')
		.then( (snapshot) => {
			this.setState({public: snapshot.val()});
		});

		if( this.state.uid )
		{
			db.ref('/users/'+this.state.uid+'/data').once('value')
			.then( (snapshot) => {
				this.setState({user: snapshot.val()});
			});
		}
		this.squareCount = -1;
		this.colors = ['#45adf7', '#fc7686', '#ffffff'];
	}

	render()
	{
		if( this.state.public === null && this.state.user === null)
		{
			return	<div className='app'>
						{userStatus}
						Loading squares...
					</div>;
		}

		var userStatus = <UserStatus userData={this.state.userData}/>;

		var publicKeys = [], userKeys = [];
		if( this.state.public )
			var publicKeys = Object.keys(this.state.public);
		if( this.state.user)
			var userKeys = Object.keys(this.state.user);
		var squareCount = publicKeys.length + userKeys.length;
		if( squareCount === 0 )
		{
			return 	<div className='app'>
								{userStatus}
								no squares :(
							</div>;
		}

		if( this.state.public )
			var publicSquares = this.getSquares(this.state.public, 'public squares');
		if( this.state.user )
			var userSquares = this.getSquares(this.state.user, 'user squares');

		return 	<div className='app'>
					{userStatus}
					{userSquares}
					{publicSquares}
				</div>;
	}

	uidChangeCallback(newUID)
	{
		this.setState({
			uid: newUID,
		}, () => {
			if( this.state.uid)
				firebase.database().ref('/users/'+this.state.uid+'/data').once('value')
				.then( (snapshot) => {
					this.setState({user: snapshot.val()});
				});
		});

	}

	getSquares(obj, label)
	{
		var squares = Object.keys(obj).map( (key) => {
			this.squareCount += 1;
			if( this.squareCount == this.colors.length )
				this.squareCount = 0;
			return <Square bgcolor={this.colors[this.squareCount]} key={key} name={key} data={obj[key]} />
		});

		if( squares )
			squares.splice(0, 0, <div className='square-label'>{label}</div>);

		return squares;
	}


}

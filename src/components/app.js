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
			publicSquareData: null,
			userSquareData: null,
			userData: 'loading',
			uid: this.user.getUID(),
			isAdmin: false,
		}
		var db = firebase.database();
		db.ref('/public').once('value')
		.then( (snapshot) => {
			this.setState({publicSquareData: snapshot.val()});
		});

		if( this.state.uid )
		{
			console.log('has user in constructor , actually entering if');
			db.ref('/users/'+this.state.uid+'/data').once('value')
			.then( (snapshot) => {
				this.setState({userSquareData: snapshot.val()});
			});
		}
		this.squareCount = -1;
		this.colors = ['#45adf7', '#fc7686', '#ffffff'];
	}

	render()
	{
		if( this.state.publicSquareData === null && this.state.userSquareData === null)
		{
			return	<div className='app'>
						{userStatus}
						Loading squares...
					</div>;
		}

		var userStatus = <UserStatus userData={this.state.userData}/>;

		var publicKeys = [], userKeys = [];
		if( this.state.publicSquareData )
			var publicKeys = Object.keys(this.state.publicSquareData);
		if( this.state.userSquareData)
			var userKeys = Object.keys(this.state.userSquareData);
		var squareCount = publicKeys.length + userKeys.length;
		if( squareCount === 0 )
		{
			return 	<div className='app'>
								{userStatus}
								no squares :(
							</div>;
		}

		if( this.state.publicSquareData )
		{
			var publicSquares = this.getSquares(this.state.publicSquareData,
			'public squares', this.state.isAdmin, '/public/');
		}
		if( this.state.userSquareData )
		{
			var userSquares = this.getSquares(this.state.userSquareData, 'user squares',
			true, '/users/'+this.state.uid +'/data/');
		}

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
			{
				firebase.database().ref('/users/'+this.state.uid+'/data').once('value')
				.then( (snapshot) => {
					this.setState({userSquareData: snapshot.val()});
				});
				this.user.isAdmin( (newStatus) =>
				{
					this.setState({
						isAdmin: newStatus
					});
				});
			}
		});

	}

	getSquares(obj, label, canEdit, baseRef)
	{
		var squares = Object.keys(obj).map( (key) => {
			this.squareCount += 1;
			if( this.squareCount == this.colors.length )
				this.squareCount = 0;

			var ref = baseRef + key;
			return 	<Square
						canEdit={canEdit}
						firebaseRef={ref}
						bgcolor={this.colors[this.squareCount]}
						key={key}
						name={key}
						data={obj[key]} />
		});

		if( squares )
			squares.splice(0, 0, <div className='square-label'>{label}</div>);

		return squares;
	}


}

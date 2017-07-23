var React = require('react');

import Square from './Square.js';
import './styles.css';

export default class App extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			data: 'loading',
		}
		firebase.database().ref('/public').once('value')
		.then( (snapshot) => {
			this.setState({data: snapshot.val()})
		});

	}

	render()
	{
		if( this.state.data === 'loading' )
		{
			return <div>
							Loading squares...
						</div>;
		}

		var squareKeys = Object.keys(this.state.data);
		var squareCount = squareKeys.length;
		if( squareCount === 0 )
		{
			return 	<div>
								no squares :(
							</div>;
		}

		var squares = squareKeys.map( (key) => {
			return <Square key={key} name={key} data={this.state.data[key]} />
		});

		return 	<div>
							{squares}
						</div>;
	}




}

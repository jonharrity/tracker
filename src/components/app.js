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
			return <div className='app'>
							Loading squares...
						</div>;
		}

		

		var squareKeys = Object.keys(this.state.data);
		var squareCount = squareKeys.length;
		if( squareCount === 0 )
		{
			return 	<div className='app'>
								no squares :(
							</div>;
		}

		var colors = ['#45adf7', '#fc7686', '#ffffff']
		var count = -1;
		var squares = squareKeys.map( (key) => {
			count += 1;
			if( count == colors.length )
				count = 0;
			return <Square bgcolor={colors[count]} key={key} name={key} data={this.state.data[key]} />
		});

		return 	<div className='app'>
							{squares}
						</div>;
	}




}

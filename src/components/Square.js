var React = require('react');

import Note from './Note.js';



export default class Square extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			data: props.data,
		};
	}

	render()
	{
		var keys = Object.keys(this.state.data);
		var notes = keys.map( (key) => {
			return <Note key={key} data={this.state.data[key]} />;
		});

		return 	<div className='square'>
							<div className='square-title'>{this.props.name}</div>
							{notes}
						</div>;

	}


}

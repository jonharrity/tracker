var React = require('react');





export default class Note extends React.Component
{

  render()
  {
    var lines = this.props.text.split('\n');

    var note = lines.map( (line) => {
      return <div>{line}</div>;
    })


    return  <div className='note'>
              {note}
            </div>;
  }



}

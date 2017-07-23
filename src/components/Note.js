var React = require('react');





export default class Note extends React.Component
{

  render()
  {
    return  <div className='note'>
              {this.props.data}
            </div>;
  }



}

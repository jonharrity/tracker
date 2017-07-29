var React = require('react');


import User from './User.js';



export default class UserStatus extends React.Component
{

    constructor(props)
    {
      super(props);

      this.handleLogin = this.handleLogin.bind(this);
      this.setAdminStatus = this.setAdminStatus.bind(this);

      new User().isAdmin(this.setAdminStatus);

      this.state = {
          isAdmin: false,
          email: new User().getEmail(),
      }
    }


    render()
    {
        if( this.state.email )
        {
            var adminLabel = '';
            if( this.state.isAdmin )
                adminLabel = '[admin]';

            var panel =   <div>
                            logged in as {this.state.email} {adminLabel}
                            {}
                            <br />
                            <button onClick={this.handleLogout}>logout</button>
                            </div>;
        }
        else
        {
            var panel = <div>
                            not currently logged in
                            <br />
                            <button onClick={this.handleLogin}>login</button>
                        </div>;
        }



      return  <div className='user-status'>
                {panel}
              </div>;
    }

    setAdminStatus(newStatus)
    {
        this.setState({
            isAdmin: newStatus
        });
    }


    handleLogin()
    {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    handleLogout()
    {
        firebase.auth().signOut();
    }


}

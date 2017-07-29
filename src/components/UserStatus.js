var React = require('react');


import User from './User.js';



export default class UserStatus extends React.Component
{

    constructor(props)
    {
      super(props);

      this.handleLogin = this.handleLogin.bind(this);
      this.setAdminStatus = this.setAdminStatus.bind(this);
      this.handleUIDChange = this.handleUIDChange.bind(this);

      var user = new User();
      user.isAdmin(this.setAdminStatus);
      user.onUID(this.handleUIDChange);

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

    handleUIDChange(newUID)
    {
        var user = new User();
        user.isAdmin(this.setAdminStatus);
        this.setState({
            email: user.getEmail(),
        });
    }

    handleLogin()
    {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then( (result) =>
        {
            new User().getUID();
        });
    }

    handleLogout()
    {
        firebase.auth().signOut()
        .then( (result) =>
        {
            new User().getUID();
        });
    }


}

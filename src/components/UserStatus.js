var React = require('react');




export default class UserStatus extends React.Component
{


    constructor(props)
    {
      super(props);

      var email = this.getEmail();

      this.state = {
        email: email,
      }
      this.handleLogin = this.handleLogin.bind(this);
    }

    getEmail()
    {
      var currentUser = firebase.auth().currentUser;
      var email = null;
      if( currentUser )
        email = currentUser.email;
      return email;
    }

    render()
    {
      if( this.state.email == null )
      {
        var panel = <div>
                      not currently logged in
                      <br />
                      <button onClick={this.handleLogin}>login</button>
                    </div>;
      }
      else
      {
        var panel =   <div>
                        logged in as {this.state.email}
                        <br />
                        <button onClick={this.handleLogout}>logout</button>
                      </div>;
      }



      return  <div className='user-status'>
                {panel}
              </div>;
    }



    handleLogin()
    {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then( (result) => {
        this.setState({
          email: this.getEmail()
        });
      });
    }

    handleLogout()
    {
      firebase.auth().signOut();
    }


}




class User
{

    getEmail()
    {
        var currentUser = firebase.auth().currentUser;

        if( currentUser )
            return currentUser.email;
        else
            return null;
    }

    getUID()
    {
        var currentUser = firebase.auth().currentUser;

        if( currentUser )
        {
            if( currentUser.uid !== User.uid )
            {
                User.uid = currentUser.uid;
                this.handleUIDChange(currentUser.uid);
            }

            return currentUser.uid;
        }
        else
        {
            return null;
        }
    }

    handleUIDChange(newUID)
    {
        for( var i=0 ; i<User.uidChangeCallbacks.length ; i++ )
        {
            User.uidChangeCallbacks[i](newUID);
        }
        User.uid = newUID;
    }

    onUID(callback)
    {
        User.uidChangeCallbacks.push(callback);
    }

    offUID(callback)
    {
        User.uidChangeCallbacks.splice(User.uidChangeCallbacks.indexOf(callback), 1);
    }

    isAdmin(callback)
    {
        var user = firebase.auth().currentUser;
        if( ! user )
            return false;
        firebase.database().ref('/users/' + this.getUID() + '/admin').once('value')
        .then( (snapshot) => {
            snapshot = snapshot.val();
            var status = snapshot === true;
            this.getUID();
            callback(status);
        });
    }

}



User.uidChangeCallbacks = [];
User.uid = null;


export default User;

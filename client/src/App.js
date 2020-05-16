import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Main from './pages/Main';
import Results from './pages/Results';
import Doctors from './pages/Doctors';
import Message from './pages/Message';
import Appointment from './pages/Appointment';
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    AUTH.getUser().then(response => {
        // console.log(response.data);
        if (!!response.data.user) {
          setLoggedIn(true);
          setUser(response.data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      });

      return () => {
        setLoggedIn(false);
        setUser(null);
      };
  }, []);

	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
			}
		});
	};

	const login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
      }
    });
	};

  return (
    <div className="App">
      { loggedIn && (
        <div>
          <Nav user={user} logout={logout}/>
          <div className="main-view">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/main" component={Main} />
              <Route exact path="/doctors" component={Doctors} />
              <Route exact path="/appointment" component={Appointment} />
              <Route exact path="/message" component={Message} />
              <Route exact path="/results" component={Results} />
              <Route exact path="/books/:id" component={Detail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <div className="auth-wrapper" style={{paddingTop:40}}>
          <Route exact path="/" component={() => <LoginForm login={login}/>} />
          <Route exact path="/main" component={() => <LoginForm user={login} />} />
          <Route exact path="/doctors" component={() => <LoginForm user={login} />} />
          <Route exact path="/appointment" component={() => <LoginForm user={login} />} />
          <Route exact path="/message" component={() => <LoginForm user={login} />} />
          <Route exact path="/results" component={() => <LoginForm user={login} />} />
          <Route exact path="/signup" component={SignupForm} />
        </div>
      )}
    </div>
  );
}

export default App;

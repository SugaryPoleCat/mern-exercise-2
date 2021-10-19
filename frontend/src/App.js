// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddReview from './components/add-review.js';
import Restaurant from './components/restaurants.js';
import RestaurantsList from './components/restaurants-list.js';
import Login from './components/login.js';


function App() {
    const [user, setUser] = React.useState(null);

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null);
    }
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/restaurants" className="navbar-brand">
                    Restaurant reviews
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/restaurants"} className="nav-link">
                            Restaurants
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/* this chekcs if user exists or not and if they do, it will be displayed as logouts */}
                        {user ? (
                            <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                                Logout {user.name}
                            </a>
                        ) : (
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        )}
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    {/* so this path handles multiple paths, like if user types in / or /restaurants we will go here */}
                    <Route exact path={['/', '/restaurants']} component={RestaurantsList} />
                    {/* <Route exact path="/redirect" render={() => {
                        handleRedirect();
                        return <RestaurantsList />;
                    }} /> */}
                    <Route path="/restaurants/:id/review" render={(props) => (<AddReview {...props} user={user} />)} />
                    <Route path="/restaurants/:id" render={(props) => (
                        <Restaurant {...props} user={user} />
                    )} />
                    <Route path="/login" render={(props) => (
                        <Login {...props} login={login} />
                    )} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
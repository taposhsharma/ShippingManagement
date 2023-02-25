import './App.css'
import React,{createContext, useEffect, useReducer,useContext} from 'react'
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import PackageAdd from './components/screens/PackageAdd';
import Signup from './components/screens/Signup';

import { initialState, reducer } from './components/reducers/userReducer';

import Searchpackage from './components/screens/Searchpackage';
import AddEmployee from './components/screens/AddEmployee';

export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  console.log(state)

  
  
  return (
      <Switch>
        <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
     
     
     
      <Route path="/packageadd">
        <PackageAdd/>
      </Route>
      <Route path="/searchpackage">
        <Searchpackage/>
      </Route>
    <Route path='/addEmployee'>
      <AddEmployee/>
    </Route>

    </Switch>
)
}

function App() {

  const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <div className="App">
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    </div>
  );
}

export default App;

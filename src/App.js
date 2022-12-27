import './App.css';
import Home from './TaskManager'
import Datatable from './page/Datatable';
import Login from './page/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  //Navigate,
} from "react-router-dom"

import {useContext} from "react"
import {AuthContext} from "./context/AuthContext"

function App() {

const {currentUser} = useContext(AuthContext)
//const currentUser = true

  //const RequireAuth = ({childern}) => {
   // return currentUser ? childern : <Navigate to="login"/>
 //};


  console.log(currentUser)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route path="login" element={<Login />} />
            <Route
              index
              element={ 
                //<RequireAuth>
                  <Home />
                //</RequireAuth>
              }
            />
          </Route>
          <Route path="download">
            <Route
              index
              element={ 
                <Datatable />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

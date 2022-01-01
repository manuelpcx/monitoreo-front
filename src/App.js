import {useContext} from 'react'
import injectContext from '../src/store/appContext'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Turnos from '../src/components/Turnos/turnos'
import LoginUser from '../src/components/Login/LoginUser'
import {Context} from '../src/store/appContext'
import EditTurnos from '../src/components/Turnos/editTurnos'

function App() {
  const {store} = useContext(Context)
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginUser} />
          <Route exact path="/turnos" component={Turnos} />
          <Route exact path="/editTurnos" component={EditTurnos} />
        </Switch>
    </BrowserRouter>
  );
}

export default injectContext(App);

//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // lista de icones https://icons.getbootstrap.com/
import Menu from "./componentes/Menu";
import Estado from "./componentes/estado/Estado";
import Cidade from "./componentes/cidade/Cidade";
import Pessoa from "./componentes/pessoa/Pessoa";
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Router>
          
          <Menu />
          <Switch>
            <Route exact path="/estado" render={() => <Estado  />} />
            <Route exact path="/cidade" render={() => <Cidade  />} />
            <Route exact path="/pessoa" render={() => <Pessoa  />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'font-awesome/css/font-awesome.min.css'
import Tabela from "./Tabela";
import Cadastrar from "./Cadastrar";
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Estado extends Component {

  state = {
    alerta: { status: "", mensagem: "" }
  };

  // função para atualizar o alerta, que recebe o retorno da API
  atualizaAlerta = (pstatus, pmensagem) => {
    this.setState({ alerta: { status: pstatus, mensagem: pmensagem } })
  }  

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Router>

          <Switch>            
            <Route exact path="/cidade" render={() => <Tabela
              alerta={this.state.alerta}
              atualizaAlerta={this.atualizaAlerta} />} />           
            <Route exact path="/cadastrarcidade" render={() => <Cadastrar editar={false}
              objeto={{ codigo: 0, nome: "", estado_codigo: 0 }}
              atualizaAlerta={this.atualizaAlerta} />} />
            <Route exact path="/editarcidade/:codigo"
              render={props => {
                return (
                  <Cadastrar editar={true}
                    objeto={{ codigo: props.match.params.codigo, nome: "", estado_codigo: 0 }}
                    atualizaAlerta={this.atualizaAlerta} />
                )
              }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Estado;
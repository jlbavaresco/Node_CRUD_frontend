//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'font-awesome/css/font-awesome.min.css'
import Tabela from "./Tabela";
import Cadastrar from "./Cadastrar";
import CadastrarTelefone from "./CadastrarTelefone";
import Telefones from "./Telefones";
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class Pessoa extends Component {

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
            <Route exact path="/pessoa" render={() => <Tabela
              alerta={this.state.alerta}
              atualizaAlerta={this.atualizaAlerta} />} />
            <Route exact path="/cadastrarpessoa" render={() => <Cadastrar editar={false}
              objeto={{ codigo: 0, nome: "", nascimento: "", salario: "", cidade_codigo: "" }}
              atualizaAlerta={this.atualizaAlerta} />} />
            <Route exact path="/editarpessoa/:codigo"
              render={props => {
                return (
                  <Cadastrar editar={true}
                    objeto={{
                      codigo: props.match.params.codigo, nome: "",
                      nascimento: "", salario: "", cidade_codigo: ""
                    }}
                    atualizaAlerta={this.atualizaAlerta} />
                )
              }} />
            <Route exact path="/pessoa/cadastrartelefone/:codigo"
              render={props => {
                return (
                  <CadastrarTelefone editar={false}
                    telefone={{
                      codigo: 0, numero: "",
                      descricao: "", pessoa: props.match.params.codigo
                    }} atualizaAlerta={this.atualizaAlerta} />
                )
              }} />
            <Route exact path="/pessoa/editartelefone/:codigo"
              render={props => {
                return (
                  <CadastrarTelefone editar={true}
                    telefone={{
                      codigo: props.match.params.codigo, numero: "",
                      descricao: "", pessoa: ""
                    }} atualizaAlerta={this.atualizaAlerta} />
                )
              }} />
            <Route exact path="/pessoa/editartelefones/:codigo"
              render={props => {
                return (
                  <Telefones editar={true}
                    objeto={{
                      codigo: props.match.params.codigo, nome: "",
                      nascimento: "", salario: "", cidade_codigo: ""
                    }} atualizaAlerta={this.atualizaAlerta}                    
                    alerta={this.state.alerta}/>
                )
              }} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Pessoa;
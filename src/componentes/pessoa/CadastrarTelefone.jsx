import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import config from '../../Config';

class CadastrarTelefone extends Component {


    state = {
        telefone: {
            codigo: this.props.telefone.codigo,
            numero: this.props.telefone.numero,
            descricao: this.props.telefone.descricao,
            pessoa: this.props.telefone.pessoa
        },
        redirecionar: false
    };


    acaoCadastrar = async e => {
        e.preventDefault();
        if (this.props.editar) {
            try {
                const body = {
                    codigo: this.state.telefone.codigo,
                    numero: this.state.telefone.numero,
                    descricao: this.state.telefone.descricao,
                    pessoa: this.state.telefone.pessoa
                };
                const response = await fetch(config.enderecoapi+'/api/telefones', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        this.props.atualizaAlerta(json.status, json.message);
                    });
            } catch (err) {
                console.error(err.message);
            }
        } else {
            try {
                const body = {
                    numero: this.state.telefone.numero,
                    descricao: this.state.telefone.descricao,
                    pessoa: this.state.telefone.pessoa
                };
                const response = await fetch(config.enderecoapi+'/api/telefones', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        this.props.atualizaAlerta(json.status, json.message);
                    });
            } catch (err) {
                console.error(err.message);
            }
        }
        this.setState({ redirecionar: true });
    };

    recuperar = async codigo => {
        // aqui eu recupero um unico objeto passando o id
        await fetch(`${config.enderecoapi}/api/telefone/${codigo}`)
            .then(response => response.json())
            .then(data => this.setState({
                telefone: data[0] // aqui pego o primeiro elemento do json que foi recuperado  data[0]
            }))
            .catch(err => console.log(err))
        //console.log("Objeto recuperado: " + this.state.objeto.codigo +
        //    " Nome: " + this.state.objeto.nome + " Nascimento: " + this.state.objeto.nascimento)
    }

    componentDidMount() {
        console.log("props: " + this.props.telefone.codigo)
        if (this.props.editar) {
            this.recuperar(this.state.telefone.codigo);
        }
    }


    render() {
        if (this.state.redirecionar === true) {

            return <Redirect to={{ pathname: `/pessoa/editartelefones/${this.state.telefone.pessoa}` }} />
        }
        return (



            <div style={{ padding: '20px' }}>
                <h2>Edição de Telefone</h2>
                <form id="formulario" onSubmit={this.acaoCadastrar}>
                    <div className="form-group">
                        <label htmlFor="txtCodigo" className="form-label">Código</label>
                        <input type="text" readOnly className="form-control" id="txtCodigo"
                            defaultValue={this.props.codigo} value={this.state.telefone.codigo}
                            onChange={
                                e => this.setState({
                                    telefone: {
                                        ...this.state.telefone, codigo: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNumero" className="form-label">Número</label>
                        <input type="text" required className="form-control" id="txtNumero" size="14" maxLength="14"
                            defaultValue={this.props.numero} value={this.state.telefone.numero}
                            onChange={
                                e => this.setState({
                                    telefone: {
                                        ...this.state.telefone, numero: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtDescricao" className="form-label">Descrição</label>
                        <input type="text" required className="form-control" id="txtDescricao"
                            defaultValue={this.props.descricao} value={this.state.telefone.descricao}
                            onChange={
                                e => this.setState({
                                    telefone: {
                                        ...this.state.telefone, descricao: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Salvar  <i className="bi bi-save"></i>
                    </button>
                </form>
            </div>
        );
    }
}

export default CadastrarTelefone;
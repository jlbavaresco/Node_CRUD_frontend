import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import config from '../../Config';

class Cadastrar extends Component {

    state = {
        objeto: {
            codigo: this.props.objeto.codigo,
            nome: this.props.objeto.nome,
            uf: this.props.objeto.uf
        },
        redirecionar: false
    };

    acaoCadastrar = async e => {
        var atualizaAlerta = this.props.atualizaAlerta;
        e.preventDefault();
        if (this.props.editar) {
            try {
                const body = {
                    codigo: this.state.objeto.codigo,
                    nome: this.state.objeto.nome,
                    uf: this.state.objeto.uf
                };
                const response = await fetch('http://'+config.enderecoapi+'/api/estados', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        atualizaAlerta(json.status, json.message);
                    });

            } catch (err) {
                console.error(err.message);
            }
        } else {
            try {
                const body = {
                    nome: this.state.objeto.nome,
                    uf: this.state.objeto.uf
                };
                const response = await fetch('http://'+config.enderecoapi+'/api/estados', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status + " Message: " + json.message)                    
                        atualizaAlerta(json.status, json.message);
                    });
            } catch (err) {
                console.error(err.message);
            }
        }
        this.setState({ redirecionar: true });
    };

    recuperar = async codigo => {
        // aqui eu recupero um unico objeto passando o id
        await fetch(`http://${config.enderecoapi}/api/estados/${codigo}`)
            .then(response => response.json())
            .then(data => this.setState({
                objeto: data[0] // aqui pego o primeiro elemento do json que foi recuperado  data[0]
            }))
            .catch(err => console.log(err))
        //console.log("Objeto recuperado: " + this.state.objeto.codigo +
        //    " Nome: " + this.state.objeto.nome + " UF: " + this.state.objeto.uf)
    }

    componentDidMount() {
        if (this.props.editar) {
            this.recuperar(this.state.objeto.codigo);
        }
    }

    render() {
        if (this.state.redirecionar === true) {
            return <Redirect to="/estado" />
        }
        return (
            <div style={{ padding: '20px' }}>
                <h2>Edição de estado</h2>
                <form id="formulario" onSubmit={this.acaoCadastrar}>
                    <div className="form-group">
                        <label htmlFor="txtCodigo" className="form-label">Código</label>
                        <input type="text" readOnly className="form-control" id="txtCodigo"
                            defaultValue={this.props.codigo} value={this.state.objeto.codigo}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, codigo: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNome" className="form-label">Nome</label>
                        <input type="text" required className="form-control" id="txtNome" size="40" maxLength="40"
                            defaultValue={this.props.nome} value={this.state.objeto.nome}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, nome: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtUF" className="form-label">UF</label>
                        <input type="text" required className="form-control" id="txtUF" size="2" maxLength="2"
                            defaultValue={this.props.uf} value={this.state.objeto.uf}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, uf: e.target.value
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

export default Cadastrar;
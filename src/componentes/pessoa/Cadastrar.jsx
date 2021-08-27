import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import config from '../../Config';
import { Dropdown } from 'primereact/dropdown';

class Cadastrar extends Component {


    state = {
        objeto: {
            codigo: this.props.objeto.codigo,
            nome: this.props.objeto.nome,
            nascimento: this.props.objeto.nascimento,
            salario: this.props.objeto.salario,
            cidade_codigo: this.props.objeto.cidade_codigo
        },
        cidades: [],
        redirecionar: false
    };

    formataData = (data) => {
        var arrNascimento = data.split('-');
        var nascimentoFormatado = arrNascimento[2] + '/' + arrNascimento[1] + '/' + arrNascimento[0];
        return nascimentoFormatado;
    }

    acaoCadastrar = async e => {
        var atualizaAlerta = this.props.atualizaAlerta;
        e.preventDefault();
        if (this.props.editar) {
            try {
                const body = {
                    codigo: this.state.objeto.codigo,
                    nome: this.state.objeto.nome,
                    nascimento: this.state.objeto.nascimento,
                    salario: this.state.objeto.salario,
                    cidade: this.state.objeto.cidade_codigo
                };
                const response = await fetch(config.enderecoapi+'/api/pessoas', {
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
                    nascimento: this.state.objeto.nascimento,
                    salario: this.state.objeto.salario,
                    cidade: this.state.objeto.cidade_codigo
                };
                const response = await fetch(config.enderecoapi+'/api/pessoas', {
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
        // lembrar de na API no metodo que recupera pelo código mudar o formato da 
        // data para YYYY-MM-DD para exibir corretamente no campo
        await fetch(`${config.enderecoapi}/api/pessoas/${codigo}`)
            .then(response => response.json())
            .then(data => this.setState({
                objeto: data[0] // aqui pego o primeiro elemento do json que foi recuperado  data[0]
            }))
            .catch(err => console.log(err))
        //console.log("Objeto recuperado: " + this.state.objeto.codigo +
        //    " Nome: " + this.state.objeto.nome + " Nascimento: " + this.state.objeto.nascimento)
    }

    recuperarCidades = async () => {
        await fetch(config.enderecoapi + '/api/cidades')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    cidades: data
                });
            }).catch(error => {
                console.log(error);
            });
    }    

    componentDidMount() {   
        this.recuperarCidades();
        // Caso edição recupera da API o objeto
        if (this.props.editar) {
            this.recuperar(this.state.objeto.codigo);
        }
    }

    cidadeOptionTemplate(option) {
        return (
            <div >
                {option.codigo} - {option.nome}
            </div>
        );
    }


    render() {
        if (this.state.redirecionar === true) {
            return <Redirect to="/pessoa" />
        }
        return (



            <div style={{ padding: '20px' }}>
                <h2>Edição de Pessoa</h2>
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
                        <label htmlFor="txtNascimento" className="form-label">Nascimento</label>
                        <input type="date" required className="form-control" id="txtNascimento"
                            defaultValue={this.props.nascimento} value={this.state.objeto.nascimento}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, nascimento: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtSalario" className="form-label">Salário</label>
                        <input type="number" required className="form-control" id="txtSalario" size="40" maxLength="40"
                            defaultValue={this.props.salario} value={this.state.objeto.salario}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, salario: e.target.value
                                    }
                                })
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectCidade" className="form-label">Cidade</label>
                        <Dropdown style={{ padding: '0' }}
                            className="form-control" id="selectCidade"
                            res
                            value={this.state.objeto.cidade_codigo}
                            options={this.state.cidades}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, cidade_codigo: e.target.value
                                    }
                                })
                            }
                            optionLabel="nome"
                            optionValue="codigo" filter filterBy="nome"
                            placeholder="Selecione a Cidade"
                            itemTemplate={this.cidadeOptionTemplate} 
                        />                        

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
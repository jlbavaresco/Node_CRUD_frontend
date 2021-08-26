import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import config from '../../Config';
import { Dropdown } from 'primereact/dropdown';

class Cadastrar extends Component {

    state = {
        objeto: {
            codigo: this.props.objeto.codigo,
            nome: this.props.objeto.nome,
            estado: this.props.objeto.estado,
            estado_codigo: this.props.objeto.estado_codigo,
        },
        estados: [],
        redirecionar: false,
        contries : [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ]
        
    };

    selectedCountryTemplate(option, props) {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    countryOptionTemplate(option) {
        return (
            <div className="country-item">
                <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                <div>{option.name}</div>
            </div>
        );
    }    


    acaoCadastrar = async e => {
        var atualizaAlerta = this.props.atualizaAlerta;
        e.preventDefault();
        if (this.props.editar) {
            try {
                const body = {
                    codigo: this.state.objeto.codigo,
                    nome: this.state.objeto.nome,
                    estado: this.state.objeto.estado_codigo
                };
                const response = await fetch(config.enderecoapi + '/api/cidades', {
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
                    estado: this.state.objeto.estado_codigo
                };
                const response = await fetch(config.enderecoapi + '/api/cidades', {
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
        await fetch(`${config.enderecoapi}/api/cidades/${codigo}`)
            .then(response => response.json())
            .then(data => this.setState({
                objeto: data[0] // aqui pego o primeiro elemento do json que foi recuperado  data[0]
            }))
            .catch(err => console.log(err))
        //console.log("Objeto recuperado: " + this.state.objeto.codigo +
        //    " Nome: " + this.state.objeto.nome + " UF: " + this.state.objeto.uf)
    }

    componentDidMount() {
        // if item exists, populate the state with proper data      
        fetch(config.enderecoapi + '/api/estados')
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let estadosDaApi = data.map(estado => {
                    return { value: estado.codigo, display: estado.nome }
                });
                this.setState({
                    estados: [{ value: '', display: '(Selecione o estado)' }].concat(estadosDaApi)
                });
            }).catch(error => {
                console.log(error);
            });

        if (this.props.editar) {
            this.recuperar(this.state.objeto.codigo);
        }
    }


    render() {
        if (this.state.redirecionar === true) {
            return <Redirect to="/cidade" />
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
                        <label htmlFor="selectEstado" className="form-label">Estado</label>
                        
                        <Dropdown style={{ padding: '0' }} 
                        className="form-control" id="selectEstado"
                        res
                            value={this.state.objeto.estado_codigo}
                            options={this.state.estados}
                            onChange={
                                e => this.setState({
                                    objeto: {
                                        ...this.state.objeto, estado_codigo: e.target.value
                                    }
                                })
                            }
                            optionLabel="display"
                            optionValue="value" filter  filterBy="display"
                            placeholder="Selecione o estado" 
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
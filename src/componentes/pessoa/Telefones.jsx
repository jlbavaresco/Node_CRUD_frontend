import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Alerta from '../Alerta';
import MaterialTable from 'material-table'
import { Icon } from '@material-ui/core';
import config from '../../Config';

class Telefones extends Component {

    state = {
        objeto: {
            codigo: this.props.objeto.codigo,
            nome: this.props.objeto.nome,
            nascimento: this.props.objeto.nascimento,
            salario: this.props.objeto.salario,
            cidade_codigo: this.props.objeto.cidade_codigo
        },
        telefones: [],
        redirecionar: false
    };

    remover = async telefone => {
        //var atualizaAlerta = this.props.atualizaAlerta;
        if (window.confirm("Remover este objeto?")) {
            try {
                await fetch(
                    `${config.enderecoapi}/api/telefones/${telefone.codigo}`,
                    {
                        method: "DELETE",
                    }
                ).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status  + " Message: " + json.message)          
                        this.props.atualizaAlerta(json.status, json.message);
                    })
                // window.location = `/editartelefones/${this.state.objeto.codigo}`;
                this.recuperarTelefones(this.props.objeto.codigo);
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    recuperarTelefones = async codigo => {
        // aqui eu recupero um unico objeto passando o id
        await fetch(`${config.enderecoapi}/api/telefones/${codigo}`)
            .then(response => response.json())
            .then(data => this.setState({
                telefones: data // aqui pego o primeiro elemento do json que foi recuperado  data[0]
            }))
            .catch(err => console.log(err))
        //console.log("Telefenes recuperados: " + this.state.telefones.length)
    }

    recuperarPessoa = async codigo => {
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

    componentDidMount() {
        this.recuperarTelefones(this.props.objeto.codigo);
        this.recuperarPessoa(this.props.objeto.codigo);
    }


    render() {
        if (this.state.redirecionar === true) {
            return <Redirect to="/pessoa" />
        }
        return (
            <div>
                <Alerta alerta={this.props.alerta} />
                <Link className="btn btn-primary" to={{ pathname: `/pessoa/cadastrartelefone/${this.state.objeto.codigo}` }}>
                    Novo Telefone <i className="bi bi-file-earmark-plus"></i>
                </Link>
                <Link className="btn btn-info" to="/pessoa" 
                    onClick={() => { this.props.atualizaAlerta("","")}}>
                    Voltar para listagem<i className="bi bi-arrow-left"></i>
                </Link>

                <MaterialTable
                    title={`Telefones do ${this.state.objeto.nome} - Código ${this.state.objeto.codigo}`}
                    columns={[
                        { title: 'Código', field: 'codigo', type: 'numeric' },
                        { title: 'Numero', field: 'numero' },
                        { title: 'Descrição', field: 'descricao' }
                    ]}
                    data={this.state.telefones}
                    options={{
                        filtering: true
                    }}
                    actions={[
                        rowData => ({
                            icon: () => <Link to={`/pessoa/editartelefone/${rowData.codigo}`}><Icon>edit</Icon></Link>,
                            tooltip: 'Editar '
                        }),
                        {
                            icon: 'delete',
                            tooltip: 'Apagar',
                            onClick: (event, rowData) => this.remover(rowData)
                        }
                    ]}
                />
            </div>



        );
    }
}

export default Telefones;
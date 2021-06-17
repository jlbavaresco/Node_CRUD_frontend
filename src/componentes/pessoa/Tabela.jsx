import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../Alerta';
import MaterialTable from 'material-table'
import { Icon } from '@material-ui/core';
import config from '../../Config';

class Tabela extends Component {

    state = {
        listaObjetos: []
    };

    formataData = (data) => {
        var arrNascimento = data.split('-');
        var nascimentoFormatado = arrNascimento[2] + '/' + arrNascimento[1] + '/' + arrNascimento[0];
        return nascimentoFormatado;
    }

    async getListaObjetos() {
        await fetch(config.enderecoapi+'/api/pessoas')
            .then(response => response.json())
            .then(listaObjetos => this.setState({ listaObjetos }))
            .catch(err => console.log(err))
    }

    remover = async objeto => {
        if (window.confirm("Remover este objeto?")) {
            try {
                await fetch(
                    `${config.enderecoapi}/api/pessoas/${objeto.codigo}`,
                    {
                        method: "DELETE",
                    }
                ).then(response => response.json())
                    .then(json => {
                        //console.log("JSON retorno: " + "status: " + json.status  + " Message: " + json.message)          
                        this.props.atualizaAlerta(json.status, json.message);
                    })
                this.getListaObjetos();
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    componentDidMount() {
        this.getListaObjetos();        
    }

    render() {
        return (
            <div>
                <Alerta alerta={this.props.alerta} />
                <Link className="btn btn-primary" to="/cadastrarpessoa">
                Novo  <i className="bi bi-file-earmark-plus"></i>
            </Link>

                <MaterialTable
                    title="CRUD de Pessoas"
                    columns={[
                        { title: 'Código', field: 'codigo', type: 'numeric' },
                        { title: 'Nome', field: 'nome' },
                        { title: 'Nascimento', field: 'nascimento', type: 'date' },
                        { title: 'Salário', field: 'salario', type: 'currency' },
                        { title: 'Cidade', field: 'cidade' },
                    ]}
                    data={this.state.listaObjetos}
                    options={{
                        filtering: true
                    }}
                    actions={[
                        rowData => ({
                            icon: () => <Link to={`/editarpessoa/${rowData.codigo}`}><Icon>edit</Icon></Link>,
                            tooltip: 'Editar '
                        }),
                        {
                            icon: 'delete',
                            tooltip: 'Apagar',
                            onClick: (event, rowData) => this.remover(rowData)
                        },
                        rowData => ({
                            icon: () => <Link to={`/pessoa/editartelefones/${rowData.codigo}`}><Icon>phone</Icon></Link>,
                            tooltip: 'Editar Telefones '
                        })                        
                    ]}
                />
            </div>

        );
    }
}

export default Tabela;
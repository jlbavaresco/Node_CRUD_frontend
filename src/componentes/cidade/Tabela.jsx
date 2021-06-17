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

    async getListaObjetos() {
        await fetch(config.enderecoapi+'/api/cidades')
            .then(response => response.json())
            .then(listaObjetos => this.setState({ listaObjetos }))
            .catch(err => console.log(err))
    }

    remover = async objeto => {
        if (window.confirm("Remover este objeto?")) {
            try {
                await fetch(
                    `${config.enderecoapi}/api/cidades/${objeto.codigo}`,
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
                <Link className="btn btn-primary" to="/cadastrarcidade">
                    Novo  <i className="bi bi-file-earmark-plus"></i>
                </Link>

                <MaterialTable
                    title="CRUD de Cidades"
                    columns={[
                        { title: 'Código', field: 'codigo', type: 'numeric' },
                        { title: 'Nome', field: 'nome' },
                        { title: 'Estado', field: 'estado' }
                    ]}
                    data={this.state.listaObjetos}
                    options={{
                        filtering: true
                    }}
                    actions={[
                        rowData => ({
                            icon: () => <Link to={`/editarcidade/${rowData.codigo}`}><Icon>edit</Icon></Link>,
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

export default Tabela;
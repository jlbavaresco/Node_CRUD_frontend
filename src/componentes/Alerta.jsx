import React from 'react';

const Alerta = ({alerta}) => {
    var classe = ''
    if (alerta.status === 'error') {
        classe = 'alert alert-danger'
    } else {
        classe = 'alert alert-primary'
    }
    if (alerta.mensagem.length > 0) {
        return (
            <div className={classe} role="alert">
                {alerta.mensagem}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Alerta;
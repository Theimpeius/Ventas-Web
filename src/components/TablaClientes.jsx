//rafce
const TablaClientes = ({clientes,cliente}) =>{

    return(
        <div className="container">
            <table className="table table-hover">
                <thead className="table-success">
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cli)=>(
                        <tr key={cli.id} onDoubleClick={()=> cliente(cli)}>
                            <td>{cli.dni}</td>
                            <td>{cli.nombre}</td>
                            <td>{cli.apellido}</td>
                            <td>{cli.direccion}</td>
                            <td>{cli.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaClientes;
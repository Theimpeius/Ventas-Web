
const TablaProductos = ({productos, producto}) => {
  return (
    <div className="container">
        <table className="table table-hover">
            <thead className="table-success">
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Stock</th>
                    <th>Precio Compra</th>
                    <th>Precio Venta</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((prod) => (
                    <tr key={prod.id} onDoubleClick={()=>{producto(prod)}}>
                        <td>{prod.nombre}</td>
                        <td>{prod.descripcion}</td>
                        <td>{prod.stock}</td>
                        <td>{prod.precioCompra}</td>
                        <td>{prod.precioVenta}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TablaProductos;
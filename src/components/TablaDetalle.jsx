import React from 'react'
import { useState, useEffect } from 'react'
const TablaDetalle = React.forwardRef(({items, item}, ref) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + parseFloat(item.importe),0));
  },[items]);

  return(
    <div ref={ref} className="container">
      <table className="table table-hover">
        <thead className="table-primary">
          <tr>
            <th>Cantidad</th>
            <th>Detalle</th>
            <th>P/U</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {items.map((detalle) => (
            <tr key={detalle.producto_id} onDoubleClick={() => item(detalle)}>
              <td>{detalle.cantidad}</td>
              <td>{detalle.detalle}</td>
              <td>{detalle.precio_unitario}</td>
              <td>{detalle.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h3>Total $ {total.toLocaleString("es-AR")}</h3>
    </div>
  );
    
});

export default TablaDetalle
import React from "react";

const TablaFactura = () => {
  return (
    <div className="container">
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
          {factura.map((fac) => (
            <tr key={fac.id} onDoubleClick={() => factura(fac)}>
              <td>{fac.cantidad}</td>
              <td>{fac.detalle}</td>
              <td>{fac.pUnitario}</td>
              <td>{fac.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaFactura;

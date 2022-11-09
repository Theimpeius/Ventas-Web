import { useEffect, useState, useRef } from "react";
import TablaClientes from "./components/TablaClientes";
import TablaProductos from "./components/TablaProductos";
import TablaDetalle from "./components/TablaDetalle";
import ReactToPrint from "react-to-print";

function App() {
  const [cliente, setCliente] = useState({});
  const [clientes, setClientes] = useState([]);
  const [producto, setproducto] = useState({});
  const [productos, setproductos] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [facturaId, setFacturaId] = useState(0);
  const [items, setItems] = useState([]);

  const componentRef = useRef();

  const obtenerClientes = async () => {
    const response = await fetch("http://localhost:4000/clientes");
    const data = await response.json();
    setClientes(data);
  };
  const obtenerProductos = async () => {
    const response = await fetch("http://localhost:4000/productos");
    const data = await response.json();
    setproductos(data);
  };
  const obtenerFacturaId = async (id) => {
    const response = await fetch(
      `http://localhost:4000/facturas?clienteId=${id}`
    );
    const data = await response.json();
    setFacturaId(data);
  };
  const agregarItem = async (parametros) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parametros),
    };
    const response = await fetch(
      "http://localhost:4000/detalle/agregar-item",
      requestOptions
    );
    const data = await response.json();

    if (data[0]["message"]) {
      if (data[0]["message"].includes("Duplicate")) {
        alert("El producto ya fue ingresado, seleccione otro");
      }
    }else {
      setItems(data);
      obtenerProductos();
    }
  };
  const quitarItem = async (item) => {
    const parametros = {
      productoId: item.producto_id,
      facturaId: item.factura_id,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parametros),
    };
    const response = await fetch(
      "http://localhost:4000/detalle/quitar-item",
      requestOptions
    );
    const data = await response.json();
    setItems(data);
    obtenerProductos();
  };
  useEffect(() => {
    obtenerClientes();
    obtenerProductos();
  }, []);
  //nfn -> crea una funcion flecha
  const handleSubmit = () => {
    agregarItem({
      productoId: producto.id,
      facturaId: facturaId,
      cantidad: cantidad,
      precio: producto.precioVenta,
    });
  };
  const handleCliente = (cliente) => {
    obtenerFacturaId(cliente.id);
    setCliente(cliente);
  };
  const handleProducto = (producto) => {
    setproducto(producto);
  };
  const handleItem = (item) => {
    quitarItem(item);
  };

  const incrementa = () => {
    setCantidad(cantidad + 1);
  };
  const decrementa = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">Sistema de Ventas</h1>
      <TablaClientes clientes={clientes} cliente={handleCliente} />
      <h4>
        {Object.keys(cliente).length > 0
          ? `DNI: ${cliente.dni} Nombre: ${cliente.nombre} ${cliente.apellido}`
          : null}
      </h4>
      <br />
      <TablaProductos productos={productos} producto={handleProducto} />
      <br />
      <h4>
        {Object.keys(producto).length > 0
          ? `Producto: ${producto.nombre}`
          : null}
      </h4>
      <div className="input-group container-md">
        <span className="input-group-text">Cantidad</span>
        <input type="text" value={cantidad} className="form-control" readOnly />
        <button className="btn btn-outline-primary" onClick={incrementa}>
          {" "}
          +{" "}
        </button>
        <button className="btn btn-outline-danger" onClick={decrementa}>
          {" "}
          -{" "}
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Añadir producto
        </button>
      </div>
      <br />
      {Object.keys(items).length > 0 ? (
        <div>
          <TablaDetalle ref={componentRef} items={items} item={handleItem} />
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-primary float-end">
                Imprimir Factura
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;

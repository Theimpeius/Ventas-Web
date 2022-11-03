import { useEffect, useState } from "react";
import TablaClientes from "./components/TablaClientes";
import TablaProductos from "./components/TablaProductos";

function App() {
  const [cliente, setCliente] = useState({});
  const [clientes, setClientes] = useState([]);
  const [producto, setproducto] = useState({});
  const [productos, setproductos] = useState([]);

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
  const obtenerFacturaId = async () => {
    const response = await fetch("http://localhost:4000/clientes");
  };
  useEffect(() => {
    obtenerClientes();
    obtenerProductos();
  }, []);
  //nfn -> crea una funcion flecha
  const handleCliente = (cliente) => {
    //obtenerFacturaId();
    setCliente(cliente);
  };
  const handleProducto = (producto) => {
    setproducto(producto);
  };
  return (
    <div className="container">
      <h1 className="text-center">Sistema de Ventas</h1>
      <TablaClientes clientes={clientes} cliente={handleCliente} />
      <TablaProductos productos={productos} producto={handleProducto} />
      <h4>
        {Object.keys(cliente).length > 0
          ? `DNI: ${cliente.dni} Nombre: ${cliente.nombre} ${cliente.apellido}`
          : null}
      </h4>
      <h4>
        {Object.keys(producto).length > 0
          ? `Producto: ${producto.nombre}`
          : null}
      </h4>
    </div>
  );
}

export default App;

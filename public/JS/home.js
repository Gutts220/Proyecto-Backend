const socket = io.connect('http://localhost:5000')

socket.on('productos', (productos) => {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
  
    productos.forEach((producto) => {
      const listItem = document.createElement('li');
      listItem.textContent = ` ${producto.title} - ${producto.price}`;
      listaProductos.appendChild(listItem);
    });
  });
const socket = io()

socket.on('productos', (productos) => {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
  
    productos.forEach((producto) => {
      const listItem = document.createElement('li');
      listItem.textContent = ` ${producto.title} - ${producto.price}`;
      listaProductos.appendChild(listItem);
    });
  });
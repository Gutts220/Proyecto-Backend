//Cliente

//Iniciamos la conexion por parte del cliente

const socket = io()

//socket.emit("<nombre del evento>", Dato-a-enviar)

socket.emit("nuevo-msg", "Hola desde el front!")

//Escuchando desde el cliente

socket.on("nuevo-msg", (msg) => {
    console.log(`nuevo mensaje ${msg}`)
  });
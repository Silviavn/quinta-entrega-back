const socket = io()

document.getElementById('prod-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('title');
    const title = titleInput.value;
    titleInput.value = '';

    const descInput = document.getElementById('desc');
    const description = descInput.value;
    descInput.value = '';
    
    const priceInput = document.getElementById('price');
    const price = priceInput.value;
    priceInput.value = '';
    
    const imgInput = document.getElementById('img');
    const thumbnails = imgInput.value;
    imgInput.value = '';

    const codeInput = document.getElementById('cod');
    const code = codeInput.value;
    codeInput.value = '';

    const stockInput = document.getElementById('stock');
    const stock = stockInput.value;
    stockInput.value = '';

    const statusInput = document.getElementById('status');
    const status = statusInput.value;
    statusInput.value = '';


    const catInput = document.getElementById('cat');
    const category = catInput.value;
    catInput.value = '';


    const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnails: thumbnails
    };
    socket.emit("newProd", newProduct);
});

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `A continuación verás la lista actualizada`,
        confirmButtonText: 'Aceptar', 
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); 
        }
    });
});

// socket.on("test", data => {
//     console.log(data)
// })
//const socket = io()

//----------------------Enviar------------//
// socket.emit("message", "!Hola, me estoy comunicando desde un websocket!")
//----------------------------------------//
//--------------------Recibir en Consola de Navegador----------//
// socket.on("test", data => {
//     console.log(data)
// })
//---------------------------------------------------
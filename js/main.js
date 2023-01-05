

    //Listado de objetos (productos)
    class VideoJuegos {
      constructor(id, nombre, categoria, caratula, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.caratula = caratula;
        this.precio = precio;
        this.cantidad = cantidad;
      }
    }

    //Creo productos y los almaceno en un array:
    const game1 = new VideoJuegos(1, 'Super Mario World', 'Plataforma', src="./img/supermario.jpg",  160, 10);
    const game2 = new VideoJuegos(2, 'Castlevania', 'Plataforma', src="./img/castlevania.jpg", 250, 6);
    const game3 = new VideoJuegos(3, 'Zelda','Aventura', src="./img/zelda.jpg", 79,  2);
    const game4 = new VideoJuegos(4, 'Star Fox','Shooter',src="./img/starfox.jpg", 32,  8);
    const game5 = new VideoJuegos(5, 'Super Mario Kart', 'Carreras', src="./img/mariokart.jpg", 60, 5);
    const game6 = new VideoJuegos(6, 'Super Metroid', 'Accion', src="./img/metroid.jpg", 337, 1);


    //Array de objetos (productos)
    const Listado =  [game1, game2, game3, game4, game5, game6];
    let carrito = [];

    // Se agrega localstorage
    document.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('carrito')){
          carrito = JSON.parse(localStorage.getItem('carrito'))
          actualizarCarrito()
      }
  })
    

    //Se crean las cards de los productos al html
    const contProduct= document.querySelector('#productos')

    for (const producto of Listado) {

    let li = document.createElement('li')
        li.innerHTML = `<div class='card'>
                            <img src="${producto.caratula}"></img>
                            <h3 class="card__titulo">${producto.nombre}</h3>
                            <p>Precio <span class="card__precio">$${producto.precio}</span></p>
                            <button id="btn${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                        </div>`;
                        
      contProduct.appendChild(li);

    //Captura el id del producto a travez del boton
    const boton = document.getElementById(`btn${producto.id}`);
    boton.addEventListener('click', () => {
      agregarAlCarrito(producto.id)

    });

  };

//Puseha el producto al array carrito
const agregarAlCarrito = (id) => {
  const producto = Listado.find(producto => producto.id === id);
  carrito.push(producto);

actualizarCarrito()
}


//Se agrega los productos al html carrito
const contenedorCarrito = document.querySelector("#lista__carrito tbody")
function actualizarCarrito() {
  //Limpiar el HTML
  limpiarHTML ()
  //Recorre el carrito y genera html
  carrito.forEach(producto => { 
    const tr = document.createElement("tr");
    tr.innerHTML =  `<td>
                      ${producto.id}
                      </td>
                      <td>
                      <img class="conteiner__imagen"  src="${producto.caratula}"></img>
                      </td>
                      <td>
                      ${producto.nombre}
                      </td>
                      <td>
                      <strong>$${producto.precio}</strong>
                      </td>`
                      ; 

      contenedorCarrito.appendChild(tr);
      localStorage.setItem('carrito', JSON.stringify(carrito))
      calcularTotalCompra();
      
   
  });
  
}

//Limpia el HTML para que no hayan duplicados
function limpiarHTML (){
  contenedorCarrito.innerHTML = "";
}

//Función para vaciar todo el carrito por completo
const vaciarCarrito = document.getElementById('vaciar__carrito');
vaciarCarrito.addEventListener('click', () => {
  carrito.splice(0, carrito.length);
  actualizarCarrito();
});

//Calcula el total de la compra
const totalCompra = document.getElementById('totalCompra');
const calcularTotalCompra = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio;
  });
  totalCompra.innerHTML = total;

};

//Funcion para borrar el Precio total cuando se vacia el carrito
function VaciarPrecio () {
  vaciarCarrito.addEventListener('click', () => {
    totalCompra.innerHTML = 0;
    textCompra.innerText = " ";
    actualizarCarrito();
  
  });
}
VaciarPrecio () 


//Evento del boton comprar
const btnComprar = document.querySelector("#modal__btn");
const textCompra = document.getElementById("modal__compra");
const textCompraError = document.getElementById("modal__compra-error");

btnComprar.addEventListener("click", () => {

  if (carrito.length === 0) {
    textCompraError.innerText = "Ingrese un producto";
  }else if (carrito.length !== 0){
    textCompraError.innerText = " ";
    textCompra.innerText = "GRACIAS POR SU COMPRA";
  }

  carrito.splice(0, carrito.length);
  localStorage.removeItem("carrito");
  totalCompra.innerHTML = 0;
  actualizarCarrito();

});


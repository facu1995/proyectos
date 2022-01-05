var initialState = {
    usuario: {
        correo: "foo@foo.com",
        nombre: "foo",
        pass: "33"
    },
    products: []
};

function logearPerfil(state, action) {
    let { nombre, correo, pass } = action.payload;
    return {
        ...state,
        usuario: { correo, nombre, pass }
    }
}

function agregarProducto(state, action) {
    let { nombre, precio, id } = action.payload;
    return {
        ...state,
        products: [...state.products, { nombre, precio, id }]
    }
}
function quitarProducto(state, action) {
    let borro = 0;
    return {
        ...state,
        products: [...state.products.filter(el => {
            if (el.id !== action.payload.id) {
                return el;
            }
            else {
                if (borro === 0) {
                    borro = 1;
                }
                else {
                    return el
                }
            }
        })]
    }
}

//defino el funcionamiento del store
function reducer(state = initialState, action) {
    switch (action.type) {
        case "LOGEAR_PERFIL":
            return logearPerfil(state, action);
        case "AGREGAR_PRODUCTO":
            return agregarProducto(state, action);
        case "QUITAR_PRODUCTO":
            return quitarProducto(state, action);
        default:
            return state;
    }
}

//creo el store
let store = Redux.createStore(reducer);
/*
 store.suscribe()
 store.getState()
 store.dispatch()
 */

function component() {
    document.getElementById("respuesta").innerHTML = JSON.stringify(store.getState().nombre);
}

//se registra el elemento/component/dom de escucha
store.subscribe(component);

//se emite la accion
const crearDom = document.getElementById("crear");
if (crearDom) {
    crearDom.addEventListener("click", () => {
        store.dispatch(accionlogearPerfil());
    });
}

let elCorreo = document.getElementById("correo");
let elNombre = document.getElementById("nombre");
let elpass = document.getElementById("pass");


//acciones
function accionlogearPerfil() {
    return {
        type: "LOGEAR_PERFIL",
        payload: {
            correo: elCorreo.value,
            nombre: elNombre.value,
            pass: elpass.value
        }
    };
}
function accionModificarNombre() {
    return {
        type: "MODIFICAR_PERFIL_POR_CORREO",
        payload: {
            correo: elCorreo.value,
            nombre: elNombre.value,
            pass: elpass.value
        }
    };
}
function accionAgregarProducto(id) {
    return {
        type: "AGREGAR_PRODUCTO",
        payload: {
            nombre: productosData[id].nombre,
            precio: productosData[id].precio,
            id: productosData[id].id
        }
    }
}

function accionQuitarProducto(id) {
    return {
        type: "QUITAR_PRODUCTO",
        payload: {
            id: productosData[id].id
        }
    }
}

//PRODUCTOS

const productosData = [
    {
        nombre: "item1",
        precio: "11",
        id: 1
    },
    {
        nombre: "item2",
        precio: "12",
        id: 2
    },
    {
        nombre: "item3",
        precio: "13",
        id: 3
    },
    {
        nombre: "item4",
        precio: "14",
        id: 4
    },
    {
        nombre: "item5",
        precio: "15",
        id: 5
    },
    {
        nombre: "item6",
        precio: "16",
        id: 6
    },
    {
        nombre: "item7",
        precio: "17",
        id: 7
    },
    {
        nombre: "item8",
        precio: "18",
        id: 8
    },
]



function domUserName() {
    document.getElementById("respuesta2").innerHTML = JSON.stringify(store.getState().usuario.nombre);
}
store.subscribe(domUserName);

const containerPrdocuts = document.querySelector(".container-produts");
if (containerPrdocuts) {
    productosData.forEach((element) => {
        let productoDom = document.createElement("div");
        productoDom.classList.add("product");

        let nombreDom = document.createElement("p");
        nombreDom.textContent = element.nombre;
        productoDom.appendChild(nombreDom);

        let precioDom = document.createElement("p");
        precioDom.textContent = "$" + element.precio;
        productoDom.appendChild(precioDom);

        let idDom = document.createElement("p");
        idDom.textContent = element.id;
        /* productoDom.appendChild(idDom); */
        let botonDom = document.createElement("button");
        botonDom.textContent = "Add";
        botonDom.classList.add("add");

        productoDom.appendChild(botonDom);
        if (botonDom) {
            botonDom.addEventListener("click", () => {
                store.dispatch(accionAgregarProducto(element.id - 1));
            });
        }

        containerPrdocuts.appendChild(productoDom);
    })
}

function domSelectProducts() {
    let total = 0;

    const domContainerActuales = document.querySelector(".container-actuales");
    domContainerActuales.innerHTML = "";

    store.getState().products.forEach((element) => {

        total += parseInt(element.precio);
        
        let productoDom = document.createElement("div");
        productoDom.classList.add("product-elegido");

        let nombreDom = document.createElement("p");
        nombreDom.textContent = element.nombre;
        productoDom.appendChild(nombreDom);

        let precioDom = document.createElement("p");
        precioDom.textContent = "$" + element.precio;
        productoDom.appendChild(precioDom);

        let idDom = document.createElement("p");
        idDom.textContent = element.id;
        /* productoDom.appendChild(idDom); */

        let botonDom = document.createElement("button");
        botonDom.textContent = "Delete";
        botonDom.classList.add("add");
        productoDom.appendChild(botonDom);
        
        domContainerActuales.appendChild(productoDom);
        if (botonDom) {
            botonDom.addEventListener("click", () => {
                store.dispatch(accionQuitarProducto(element.id - 1));
            });
        }
    })
    let totalDom = document.querySelector(".total");
    totalDom.textContent = "Total: $" + total;
}
store.subscribe(domSelectProducts);


//Mostar y ocultar 
/* const carritoDom= document.querySelector(".carrito"); */
const signInDom= document.querySelector(".sign-in");
const loginDom= document.querySelector(".login");
const listaitemDom= document.querySelector(".container-item");
const selecionados= document.querySelector(".container-select");

/*     carritoDom.addEventListener("click", () => {
        loginDom.classList.add("ocultar");
    }) */
    signInDom.addEventListener("click", () => {
        selecionados.classList.remove("ocultar");
        listaitemDom.classList.remove("ocultar");
        loginDom.classList.add("ocultar");
    })

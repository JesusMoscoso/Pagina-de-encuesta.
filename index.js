let respuestas = []; // este arreglo es para guardar las respuestas que me vayan dando 

function guardarRespuestas(event) {

    event.preventDefault();

    //llamamos a la funcion que es para validar que todas las respuestas necesarias esten respondidas.
    if (!validarCampos()) {
        return; 
    }
    const respuesta = {
        edad: parseInt(document.getElementById('txtEdad').value),
        bebida: document.getElementById('cboBebidaFavorita').value,
        comida: document.getElementById('cboComidaFavorita').value,
        cine: document.querySelector('input[name="cine"]:checked').value // este es para poder obtener el valor del chk, no se.
    };

    // agregamos las respuestas al arreglo
    respuestas.push(respuesta);

    MostrarPorcentajes();
    limpiarFormulario();

}

function calcularEdadPromedio() {
    let suma = 0; 

    for (let i = 0; i < respuestas.length; i++) {
        suma += respuestas[i].edad; 
    }

    const promedio = suma /  respuestas.length;
    console.log(promedio)

    return promedio.toFixed(0); 
}




function mostrarPromedioEdad() {
    const promedio = calcularEdadPromedio();

    let promedioEdad = document.getElementById('promedioEdad');

    if (!promedioEdad) {
        promedioEdad = document.createElement('div');
        promedioEdad.id = 'promedioEdad';
        promedioEdad.className = 'col s12 m3';

        resumenRespuestas.appendChild(promedioEdad);
    }

    // 
    promedioEdad.innerHTML = `
      <div class="card">
        <div class="card-content">
            <span class="card-title teal-text"><strong>Edad Promedio</strong></span>
            <p>Promedio: ${promedio} años</p>
        </div>
      </div>
    `;
}


// bebidas
function calcularPorcentajesBebida() {
    const totalRespuestas = respuestas.length;
    
    if (totalRespuestas === 0) return {};

    // Contadores por bebida
    let contadorCafe = 0;
    let contadorTe = 0;
    let contadorAgua = 0;
    let contadorGaseosa = 0;


    for (let i = 0; i < respuestas.length; i++){
        switch (respuestas[i].bebida) {
            case 'Café':
                contadorCafe++
                break;
            case 'Té':
                contadorTe++;
                break;
            case 'Agua':
                contadorAgua++;
                break;
            case 'Gaseosa':
                contadorGaseosa++;
                break;
            default:
                console.alert('error no esperado.');
                break;
        }
    }

    // Calcular los porcentajes
    return {
        cafe: ((contadorCafe / totalRespuestas) * 100).toFixed(2),
        te: ((contadorTe / totalRespuestas) * 100).toFixed(2),
        agua: ((contadorAgua / totalRespuestas) * 100).toFixed(2),
        gaseosa: ((contadorGaseosa / totalRespuestas) * 100).toFixed(2)
    };
}

// funcion para mostrar los porcentajes de las bebidas
function mostrarPromedioBebidas() {
    //esta variable la hice para no repetir llamando a la funcion muchas veces 
    const porcentajes = calcularPorcentajesBebida();
    

    let promedioBebidasElement = document.getElementById('promedioBebidas');
    
    if (!promedioBebidasElement) {
        promedioBebidasElement = document.createElement('div'); 
        promedioBebidasElement.id = 'promedioBebidas';
        promedioBebidasElement.className = 'col s12 m3'; 
        document.getElementById('resumenRespuestas').appendChild(promedioBebidasElement);
    }
    
    // creamo una tarjeta
    promedioBebidasElement.innerHTML = `
      <div class="card">
        <div class="card-content">
            <span class="card-title teal-text"><strong>Bebidas</strong></span>
            <p>Café: ${porcentajes.cafe}%</p>
            <p>Té: ${porcentajes.te}%</p>
            <p>Agua: ${porcentajes.agua}%</p>
            <p>Gaseosa: ${porcentajes.gaseosa}%</p>
        </div>
    </div>
    `;
    
}


// comida
function CalcularPorcentajeComida(){

    //esta variable es el total de personas que participaron en la encuesta.
    const totalRespuestas = respuestas.length;

     // estos van a ser los contadores de cada comida, preguntar por que si es otra comida mas tengo que hacer varias cosas.
     let contadorPizza = 0;
     let contadorHamburguesa = 0;
     let contadorPapasFritas = 0;
     let contadorNinguna = 0;


     for (let i = 0; i < respuestas.length; i++) {
        switch (respuestas[i].comida) {
            case 'Pizza':
                contadorPizza++;
                break;
            case 'Hamburguesa':
                contadorHamburguesa++;
                break;
            case 'PapasFritas':
                contadorPapasFritas++;
                break;
            case 'Ninguna':
                contadorNinguna++;
                break;
            default:
                console.warn(`Comida no reconocida: ${respuestas[i].comida}`);
                break;
        }
    }
    

 
    // se calculan  los porcentajes 
    return {
        Pizza: ((contadorPizza / totalRespuestas) * 100).toFixed(2),
        Hamburguesa: ((contadorHamburguesa / totalRespuestas) * 100).toFixed(2),
        PapaFritas: ((contadorPapasFritas / totalRespuestas) * 100).toFixed(2),
        Ninguna: ((contadorNinguna/totalRespuestas)*100).toFixed(2),
    };   

}

// funcion para mostrar los porcentajes de comidas
function mostrarPromedioComidas() {
    const porcentajes = CalcularPorcentajeComida();

    let promedioComidasElement = document.getElementById('promedioComidas');
    
    if (!promedioComidasElement) {
        promedioComidasElement = document.createElement('div');
        promedioComidasElement.id = 'promedioComidas'; 
        promedioComidasElement.className = 'col s12 m3';
        document.getElementById('resumenRespuestas').appendChild(promedioComidasElement);  
    }
    
    promedioComidasElement.innerHTML = `
        <div class="card">
            <div class="card-content">
                <span class="card-title teal-text"><strong>Comidas</strong></span>
                <p>Pizza: ${porcentajes.Pizza}%</p>
                <p>Hamburguesa: ${porcentajes.Hamburguesa}%</p>
                <p>Papas Fritas: ${porcentajes.PapaFritas}%</p>
                <p>Otras: ${porcentajes.Ninguna}%</p>
            </div>
        </div>
    `;
    
}

//cine
function CalcularPorcentajeCine(){
    const totalRespuestas = respuestas.length;

    // Variables que van a ser las contadoras.
    let cineSi = 0;
    let cineNo = 0;


    for (let i = 0; i < totalRespuestas; i++) {
        if (respuestas[i].cine === 'Si') {
            cineSi++;
        } else if (respuestas[i].cine === 'No') {
            cineNo++;
        }
    }

    // Calcular los porcentajes
    const porcentajeSi = ((cineSi / totalRespuestas) * 100).toFixed(2);
    const porcentajeNo = ((cineNo / totalRespuestas) * 100).toFixed(2);

    return { porcentajeSi, porcentajeNo };  // Devuelve los porcentajes si lo necesitas
}


function mostrarPromedioCine() {
    const porcentajes = CalcularPorcentajeCine(); // Asumiendo que esta función ya existe

    let promedioCine = document.getElementById('promedioCine');
    
    if (!promedioCine) {
        promedioCine = document.createElement('div');
        promedioCine.id = 'promedioCine'; 
        promedioCine.className = 'col s12 m3';
        document.getElementById('resumenRespuestas').appendChild(promedioCine);  
    }
    
    promedioCine.innerHTML = `
    <div class="card">
        <div class="card-content">
            <span class="card-title teal-text"><strong>Cine</strong></span>
            <p>Sí: ${porcentajes.porcentajeSi}%</p>
            <p>No: ${porcentajes.porcentajeNo}%</p>
        </div>
    </div>
`;
}


function validarRangoEdad(){
   
    const edad = parseInt(document.getElementById('txtEdad').value);

    if (isNaN(edad) || edad === '') {
        return false;
    }
    if (edad < 15 || edad > 75) {
        
        return false;
    }
    
    return true;
}



function validarCampos() {
   
    if(!validarRangoEdad()){
        alert('La edad debe estar entre 15 y 75 años.');
    }

    // validar selección de bebida
    const bebida = document.getElementById('cboBebidaFavorita').value;
    if (bebida === '') {
        alert('Por favor, elige una bebida favorita');
        return false;
    }
   
    // validar selección de comida
    const comida = document.getElementById('cboComidaFavorita').value;
    if (comida === '') {
        alert('Por favor, elige una comida rápida favorita');
        return false;
    }
    //cine
    const cine = document.querySelector('input[name="cine"]:checked');
    if (!cine) {
        alert('Por favor, selecciona si te gusta ir al cine');
        return false;
    }
 
    return true;
}

//esta funcion es solo para mostrar todos los porcentajes
function MostrarPorcentajes(){
    mostrarPromedioEdad();
    mostrarPromedioBebidas();
    mostrarPromedioComidas();
    mostrarPromedioCine();
}

function limpiarFormulario() {
    
    const formulario = document.getElementById('formulario');
    
    formulario.reset();
}

//evento al botón
const btnEnviarRespuesta = document.getElementById('btnEnviar');
btnEnviarRespuesta.addEventListener('click', guardarRespuestas);

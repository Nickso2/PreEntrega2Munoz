//MI EJERCICIO
//Variables globales
let ingresos    = 0;
let saldo       = 0;
let nombre      = '';
let hayAhorro   = '';
let sigo        = '';
let continuar   = '';

//Funciones
function obtenerGasto(descripcion) {
    let gasto = 0;
    do {
        gasto = parseInt(prompt('Ingrese cuanto gasta en ' + descripcion + ' por mes.'));
        if (gasto <= 0 || isNaN(gasto)) {
            alert('No se ingreso un importe valido. Reeintentelo por favor.');
        }
    } while (gasto <= 0 || isNaN(gasto));
    return gasto;
}

function calcularPorcentaje(ingresos,porcentaje) {
    let resultado = ingresos * porcentaje / 100;
    return resultado;
}

//Clases
class Gasto {
    constructor(descripcion, gasto) {
        this.descripcion = descripcion;
        this.gasto       = gasto;
    }

    sumarGasto(gasto) {
        this.gasto += gasto;
    }

    gastosPeriodos() {
        let gastoSemanal = this.gasto / 4;
        let gastoDiario  = this.gasto / 30;
        return 'Usted gasta en ' + this.descripcion + ':\nPor mes: ' + this.gasto + '\nPor semana: ' + gastoSemanal + '\nPor dia: ' + gastoDiario;
    }
}

//Codigo
alert('Bienvenido a su simulador de Gastos Mensuales personal!');
nombre = prompt('Ingrese su nombre y apellido por favor.');

do {
    alert('Primero que nada necesitamos saber cuales son sus ingresos mensuales.');
    ingresos = parseFloat(prompt('Ingrese la cantidad exacta de de sus ingresos mensuales.'));
    if (ingresos <= 0 || isNaN(ingresos)) {
        alert('No se ingreso un importe valido. Reeintentelo por favor.');
    }
} while (ingresos <= 0 || isNaN(ingresos));

while (hayAhorro.toUpperCase() != 'S' && hayAhorro.toUpperCase() != 'N') {
    hayAhorro = prompt('Desea que se descuente de sus ingresos una cierta cantidad como ahorros personales?\nResponda con una S o una N por favor.');
    if (hayAhorro.toUpperCase() === 'S') {
        let tipoAhorro = prompt('Ingrese una de las dos opciones de ahorro:\n1-Porcentaje de los ingresos.\n2- Valor fijo.');
        switch (tipoAhorro) {
            case '1':
                sigo = 'S';
                while (sigo === 'S') {
                    let porcentaje = parseInt(prompt('Ingrese el porcentaje de sus ingresos que se destinaran a ahorros'));
                    if (porcentaje > 0 && porcentaje <= 100) {
                        saldo = ingresos - calcularPorcentaje(ingresos, porcentaje);
                        alert('Se indico que se debe ahorrar el ' + porcentaje + '% de sus ingresos.');
                        alert('Ingresos mensuales: ' + ingresos + '\nCantidad a ahorrar: ' + resultado + '\nCantidad a considerar para gastos mensuales: ' + saldo);
                        continuar = prompt('Si esta de acuerdo con estos resultados ingrese S');
                        if (continuar.toUpperCase() === 'S') {
                            sigo  = 'N';
                        }
                    } else {
                        alert('No se ingreso un porcentaje correcto.')
                        continuar = prompt('Ingrese una S en caso de que quiera cancelar la opcion de ahorrar dinero');
                        if (continuar.toUpperCase() === 'S') {
                            hayAhorro = 'N';
                            sigo      = 'N';
                        }
                    }
                }
                break;
            case '2':
                sigo = 'S';
                while (sigo === 'S') {
                    let valor = parseInt(prompt('Ingrese la cantidad de sus ingresos que se destinaran a ahorros'));
                    if (valor > 0 && valor < ingresos) {
                        saldo = ingresos - valor;
                        alert('Se indico que se debe ahorra ' + valor);
                        alert('Ingresos mensuales: ' + ingresos + '\nCantidad a ahorrar: ' + valor + '\nCantidad a considerar para gastos mensuales: ' + saldo);
                        continuar = prompt('Si esta de acuerdo con estos resultados ingrese S');
                        if (continuar.toUpperCase() === 'S') {
                            sigo  = 'N';
                        }
                    } else {
                        alert('No se ingreso una cantidad correcta.')
                        continuar = prompt('Ingrese una S en caso de que quiera cancelar la opcion de ahorrar dinero');
                        if (continuar.toUpperCase() === 'S') {
                            hayAhorro = 'N';
                            sigo      = 'N';
                        }
                    }
                }
                break;
            default:
                hayAhorro = '';
                alert('No se selecciono una opcion valida. Reeintentelo por favor.');
                break;
        }
    } else if (hayAhorro.toUpperCase() === 'N') {
        alert('Se selecciono la opcion no considerar ahorros');
        saldo = ingresos;
    } else {
        alert('No se selecciono una opcion valida. Reeintentelo por favor.');
    }
}

const aGastos   = [];

alert('Comencemos con los gastos mensuales.');
let descripcion = 'Comida';
let gasto       = obtenerGasto(descripcion);
aGastos.push(new Gasto(descripcion, gasto));

descripcion = 'Transporte';
gasto       = obtenerGasto(descripcion);
aGastos.push(new Gasto(descripcion, gasto));

descripcion = 'Hogar';
gasto       = obtenerGasto(descripcion);
aGastos.push(new Gasto(descripcion, gasto));

sigo = 'S'
while (sigo === 'S') {
    continuar = prompt('Usted tiene algun otro Gasto Fijo que deba pagar por mes. (Ejemplo: cuotas de productos a pagar, educacion de los hijos, prestamos, etc).\nResponda con una S o una N por favor.')
    switch (continuar.toUpperCase()) {
        case 'S':
            descripcion = prompt('Ingrese una descripcion para el siguiente gasto.');
            gasto       = obtenerGasto(descripcion);
            aGastos.push(new Gasto(descripcion, gasto));
            break;
        case 'N':
            if (aGastos.length != 3) {
                alert('Se ingresaron correctamente todos los gastos extras.');
            } else {
                alert('Perfecto, no se agregara ningun otro gasto extra.');
            }
            sigo = 'N';
            break;
        default:
            alert('No se selecciono una opcion valida. Reeintentelo por favor.');
            break;
    }
}

let opcion = '';
const aGastosEliminar = [];
while (opcion.toUpperCase() != 'N') {
    opcion = prompt('Desea ver un resumen de todos los gastos ingresados?\nResponda con una S o una N por favor.');
    if (opcion.toUpperCase() === 'S') {
        alert('A continuacion se detallara un resumen de todos los gastos ingresados.');
        alert('En caso de que se quiera modificar o eliminar alguno de los gastos mostrados se puede ingresar una de las siguientes opciones:\n1 - Modificar gasto.\n2 - Eliminar gasto.\nEn caso de estar de acuerdo con la informacion mostrada no ingresar ningun valor.');
        aGastos.forEach(element => {
            let opcionResumen = prompt(element.gastosPeriodos());
            while (opcionResumen != '') {
                switch (opcionResumen) {
                    case '1':
                        element.gasto = prompt('Ingrese el valor que le quiere asignar a ' + element.descripcion);
                        alert('Se actulizo correctamente el gasto ' + element.descripcion + ' a ' + element.gasto);
                        opcionResumen = '';
                        break;
                    case '2':
                        alert('Se elimino correctamente el gasto ' + element.descripcion);
                        aGastosEliminar.push(aGastos.indexOf(element));
                        opcionResumen = '';
                        break;
                    default:
                        alert('No se ingreso una opcion valida');
                        opcionResumen = prompt(element.gastosPeriodos());
                        break;
                }
            }
        });
        alert('Ya se mostraron todos los gastos ingresados.')
        opcion = 'N';
    } else if (opcion.toUpperCase != 'N') {
        alert('No se selecciono una opcion valida. Reeintentelo por favor.');
    }
}

if (aGastosEliminar.length > 0) {
    aGastosEliminar.forEach(element => {
        aGastos.splice(element,1);
    });
}

descripcion = 'Total';
gasto       = 0;
const gastoTotal = new Gasto(descripcion, gasto);
aGastos.forEach(element => {
    gastoTotal.sumarGasto(parseInt(element.gasto));
});

if (gastoTotal.gasto <= saldo) {
    let disponibleMensual = saldo - gastoTotal.gasto;
    let disponibleSemanal = disponibleMensual / 4;
    let disponibleDiario  = disponibleMensual / 30;
    alert('A continuacion se muestran los resultados con la cantidad de dinero disponible que le queda de forma mesual, semanal y diariamente:\nDisponible Mensual: ' + disponibleMensual + '\nDisponible Semanal: ' + disponibleSemanal + '\nDisponible Diario: ' + disponibleDiario);
} else {
    alert('Usted no tiene suficientes ingresos mensuales para cubrir sus gastos. Le recomendamos los siguientes cursos de como manejar correctamente su dinero.');
}

alert('Muchas gracias ' + nombre + ' por haber utilizado nuestra herramienta de Gastos Mensuales!');

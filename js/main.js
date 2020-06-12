(function(){
 'use strict';

var map = L.map('mapa').setView([-34.60015, -58.451557], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.60015, -58.451557]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();



 document.addEventListener('DOMContentLoaded', function(){
    
    // Campos Datos usuario
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('meail');

    // Campos pases
    let pase_dia = document.getElementById('pase_dia');
    let pase_dosdias = document.getElementById('pase_dosdias');
    let pase_completo = document.getElementById('pase_completo');
    
    //Botones y divs
    
    let calcular = document.getElementById('calcular');
    let errorDiv = document.getElementById('error');
    let botonRegistro = document.getElementById('btnRegistro');
    let lista_productos = document.getElementById('lista-productos');
    let suma_total = document.getElementById('suma-total');

    //Extras
    let regalo = document.getElementById('regalo');
    let etiquetas = document.getElementById('etiquetas');
    let camisas = document.getElementById('camisa_evento');
    
    if(document.getElementById('calcular')){  // IF utilizado para ejecutar los eventos, cuando existan.Estando parado en el INDEX estos elementos no existen y dan error

    calcular.addEventListener('click', calcularMontos);

    pase_dia.addEventListener('blur', mostrarDias);
    pase_dosdias.addEventListener('blur', mostrarDias);
    pase_completo.addEventListener('blur', mostrarDias);

    function calcularMontos(event){
        event.preventDefault();        
        if(regalo.value === ''){
            alert('Debes elegir un regalo')
            regalo.focus();
        } else {
            let boletosDia = parseInt(pase_dia.value, 10) || 0,
                boletos2Dias = parseInt(pase_dosdias.value) || 0,
                boletoCompleto = parseInt(pase_completo.value) || 0,
                cantCamisas = parseInt(camisas.value) || 0,
                cantEtiquetas = parseInt(etiquetas.value) || 0;                
                
            var listadoProductos = [];
            if (boletosDia >= 1){
                listadoProductos.push(boletosDia + ' Pases por dia');
            }
            if (boletos2Dias >= 1){
                listadoProductos.push(boletos2Dias + ' Pases por 2 dias');
            }
            if (boletoCompleto >= 1){                
                listadoProductos.push(boletoCompleto + ' Pases Completos');
            }
            if (cantCamisas >= 1){                
                listadoProductos.push(cantCamisas + ' Camisas');
            }
            if (cantEtiquetas >= 1){                
                listadoProductos.push(cantEtiquetas + ' Etiquetas');
            }
            
            lista_productos.innerHTML = '';
            for(var i=0 ; i < listadoProductos.length; i++){
                lista_productos.innerHTML += listadoProductos[i] + '<br/>';
            }
                     
            suma_total.innerHTML = '';
            var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * 0.93) + (cantEtiquetas  * 2);
            console.log(totalPagar);
            suma_total.innerHTML = '$ ' + totalPagar.toFixed(2); // toFixed sirve para la cantidad de decimales 

            if(totalPagar != 0){
                lista_productos.style.display = 'block';                 
            }else{
                lista_productos.style.display = 'none';              
            }         
        }
    }
    function mostrarDias(event){
        event.preventDefault(); 
        let  boletosDia = parseInt(pase_dia.value, 10) || 0,
             boletos2Dias = parseInt(pase_dosdias.value) || 0,
             boletoCompleto = parseInt(pase_completo.value) || 0;
        
             var diasElegidos = [];

             if(boletosDia > 0){
                 diasElegidos.push('viernes');
             }
             if(boletos2Dias>0){
                 diasElegidos.push('viernes','sabado')
             }
             if(boletoCompleto>0){
                 diasElegidos.push('viernes','sabado','domingo');
             }
             for(var i=0; i < diasElegidos.length; i++){
                 document.getElementById(diasElegidos[i]).style.display = 'block';
             }
    }
} // Cierre del IF para elementos
    // Animaciones para Numeros 
    
   
}); // DOM CONTENT LOADED

//Lettering

$('.nombre-sitio').lettering();

//MENU FIJO

var windowHeight = $(window).height();
var barraAltura = $('.barra').innerHeight();

$(window).scroll(function(){ // Creacion de metodo, esto lee los scroll que se hagan en la ventana
    var scroll = $(window).scrollTop(); // Scroll TOO es la que ayuda a detectar el scrolling
    if(scroll > windowHeight){
        $('.barra').addClass('fixed');
        $('body').css({'margin-top': barraAltura+'px'});
    } else {
        $('.barra').removeClass('fixed');
        $('body').css({'margin-top': '0'});
    }
});

// MENU RESPONSIVE 

$('.menu-movil').on('click', function(){
    $('.navegacion-principal').slideToggle();  
});




 // INVITADOS, TALLERES,ETC 

 $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6}, 2000);  //nth-child sirve para seleccionar el elemento en base a su numero. 1 seria invitados en este caso. 
 $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 18}, 1500);
 $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 20}, 1800);
 $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 5}, 1000);

 // CUENTA REGRESIVA FOOTER

 $('.cuenta-regresiva').countdown('2021/01/16 09:00:00', function(event){
    $('#dias').html(event.strftime('%D'));
    $('#horas').html(event.strftime('%H'));
    $('#minutos').html(event.strftime('%M'));
    $('#segundos').html(event.strftime('%S'));
 });

})();
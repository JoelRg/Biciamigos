/**
 * addReportsSection
 */
function addReportsSection() {

    this._object = null;

    this._targetId = "#add-reports-section";

    this._backButton = "#add-reports-section #add-reports-back";

    this._keyboard       = '#virtualKeyboard';

    this._construct();
}


/**
 * Constructor
 */
addReportsSection.prototype._construct = function() {
    var thisO = this;
}


/**
 * Inicializa el objeto
 */
addReportsSection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    thisO._initEvents();

}


/**
 *
 */
addReportsSection.prototype._initEvents = function() {
    var thisO = this;

    // Boton de back.

    $(thisO._backButton).on('click', function(e){
        thisO.hide(function(){
            window.reportsSection.show();
        });
    });

   // Click encima de input de asunto

    $("#asunto").on('click', function(e){

        $(thisO._keyboard).slideDown('fast');

        console.log('search triggered');
    });

    // Click encima de input de descripcion

    $("#descripcion").on('click', function(e){

        $(thisO._keyboard).slideDown('fast');

        console.log('search triggered');
    });

    // Click encima del icono de plus de la seccion reportes. 

    $("#add-report").on('click', function(e) {
        e.preventDefault();
      
        window.hideAll();
        thisO.show();
        
    });

    // Click encima del icono "Reportar" de la barra inferior.

    $("#report").on('click', function(e) {
        e.preventDefault();

        if ($(thisO._targetId).css("display") === "none"){        
            window.hideAll();
            thisO.show();
        }
    });

    var idReporte=3;

    // Click submit al formulario de enviar reporte.
    $("form#formAddReport").submit(function(event){
        event.preventDefault();
        var error= false;
        var maxCarecteresAsunto= 30;
        var maxCarecteresDescripcion= 200;

        var asunto=$("#asunto").val()
        var descripcion=$("#descripcion").val()
        var categoria= $("#categoria").val()

        if (asunto.length>maxCarecteresAsunto){
            $("#errorAsunto").css("display","block");
            error=true;
        }else{
            $("#errorAsunto").css("display","none");
        }
        
        if (descripcion.length>maxCarecteresDescripcion){
            $("#errorDescripcion").css("display","block");
            error=true;
        }else{
            $("#errorDescripcion").css("display","none");
        }

        if (categoria==""){
            $("#errorCategoria").css("display","block");
            error=true;
        }else{
            $("#errorCategoria").css("display","none");
        }

        if (!error){
            date = new Date(); // fecha actual.
            window.reportsData["reporteNuevo" + idReporte.toString()]=
                        {'id' : "reporteNuevo" + idReporte.toString(),
                        'asunto' : asunto,
                        'descripcion' : descripcion,
                        'categoria' : categoria,
                        'fecha' : date.getDate() +"/"+(date.getMonth()+1) +"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes(),
                        'estado' : 'PENDIENTE',
                        'respuesta':'',
                        };

            idReporte=idReporte+1;         
            
            // fecha: 21/12/15 05:15 am
            //getDate()   Devuelve el dia del mes (entre el 1 y el 31)
            //getDay()    Devuelve el dia de la semana (entre el 0 y el 6)
            //getMonth()  Devuelve el mes (entre el 0 y el 11)
            //getFullYear()   Devuelve el año (en formato de 4 digitos)
            //getHours()  Devuelve la hora (entre el 0 y el 24)
            //getMinutes() Devuelve los minutos

        }

    });

}


/**
 * Muestra la seccion
 */
addReportsSection.prototype.show = function(callBack) {
    var thisO = this;

    thisO._object.fadeIn('fast', function(){
        callBack && callBack();
    });

    $("#asunto").val('');

    $("#descripcion").val('');

    $("#categoria").val('');
}


/**
 * Oculta la seccion
 */
addReportsSection.prototype.hide = function(callBack) {
    var thisO = this;

    $("#asunto").val('');
    $(thisO._keyboard).fadeOut('fast');

    $("#descripcion").val('');
    $(thisO._keyboard).fadeOut('fast');


    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}





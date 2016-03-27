/**
 * detailReportsSection
 */
function detailReportsSection() {

    this._object = null;

    this._targetId = "#detail-reports-section";

    this._backButton = "#detail-reports-section #detail-reports-back";

    this._construct();
}


/**
 * Constructor
 */
detailReportsSection.prototype._construct = function() {
    var thisO = this;
}


/**
 * Inicializa el objeto
 */
detailReportsSection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    thisO._initEvents();

}


/**
 *
 */
detailReportsSection.prototype._initEvents = function() {
    var thisO = this;

    // Boton de back.
    
    $(thisO._backButton).on('click', function(e){
        thisO.hide(function(){
            window.reportsSection.show();
        });
    });


}


/**
 * Muestra la seccion
 */
detailReportsSection.prototype.show = function(item,callBack) {
    var thisO = this;


    thisO._object.fadeIn('fast', function(){
        
        // Detalles del reporte
        $("#detail-reports-content").empty();
        var divItem = "<div class='reports-entry' data-reportsid='"+ item.id +"'>"
               + "  <div class='reportsEntry-data'>"
               + "      <div class='name'>"+ item.asunto +"</div>"
               + "      <div class='name'>"+ item.descripcion +"</div>"
               + "      <div class='name'> Categoría: "+ item.categoria +"</div>"
               + "      <div class='name'> Fecha: "+ item.fecha +"</div>"
               + "      <div class='name'> Estado: "+ item.estado +"</div>"
               + "  </div>"
               + "</div>";
                   
        $("#detail-reports-content").append(divItem);

        $("#answer-reports").empty();

        // Respuesta del reporte
        respuesta=item.respuesta;
        if (respuesta===""){
            var divItemRespuesta = "<span>Esperando respuesta...</span>";
        }else{
            var divItemRespuesta = "<div class='reports-entry' data-reportsid='"+ item.id +"'>"
                   + "  <div class='reportsEntry-data'>"
                   + "      <div class='name'>"+ respuesta.usuario +"</div>"
                   + "      <div class='name'>"+ respuesta.comentario +"</div>"
                   + "      <div class='name'> Fecha: "+ respuesta.fecha +"</div>"
                   + "  </div>"
                   + "</div>";
        } 

        $("#answer-reports").append(divItemRespuesta);
        callBack && callBack();
    });

}


/**
 * Oculta la seccion
 */

detailReportsSection.prototype.hide = function(callBack) {
    var thisO = this;

    $("#report-env").hide();

    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}





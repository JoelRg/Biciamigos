/**
 * reportsSection
 */
function reportsSection(reportsEntries) {

    this._object = null;

    this._targetId = "#reports-section";

    this._backButton = "#reports-section #reports-back";
    this._miniLoader = "#reports-section .mini-loader";

    // Selector de lista de entradas de reportes
    this._reportsEntriesUlClass = this._targetId +' .reports-list ul';

    // Datos del reporte
    this._reportsEntries = {};


    this._construct(reportsEntries);
}


/**
 * Constructor
 */
reportsSection.prototype._construct = function(reportsEntries) {
    var thisO = this;

    thisO._reportsEntries = reportsEntries;
}


/**
 * Inicializa el objeto
 */
reportsSection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    // Construye la lista de reportes
    thisO._initreportsEntriesList();


    thisO._initEvents();
}


/**
 *
 */
reportsSection.prototype._initEvents = function() {
    var thisO = this;

    // Botones
    $(thisO._backButton).on('click', function(e){
        thisO.hide(function(){
            window.hideAll();
            window.navTop.show('slide-down');
        });
    });


    // Click encima de cualquier item de reportes

    $(thisO._reportsEntriesUlClass).on('click', 'li', function(e) {
        e.preventDefault();

        var reportsId = $(this).attr('data-reportsid');
        var itemResult = thisO._searchItem(reportsId);
        thisO.hide(function(){
            window.detailReportsSection.show(itemResult);
        });
    });



}


/**
 * Muestra la seccion
 */
reportsSection.prototype.show = function(callBack) {
    var thisO = this;

    thisO._object.fadeIn('fast', function(){


        $(thisO._reportsEntriesUlClass).empty();

        // Construye la lista de reportes actualizada.
        thisO._initreportsEntriesList();


        callBack && callBack();
    });
}


/**
 * Oculta la seccion
 */
reportsSection.prototype.hide = function(callBack) {
    var thisO = this;

    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}


/**
 * Construye la lista de reportes.
 */
reportsSection.prototype._initreportsEntriesList = function() {
    var thisO = this;

     $.each(thisO._reportsEntries, function(reportsId, reportsEntry) {

        var li = "<li class='reports-entry' data-reportsid='"+ reportsEntry.id +"'>"
               + "  <div class='reportsEntry-data'>"
               + "      <div class='name'>"+ reportsEntry.asunto +"</div>"
               + "      <div class='name'> Fecha: "+ reportsEntry.fecha +"</div>"
               + "      <div class='name'> Estado: "+ reportsEntry.estado +"</div>"
               + "  </div>"
               + "</li>";
        $(thisO._reportsEntriesUlClass).append(li);
    });

}

reportsSection.prototype._searchItem = function(searchItemId) {
    var thisO = this;

    var itemResult = null;
    $.each(thisO._reportsEntries, function(index, item){

        if (searchItemId == item.id) {
            itemResult = item;
            return false;
        }
    });

    return itemResult;
}

// Data
window.reportsData = {
        'reporte1': {
            'id' : 'reporte1',
            'asunto' : 'Hueco en valle coche.',
            'descripcion' : 'descripcion',
            'categoria' : 'categoria',
            'fecha' : '21/12/15 05:15 am',
            'estado' : 'PENDIENTE',
            'respuesta':'',
        },
        'reporte2': {
            'id' : 'reporte2',
            'asunto' : 'Accidente la candelaria.',
            'descripcion' : 'descripcion',
            'categoria' : 'categoria',
            'fecha' : '01/12/15 12:15 pm',
            'estado' : 'ATENDIDO',            
            'respuesta':{
               'usuario':'Joel', 
               'comentario':'Ya se envio al personal de mantenimiento.',
               'fecha':'01/12/15 02:15 pm',
            },
        },
    };


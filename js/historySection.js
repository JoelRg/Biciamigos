/**
 * historySection
 */
function historySection(historyEntries) {

    this._object = null;

    this._targetId = "#history-section";

    this._backButton = "#history-section #history-back";
    this._miniLoader = "#history-section .mini-loader";

    // Selector de lista de entradas de historial
    this._historyEntriesUlClass = this._targetId +' .history-list ul';

    // Datos del historial
    this._historyEntries = {};


    this._construct(historyEntries);
}


/**
 * Constructor
 */
historySection.prototype._construct = function(historyEntries) {
    var thisO = this;

    thisO._historyEntries = historyEntries;
}


/**
 * Inicializa el objeto
 */
historySection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    // Construye la lista de estaciones
    thisO._initHistoryEntriesList();


    thisO._initEvents();
}


/**
 *
 */
historySection.prototype._initEvents = function() {
    var thisO = this;

    // Botones
    $(thisO._backButton).on('click', function(e){
        thisO.hide(function(){
            window.navTop.show('slide-down');
        });
    });


    // Click encima de cualquier item de historial
    $(thisO._historyEntriesUlClass).on('click', 'li', function(e) {
        e.preventDefault();

        var historyId = $(this).attr('data-historyid');
        thisO.hide(function(){
            window.searchSection.show();
            $('.search-list li[data-searchitemid='+ historyId +']').trigger('click');
        });
    });
}


/**
 * Muestra la seccion
 */
historySection.prototype.show = function(callBack) {
    var thisO = this;

    thisO._object.fadeIn('fast', function(){
        callBack && callBack();
    });
}


/**
 * Oculta la seccion
 */
historySection.prototype.hide = function(callBack) {
    var thisO = this;

    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}


/**
 * Construye la lista de destinos del historial
 */
historySection.prototype._initHistoryEntriesList = function() {
    var thisO = this;

     $.each(thisO._historyEntries, function(historyId, historyEntry) {

        var li = "<li class='history-entry' data-historyid='"+ historyEntry.id +"'>"
               + "  <div class='historyEntry-data'>"
               + "      <div class='name'>"+ historyEntry.name +"</div>"
               + "  </div>"
               + "</li>";
        $(thisO._historyEntriesUlClass).append(li);
    });

}


// Data
window.historyData = {
        'sambil': {
            'id' : 'sambil',
            'name' : 'Sambil',
        }
    };


/**
 * bikeStationsSection
 */
function bikeStationsSection(bikeStations) {

    this._object = null;

    this._targetId = "#bikeStations-section";

    this._backButton = "#bikeStations-section #bks-back";
    this._refreshButton = "#bikeStations-section #bks-refresh";
    this._miniLoader = "#bikeStations-section .mini-loader";

    // Selector de lista de estaciones
    this._bikeStationsUlClass = '.bks-list';

    // Datos de estaciones
    this._bikeStations = {};


    this._construct(bikeStations);
}


/**
 * Constructor
 */
bikeStationsSection.prototype._construct = function(bikeStations) {
    var thisO = this;

    thisO._bikeStations = bikeStations;
}


/**
 * Inicializa el objeto
 */
bikeStationsSection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    // Construye la lista de estaciones
    thisO._initBikeStationsList();


    thisO._initEvents();
}


/**
 *
 */
bikeStationsSection.prototype._initEvents = function() {
    var thisO = this;

    // Botones
    $(thisO._backButton).on('click', function(e){
        thisO.hide(function(){
            window.navTop.show('slide-down');
        });
    });

    $(thisO._refreshButton).on('click', function(e){

        $(thisO._targetId + " "+ thisO._bikeStationsUlClass).hide();
        $(thisO._miniLoader).show();

        setTimeout(function(){
            $(thisO._miniLoader).hide();
            $(thisO._targetId + " "+ thisO._bikeStationsUlClass).show();
        }, 1000);
    });


    // Click encima de cualquier estacion
    $(thisO._targetId +" "+ thisO._bikeStationsUlClass).on('click', 'li', function(e) {
        e.preventDefault();

        var bikeStationId = $(this).attr('data-bksId');
        thisO.hide(function() {
            window.navTop.show('slide-down');
            window.map.centerOnBikeStation(bikeStationId);
        });
    });
}


/**
 * Muestra la seccion
 */
bikeStationsSection.prototype.show = function(callBack) {
    var thisO = this;

    thisO._object.fadeIn('fast', function(){
        callBack && callBack();
    });
}


/**
 * Oculta la seccion
 */
bikeStationsSection.prototype.hide = function(callBack) {
    var thisO = this;

    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}


/**
 * Construye la lista de estaciones
 */
bikeStationsSection.prototype._initBikeStationsList = function() {
    var thisO = this;

     $.each(thisO._bikeStations, function(bksId, bks) {

        var li = "<li class='bike-station' data-bksId='"+ bksId +"'>"
               + "  <div class='bks-data'>"
               + "      <div class='name'>"+ bks.name +"</div>"
               + "      <table class='data'>"
               + "          <tr><td>Bicicletas:</td><td class='number'>"+ bks.data.availableBikes +"</td></tr>"
               + "          <tr><td>Puestos libres:</td><td class='number'>"+ bks.data.freeDocks +"</td></tr>"
               + "      </table>"
               + "  </div>"
               + "  <div class='bks-other'>"
               + "      <div class='distance'>"+ bks.data.distanceToMe[0] +"</div>"
               + "  </div>"
               + "</li>";
        $(thisO._bikeStationsUlClass).append(li);
    });

}


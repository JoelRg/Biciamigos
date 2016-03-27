/**
 * bikeRoadsSection
 */
function bikeRoadsSection(bikeRoads) {

    this._object = null;

    this._targetId = "#bikeRoads-section";

    this._backButton = "#bikeRoads-section #bkr-back";

    this._showAlwaysButton = "#bikeRoads-section .always-show > div";

    // Selector de lista de ciclovias
    this._bikeRoadsUlClass = '.bkr-list';

    // Datos de ciclovias
    this._bikeRoads = {};

    // Mostrar ciclovias siempre?
    this._showAlways = false;


    this._construct(bikeRoads);
}


/**
 * Constructor
 */
bikeRoadsSection.prototype._construct = function(bikeRoads) {
    var thisO = this;

    thisO._bikeRoads = bikeRoads;
}


/**
 * Inicializa el objeto
 */
bikeRoadsSection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    // Construye la lista de estaciones
    thisO._initBikeRoadsList();


    thisO._initEvents();
}


/**
 *
 */
bikeRoadsSection.prototype._initEvents = function() {
    var thisO = this;

    // Botones
    $(thisO._backButton).on('click', function(e){
        e.preventDefault();

        thisO.hide(function(){
            window.navTop.show('slide-down');
        });
    });


    // Mostrar siempre ciclovias?
    $(thisO._showAlwaysButton).on('click', function(e){
        e.preventDefault();

        if (thisO._showAlways) {
            thisO._showAlways = false;
            $(thisO._showAlwaysButton).removeClass('checked');
            window.map.hideBikeRoads();

        } else {
            thisO._showAlways = true;
            $(thisO._showAlwaysButton).addClass('checked');
            window.map.showBikeRoads();
        }

    });


    // Click encima de cualquier ciclovia
    $(thisO._targetId +" "+ thisO._bikeRoadsUlClass).on('click', 'li', function(e) {
        e.preventDefault();

        var bikeRoadId = $(this).attr('data-bkrId');
        thisO.hide(function() {
            window.navTop.show('slide-down');

            // Oculta las demas solo si no se tienen
            // que mostrar siempre
            if (!thisO._showAlways) {
                window.map.hideBikeRoads();
            }

            window.map.centerOnBikeRoad(bikeRoadId);
        });
    });
}


/**
 * Muestra la seccion
 */
bikeRoadsSection.prototype.show = function(callBack) {
    var thisO = this;

    thisO._object.fadeIn('fast', function(){
        callBack && callBack();
    });
}


/**
 * Oculta la seccion
 */
bikeRoadsSection.prototype.hide = function(callBack) {
    var thisO = this;

    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}


/**
 * Construye la lista de estaciones
 */
bikeRoadsSection.prototype._initBikeRoadsList = function() {
    var thisO = this;

    $.each(thisO._bikeRoads, function(bkrId, bkr) {

        var li = "<li class='bike-road' data-bkrId='"+ bkrId +"'>"
               + "  <div class='bkr-data'>"
               + "      <div class='name'>"+ bkr.name +"</div>"
               + "  </div>"
               + "</li>";
        $(thisO._bikeRoadsUlClass).append(li);
    });

}


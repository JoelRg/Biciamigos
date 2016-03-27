/**
 * navBottom
 */
function navBottom(config) {

    this._object = null;

    this._targetId = "#nav-bottom";

    this._showMapButton = this._targetId +' #show-map';
    this._nearMeButton  = this._targetId +' #near-me';
    this._reportButton  = this._targetId +' #report';


    this._construct();
}


/**
 * Constructor
 */
navBottom.prototype._construct = function() {
    var thisO = this;
}


/**
 * Inicializa el objeto
 */
navBottom.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    thisO._initEvents();

    thisO.show('no-slide');
}


/**
 *
 */
navBottom.prototype._initEvents = function() {
    var thisO = this;

    // Eventos botones
    $(this._showMapButton).on('click', function(e){
        e.preventDefault();

        window.hideAllButMap();

        window.map.showBikeStations();
    });


    $(this._nearMeButton).on('click', function(e){
        e.preventDefault();

        window.hideAllButMap();

        window.map.centerOnCurrentPosition(null, function(){
            window.map.dimBikeStations(null, ['altamira', 'ccsanignacio', 'lacastellana']);
            window.map.showBikeStationById('altamira', null, true);
            window.map.showBikeStationById('ccsanignacio', null, true);
            window.map.showBikeStationById('lacastellana', null, true);
        });
    });


    $(this._reportButton).on('click', function(e){
        e.preventDefault();

        //window.hideAllButMap();
    });
}


/**
 * Muestra el menu
 */
navBottom.prototype.show = function(method) {
    var thisO = this;

    switch (method) {
        case 'no-slide':
            thisO._object.show();
            break;

        case 'slide-down':
        default:
            thisO._object.slideDown('fast');
            break;
    }
}


/**
 * Oculta el menu
 */
navBottom.prototype.hide = function(method) {
    var thisO = this;

    switch (method) {
        case 'no-slide':
            thisO._object.hide();
            break;

        case 'slide-up':
        default:
            thisO._object.slideUp('fast');
            break;
    }
}


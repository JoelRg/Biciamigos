/**
 * menuSidebar
 */
function menuSidebar(config) {

    this._object  = null;
    this._nav     = null;
    this._overlay = null;

    this._targetId = "#menu-sidebar";
    this._navSelector = "#menu-sidebar nav";
    this._overlaySelector = "#menu-overlay";


    this._construct();
}


/**
 * Constructor
 */
menuSidebar.prototype._construct = function() {
    var thisO = this;
}


/**
 * Inicializa el objeto
 */
menuSidebar.prototype.init = function() {
    var thisO = this;

    // Selectores
    thisO._object  = $(thisO._targetId);
    thisO._nav     = $(thisO._navSelector);
    thisO._overlay = $(thisO._overlaySelector);

    thisO._initEvents();
}


/**
 *
 */
menuSidebar.prototype._initEvents = function() {
    var thisO = this;

    // Click fuera del menu para ocultarlo
    thisO._overlay.on('click', function(e){
        e.preventDefault();

        thisO.hide();
    });


    // Click encima de cualquier elemento del menu
    // que apunte a una seccion
    $(this._targetId + " ul").on('click', 'li', function(e) {
        e.preventDefault();

        var section = window[$(this).attr('class') +"Section"];
        if (section) {
            window.hideAll();

            thisO.hide(function() {
                section.show();
            });
        }

    });

}


/**
 * Muestra/oculta segun sea el caso
 *
 */
menuSidebar.prototype.toogleVisibility = function() {
    var thisO = this;

    if (thisO._object.css('left') != '0px') {
        thisO.show();
    } else {
        thisO.hide();
    }
}


/**
 * Muestra el menu
 */
menuSidebar.prototype.show = function(callBack) {
    var thisO = this;

    thisO._overlay.css({'display': 'inline-block'});
    thisO._nav.animate({left: '0'}, 'slow', function() {
        callBack && callBack();
    });
}


/**
 * Oculta el menu
 */
menuSidebar.prototype.hide = function(callBack) {
    var thisO = this;

    thisO._overlay.css({'display': 'none'});
    thisO._nav.animate({left: '-100%'}, 'slow', function(){
        callBack && callBack();
    });
}


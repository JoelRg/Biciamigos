/**
 * aboutSection
 */
function aboutSection(data) {

    this._object = null;

    this._targetId = "#about-section";

    this._backButton = "#about-section #about-back";


    this._construct();
}


/**
 * Constructor
 */
aboutSection.prototype._construct = function(data) {
    var thisO = this;
}


/**
 * Inicializa el objeto
 */
aboutSection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    thisO._initEvents();
}


/**
 *
 */
aboutSection.prototype._initEvents = function() {
    var thisO = this;

    // Botones
    $(thisO._backButton).on('click', function(e){
        thisO.hide(function(){
            window.navTop.show('slide-down');
        });
    });
}


/**
 * Muestra la seccion
 */
aboutSection.prototype.show = function(callBack) {
    var thisO = this;

    thisO._object.fadeIn('fast', function(){
        callBack && callBack();
    });
}


/**
 * Oculta la seccion
 */
aboutSection.prototype.hide = function(callBack) {
    var thisO = this;

    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}



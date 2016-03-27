/**
 * navTop
 */
function navTop(config) {

    this._object = null;

    this._targetId = "#nav-top";

    this._menuSidebarTriggerId = '#menu-toggle';
    this._sectionTitleSelector = '#nav-top-title';
    this._searchTriggerId      = '#search';


    // Default: Mapa
    this._sectionTitle = "Mapa";

    this._defaultSectionTitle = "Mapa";


    this._construct();
}


/**
 * Constructor
 */
navTop.prototype._construct = function() {
    var thisO = this;
}


/**
 * Inicializa el objeto
 */
navTop.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    thisO._initEvents();

    thisO.setTitle();
    thisO.show('no-slide');
}


/**
 *
 */
navTop.prototype._initEvents = function() {
    var thisO = this;

    // Muestra el menu lateral
    $(thisO._menuSidebarTriggerId).on('click', function(e){
        e.preventDefault();

        window.hideAllButMap();
        window.menuSidebar.show();
    });

    // Muestra el panel de busqueda
    $(thisO._searchTriggerId).on('click', function(e){
        e.preventDefault();

        window.hideAllButMap();
        window.searchSection.show();
    });
}


/**
 * Muestra el menu
 */
navTop.prototype.show = function(method) {
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
navTop.prototype.hide = function(method) {
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


/**
 * Devuelve el selector del boton que muestra el menu
 *
 * @return Object
 */
navTop.prototype.getMenuSidebarTrigger = function() {
    var thisO = this;

    return $(thisO._menuSidebarTriggerId);
}


/**
 * Obtiene el titulo de la seccion actual
 */
navTop.prototype.getTitle = function() {
    var thisO = this;

    return $(thisO._sectionTitleSelector).text();
}


/**
 * Establece el titulo de la seccion actual
 */
navTop.prototype.setTitle = function(title) {
    var thisO = this;

    var title = title ? title : thisO._defaultSectionTitle;
    $(thisO._sectionTitleSelector).text(title);
}


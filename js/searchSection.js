/**
 * searchSection
 */
function searchSection(searchData) {

    this._object = null;

    this._targetId = "#search-section";

    this._searchHeader   = '#search-section #nav-search';
    this._searchToField  = '#search-section #nav-search #search-to';
    this._searchDistance = '#search-section #nav-search .distance';
    this._searchTime     = '#search-section #nav-search .time';
    this._searchContent  = '#search-section .search-content';
    this._backButton     = '#search-section #search-back';
    this._miniLoader     = '#search-section .mini-loader';
    this._keyboard       = '#virtualKeyboard';

    // Clase de lista de resultados busqueda
    this._searchResultsUlClass = '.search-list';

    // Lista completa resultados de busqueda
    this._searchFullList = {};

    // Lista filtrada producto de la busqueda
    this._searchCurrentList = {};


    // Datos enviados en inicializacion
    this._rawConfig = null;

    this._construct(searchData);
}


/**
 * Constructor
 */
searchSection.prototype._construct = function(searchData) {
    var thisO = this;

    thisO._rawConfig = searchData;
    thisO._searchCurrentList = searchData;
}


/**
 * Inicializa el objeto
 */
searchSection.prototype.init = function() {
    var thisO = this;

    // Selector
    thisO._object = $(thisO._targetId);
    thisO._object.removeClass('no-display');

    // Inicializa busqueda
    thisO._initSearchList();


    thisO._initEvents();
}


/**
 *
 */
searchSection.prototype._initEvents = function() {
    var thisO = this;

    // Botones
    $(thisO._backButton).on('click', function(e){
        thisO.hide(function(){
            window.navTop.show('slide-down');
        });
    });


    // Clic encima de input de busqueda
    $(thisO._searchToField).on('click', function(e){

        $(thisO._keyboard).slideDown('fast');

        $(thisO._searchContent).css('display', 'block');
        $(thisO._searchDistance).html('');
        $(thisO._searchTime).html('');
        console.log('search triggered');
    });


    // Click encima de cualquier resultado de busqueda
    $(thisO._targetId +" "+ thisO._searchResultsUlClass).on('click', 'li', function(e) {
        e.preventDefault();

        var searchItemId = $(this).attr('data-searchItemId');
        var item = thisO._searchItem(searchItemId);
        if (item) {

            console.log('item ', item);

            $(thisO._searchToField).val(item.name);
            $(thisO._searchDistance).html(item.data.distance);
            $(thisO._searchTime).html(item.data.time);

            $(thisO._searchContent).css('display', 'none');
            $(thisO._keyboard).fadeOut('fast');

            window.map.centerOnSearchResult(item.id);
        }

    });

    // Cambio de valor en el campo busqueda para filtrar resultados.

    $(thisO._searchToField).on('keyup', function(){
        //alert($(thisO._searchToField).val());
        var search= $(thisO._searchToField).val();

        $(thisO._searchResultsUlClass).empty();

        $.each(thisO._searchCurrentList, function(index, item){
            var name=item.name;
            if (name.toLowerCase().indexOf(search.toLowerCase())>-1){

                var li = "<li data-searchItemId='"+ item.id +"'>"
                       + "  <div class='searchItem-data'>"
                       + "      <div class='name'>"+ item.name +"</div>"
                       + "  </div>"
                       + "</li>";

                $(thisO._searchResultsUlClass).append(li);
            }

        });

    });

}


/**
 *
 */
searchSection.prototype._initSearchList = function() {
    var thisO = this;

    $.each(thisO._searchCurrentList, function(index, item){

        var li = "<li data-searchItemId='"+ item.id +"'>"
               + "  <div class='searchItem-data'>"
               + "      <div class='name'>"+ item.name +"</div>"
               + "  </div>"
               + "</li>";
        $(thisO._searchResultsUlClass).append(li);
    });
}


searchSection.prototype._searchItem = function(searchItemId) {
    var thisO = this;

    var itemResult = null;
    $.each(thisO._searchCurrentList, function(index, item){

        if (searchItemId == item.id) {
            itemResult = item;
            return false;
        }
    });

    return itemResult;
}


/**
 * Muestra la seccion
 */
searchSection.prototype.show = function(callBack) {
    var thisO = this;

    thisO._object.fadeIn('fast', function(){
        callBack && callBack();
    });

    $(thisO._searchToField).val('');
    $(thisO._searchToField).trigger('click');
}


/**
 * Oculta la seccion
 */
searchSection.prototype.hide = function(callBack) {
    var thisO = this;

    $('#sambil').fadeOut('fast');
    $('#endPointer').fadeOut('fast');

    $(thisO._searchToField).val('');
    $(thisO._keyboard).fadeOut('fast');

    thisO._object.fadeOut('fast', function(){
        callBack && callBack();
    });
}








// Data de estaciones
// Datos comunes y escenario default
window.searchData = {
    'sambil' : {
        'id' : 'sambil',
        'name' : 'Sambil',
        'zoom-show' : 16,
        'coordinates' : {
            14 : [0, 0],
            15 : [0, 0],
            16 : [968, 279],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {
            'distance' : "2 Km",
            'time' : "25 min",
        }
    },
    'sambil2' : {
        'id' : 'sambil2',
        'name' : 'billiards',
        'zoom-show' : 16,
        'coordinates' : {
            14 : [0, 0],
            15 : [0, 0],
            16 : [904, 79],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {
            'distance' : "2 Km",
            'time' : "25 min",
        }
    },
        'ambil' : {
        'id' : 'ambil',
        'name' : 'Acorazado',
        'zoom-show' : 16,
        'coordinates' : {
            14 : [0, 0],
            15 : [0, 0],
            16 : [904, 79],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {
            'distance' : "2 Km",
            'time' : "25 min",
        }
    },
        'metrocenter': {
        'id' : 'metrocenter',
        'name' : 'metrocenter',
        'zoom-show' : 16,
        'coordinates' : {
            14 : [0, 0],
            15 : [0, 0],
            16 : [904, 79],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {
            'distance' : "2 Km",
            'time' : "25 min",
        }
    },


};



// Datos segun el escenario
switch (window.scenario) {
    case 1:
    default:
        /*
        window.bikeStationData['chacaito']['data']['distanceToMe'] = ["2 Km", 2000];
        window.bikeStationData['ccchacao']['data']['distanceToMe'] = ["1.8 Km", 1800];
        window.bikeStationData['campoalegre']['data']['distanceToMe'] = ["1.6 Km", 1700];
        window.bikeStationData['ccsanignacio']['data']['distanceToMe'] = ["450 m", 450];
        window.bikeStationData['chacao']['data']['distanceToMe'] = ["700 m", 700];
        window.bikeStationData['bellocampo']['data']['distanceToMe'] = ["800 m", 800];
        window.bikeStationData['lacastellana']['data']['distanceToMe'] = ["120 m", 120];
        window.bikeStationData['plazaaltamira']['data']['distanceToMe'] = ["400 m", 300];;
        window.bikeStationData['altamira']['data']['distanceToMe'] = ["150 m", 150];
        window.bikeStationData['plazapalosgrandes']['data']['distanceToMe'] = ["1 Km", 1000];
        window.bikeStationData['parquedeleste']['data']['distanceToMe'] = ["2.2 Km", 2200];
        */

        break;

    case 2:

        break;

    case 3:
        break;
}



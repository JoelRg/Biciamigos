/**
 * bikeRoad - Ciclovias
 */
function bikeRoad(data, map) {

    this._objects = {
        14 : null,
        15 : null,
        16 : null
    };

    this._targetIds = {
        14 : null,
        15 : null,
        16 : null
    };

    this._coordinates = {
        14 : null,
        15 : null,
        16 : null
    };

    this._tooltip = {
        14 : null,
        15 : null,
        16 : null
    };

    this._id = null;
    this._name = null;


    this._construct(data, map);
}


/**
 * Constructor
 */
bikeRoad.prototype._construct = function(data, map) {
    var thisO = this;

    thisO._map = map;

    thisO.init(data);
}


/**
 * Inicializa el objeto
 */
bikeRoad.prototype.init = function(data) {
    var thisO = this;

    // Selectores y posicionamiento de los elementos
    // en cada mapa segun el zoom
    $.each(thisO._map._zoomLevels, function(index, zoom) {

        var idDiv = "bkr-"+ data.id +"-"+ zoom;
        $(thisO._map._mapObjectContainerObjectList[zoom])
            .append("<div id='"+ idDiv +"' class='bike-road'></div>");

        thisO._objects[zoom] = $("#"+ idDiv);
        thisO._targetIds[zoom] = "#"+ idDiv;

        thisO._tooltip[zoom] = data.tooltip[zoom];

        thisO._coordinates[zoom] = data.coordinates[zoom];
        thisO._objects[zoom]
            .css({left: thisO._coordinates[zoom][0], top: thisO._coordinates[zoom][1]});
    });


    // Id, nombre, bicicletas, docks y total
    thisO._id = data.id;
    thisO._name = data.name;


    // Inicializa eventos
    thisO._initEvents();

    // Muestra para todos los niveles de zoom
    thisO.hide();
}


/**
 *
 */
bikeRoad.prototype._initEvents = function() {
    var thisO = this;

    // Tooltip para cada zoom
    $.each(thisO._map._zoomLevels, function(index, zoom) {

        var text = "<div class='bikeroad-tooltip-text "+ thisO._id +"' data-bkrid='"+ thisO._id +"'>"
                 + "  <div class='name'>Ciclovía "+ thisO._name +"</div>"
                 + "</div>";

        var size = zoom != 14 ? 'medium' : 'x-small';

        Tipped.create(thisO._targetIds[zoom], text, {
            skin : 'light', // didn't work, only on Pro
            position : thisO._tooltip[zoom],
            container : thisO._map._mapObjectContainerTargetIds[zoom],
            detach : false,
            fixed : true,
            hideOn : 'click',
            shadow: true,
            hideOnClickOutside : true,
            //hideOthers: true,
            maxWidth: 300,
            showOn: 'click',
            size: size,
            //target: 'mouse',
            zIndex: 900
        });


        /*
        thisO._objects[zoom].on('click', function(){

            var $tooltips = $(".bikeroad-tooltip-text", thisO._map._mapObjectContainerObjectList[zoom]);
            $.each($tooltips, function(index, bkrTooltip)) {

                var dataId = bkrTooltip.attr('data-bkrid');
                if (thisO._id != dataId) {

                    if (bkrTooltip.is(":visible")) {
                        thisO._objects[zoom].trigger('click');
                    }
                }
            }
        });
        */

    });

}


/**
 * Muestra el elemento para el zoom indicado
 * o para todos los zoom si no se especifica
 */
bikeRoad.prototype.show = function(zoom, showTooltip) {
    var thisO = this;

    thisO.undim();

    if (!zoom) {

        $.each(thisO._map._zoomLevels, function(index, zoom) {
            thisO._objects[zoom].show();

            if (showTooltip) {
                thisO.showTooltip(zoom);
            }
        });

    } else {
        thisO._objects[zoom].show();

        if (showTooltip) {
            thisO.showTooltip(zoom);
        }
    }
}


/**
 * Oculta el elemento para el zoom indicado
 * o para todos los zoom si no se especifica
 */
bikeRoad.prototype.hide = function(zoom) {
    var thisO = this;

    if (!zoom) {

        $.each(thisO._map._zoomLevels, function(index, zoom) {
            thisO._objects[zoom].hide();
        });

    } else {
        thisO._objects[zoom].hide();
    }
}


/**
 * Obtiene las coordenadas del zoom especificado
 */
bikeRoad.prototype.getCoordinates = function(zoom) {
    var thisO = this;

    return [thisO._coordinates[zoom][0], thisO._coordinates[zoom][1]];
}


/**
 * Forza a que se muestre el tooltip
 */
bikeRoad.prototype.showTooltip = function(zoom) {
    var thisO = this;

    if (!zoom) {

        $.each(thisO._map._zoomLevels, function(index, zoom) {

            //console.log(thisO._id, $(".bikeRoad-tooltip-text."+ thisO._id).is(":visible"));
            //if (!$(".bikeRoad-tooltip-text."+ thisO._id).is(":visible")) {
                thisO._objects[zoom].trigger('click');
            //}
        });

    } else {

        //console.log(thisO._id, $(".bikeRoad-tooltip-text."+ thisO._id).is(":visible"));
        //if (!$(".bikeRoad-tooltip-text."+ thisO._id).is(":visible")) {
            thisO._objects[zoom].trigger('click');
        //}
    }
}


/**
 * Forza a que se oculte el tooltip
 */
bikeRoad.prototype.hideTooltip = function(zoom) {
    var thisO = this;

    if (!zoom) {

        $.each(thisO._map._zoomLevels, function(index, zoom) {

            if ($(".bikeRoad-tooltip-text."+ thisO._id).is(":visible")) {
                thisO._objects[zoom].trigger('click');
            }
        });

    } else {

        if ($(".bikeRoad-tooltip-text."+ thisO._id).is(":visible")) {
            thisO._objects[zoom].trigger('click');
        }
    }
}


/**
 *
 */
bikeRoad.prototype.dim = function(zoom) {
    var thisO = this;

    $.each(thisO._map._zoomLevels, function(index, zoom) {
        thisO._objects[zoom].css({opacity: '0.5'});
    });
}

/**
 *
 */
bikeRoad.prototype.undim = function(zoom) {
    var thisO = this;

    $.each(thisO._map._zoomLevels, function(index, zoom) {
        thisO._objects[zoom].css({opacity: '1'});
    });
}



// Data de ciclovias
// Datos comunes y escenario default
window.bikeRoadData = {
    'tamanaco' : {
        'id' : 'tamanaco',
        'name' : 'Tamanaco',
        'coordinates' : {
            14 : [13, 390],
            15 : [129, 443],
            16 : [303, 679],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {

        }
    },
    'campoalegreavenida4' : {
        'id' : 'campoalegreavenida4',
        'name' : 'Av. 4 - Campo Alegre',
        'coordinates' : {
            14 : [102, 304],
            15 : [317, 273],
            16 : [664, 338],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {

        }
    },
    'avlibertador' : {
        'id' : 'avlibertador',
        'name' : 'Av Libertador',
        'coordinates' : {
            14 : [108, 385],
            15 : [327, 435],
            16 : [685, 665],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {

        }
    },
    'avjuanpabloii' : {
        'id' : 'avjuanpabloii',
        'name' : 'Av. Juan Pablo II',
        'coordinates' : {
            14 : [199, 352],
            15 : [510, 373],
            16 : [1049, 535],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {

        }
    },
    'avjosefelixsosa' : {
        'id' : 'avjosefelixsosa',
        'name' : 'Av. José Félix Sosa',
        'coordinates' : {
            14 : [203, 359],
            15 : [517, 384],
            16 : [1066, 562],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {

        }
    },
    'avsantateresadejesus' : {
        'id' : 'avsantateresadejesus',
        'name' : 'Av. Santa Teresa de Jesús',
        'coordinates' : {
            14 : [147, 255],
            15 : [406, 173],
            16 : [845, 143],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {

        }
    },
    'lacastellanatransversal4' : {
        'id' : 'lacastellanatransversal4',
        'name' : 'Transversal 4 - La Castellana',
        'coordinates' : {
            14 : [147, 251],
            15 : [407, 167],
            16 : [844, 130],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {

        }
    },
    'avluisroche' : {
        'id' : 'avluisroche',
        'name' : 'Av. Luis Roche',
        'coordinates' : {
            14 : [241, 255],
            15 : [595, 178],
            16 : [1220, 155],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {

        }
    },
    'lospalosgrandestransversal2' : {
        'id' : 'lospalosgrandestransversal2',
        'name' : 'Transversal 2 - Los Palos Grandes',
        'coordinates' : {
            14 : [243, 297],
            15 : [596, 260],
            16 : [1223, 314],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'bottom'
        },
        'data' : {

        }
    },
    'lospalosgrandestransversal4' : {
        'id' : 'lospalosgrandestransversal4',
        'name' : 'Transversal 4 - Los Palos Grandes',
        'coordinates' : {
            14 : [249, 251],
            15 : [613, 164],
            16 : [1255, 122],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {

        }
    },
    'lospalosgrandesavenida4' : {
        'id' : 'lospalosgrandesavenida4',
        'name' : 'Av. 4 - Los Palos Grandes',
        'coordinates' : {
            14 : [308, 249],
            15 : [727, 164],
            16 : [1486, 122],
        },
        'tooltip': {
            14 : 'left',
            15 : 'left',
            16 : 'left'
        },
        'data' : {

        }
    }
}


// Datos segun el escenario
switch (window.scenario) {
    case 1:
    default:
        /*
        window.bikeRoadData['chacaito']['data']['distanceToMe'] = ["2 Km", 2000];
        window.bikeRoadData['ccchacao']['data']['distanceToMe'] = ["1.8 Km", 1800];
        window.bikeRoadData['campoalegre']['data']['distanceToMe'] = ["1.6 Km", 1700];
        window.bikeRoadData['ccsanignacio']['data']['distanceToMe'] = ["450 m", 450];
        window.bikeRoadData['chacao']['data']['distanceToMe'] = ["700 m", 700];
        window.bikeRoadData['bellocampo']['data']['distanceToMe'] = ["800 m", 800];
        window.bikeRoadData['lacastellana']['data']['distanceToMe'] = ["120 m", 120];
        window.bikeRoadData['plazaaltamira']['data']['distanceToMe'] = ["400 m", 300];;
        window.bikeRoadData['altamira']['data']['distanceToMe'] = ["150 m", 150];
        window.bikeRoadData['plazapalosgrandes']['data']['distanceToMe'] = ["1 Km", 1000];
        window.bikeRoadData['parquedeleste']['data']['distanceToMe'] = ["2.2 Km", 2200];
        */

        break;

    case 2:

        break;

    case 3:
        break;
}



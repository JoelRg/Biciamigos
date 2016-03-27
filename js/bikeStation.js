/**
 * bikeStation
 */
function bikeStation(data, map) {

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
    this._availableBikes = 0;
    this._freeDocks      = 0;
    this._totalBikes     = 0


    this._construct(data, map);
}


/**
 * Constructor
 */
bikeStation.prototype._construct = function(data, map) {
    var thisO = this;

    thisO._map = map;

    thisO.init(data);
}


/**
 * Inicializa el objeto
 */
bikeStation.prototype.init = function(data) {
    var thisO = this;

    // Selectores y posicionamiento de los elementos
    // en cada mapa segun el zoom
    $.each(thisO._map._zoomLevels, function(index, zoom) {

        var idDiv = "bks-"+ data.id +"-"+ zoom;
        $(thisO._map._mapObjectContainerObjectList[zoom])
            .append("<div id='"+ idDiv +"' class='bike-station'></div>");

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
    thisO._availableBikes = data.data.availableBikes;
    thisO._freeDocks = data.data.freeDocks;
    thisO._totalBikes = thisO._availableBikes + thisO._freeDocks;


    // Inicializa eventos
    thisO._initEvents();

    // Muestra para todos los niveles de zoom
    thisO.show();
}


/**
 *
 */
bikeStation.prototype._initEvents = function() {
    var thisO = this;

    // Tooltip para cada zoom
    $.each(thisO._map._zoomLevels, function(index, zoom) {

        var text = "<div class='bikestation-tooltip-text "+ thisO._id +"' data-bksid='"+ thisO._id +"'>"
                 + "  <div class='name'>"+ thisO._name +"</div>"
                 + "  <table class='data'>"
                 + "     <tr><td>Bicicletas:</td><td class='number'>"+ thisO._availableBikes +"</td></tr>"
                 + "     <tr><td>Puestos libres:</td><td class='number'>"+ thisO._freeDocks +"</td></tr>"
                 + "  </table>"
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
            //hideOnClickOutside : true,
            //hideOthers: true,
            maxWidth: 300,
            showOn: 'click',
            size: size,
            //target: 'mouse',
            zIndex: 900
        });


        /*
        thisO._objects[zoom].on('click', function(){

            var $tooltips = $(".bikestation-tooltip-text", thisO._map._mapObjectContainerObjectList[zoom]);
            $.each($tooltips, function(index, bksTooltip)) {

                var dataId = bksTooltip.attr('data-bksid');
                if (thisO._id != dataId) {

                    if (bksTooltip.is(":visible")) {
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
bikeStation.prototype.show = function(zoom, showTooltip) {
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
bikeStation.prototype.hide = function(zoom) {
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
bikeStation.prototype.getCoordinates = function(zoom) {
    var thisO = this;

    return [thisO._coordinates[zoom][0], thisO._coordinates[zoom][1]];
}


/**
 * Forza a que se muestre el tooltip
 */
bikeStation.prototype.showTooltip = function(zoom) {
    var thisO = this;

    if (!zoom) {

        $.each(thisO._map._zoomLevels, function(index, zoom) {

            //console.log(thisO._id, $(".bikestation-tooltip-text."+ thisO._id).is(":visible"));
            if (!$(".bikestation-tooltip-text."+ thisO._id).is(":visible")) {
                thisO._objects[zoom].trigger('click');
            }
        });

    } else {

        //console.log(thisO._id, $(".bikestation-tooltip-text."+ thisO._id).is(":visible"));
        if (!$(".bikestation-tooltip-text."+ thisO._id).is(":visible")) {
            thisO._objects[zoom].trigger('click');
        }
    }
}


/**
 * Forza a que se oculte el tooltip
 */
bikeStation.prototype.hideTooltip = function(zoom) {
    var thisO = this;

    if (!zoom) {

        $.each(thisO._map._zoomLevels, function(index, zoom) {

            if ($(".bikestation-tooltip-text."+ thisO._id).is(":visible")) {
                thisO._objects[zoom].trigger('click');
            }
        });

    } else {

        if ($(".bikestation-tooltip-text."+ thisO._id).is(":visible")) {
            thisO._objects[zoom].trigger('click');
        }
    }
}


/**
 *
 */
bikeStation.prototype.dim = function(zoom) {
    var thisO = this;

    $.each(thisO._map._zoomLevels, function(index, zoom) {
        thisO._objects[zoom].css({opacity: '0.5'});
    });
}

/**
 *
 */
bikeStation.prototype.undim = function(zoom) {
    var thisO = this;

    $.each(thisO._map._zoomLevels, function(index, zoom) {
        thisO._objects[zoom].css({opacity: '1'});
    });
}



// Data de estaciones
// Datos comunes y escenario default
window.bikeStationData = {
    'chacaito' : {
        'id' : 'chacaito',
        'name' : 'Chacaito',
        'coordinates' : {
            14 : [12, 383],
            15 : [134, 438],
            16 : [315, 669],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'ccchacao' : {
        'id' : 'ccchacao',
        'name' : 'C. Cultural Chacao',
        'coordinates' : {
            14 : [57, 393],
            15 : [246, 451],
            16 : [526, 696],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'campoalegre' : {
        'id' : 'campoalegre',
        'name' : 'Campo Alegre',
        'coordinates' : {
            14 : [84, 350],
            15 : [295, 367],
            16 : [615, 530],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'ccsanignacio' : {
        'id' : 'ccsanignacio',
        'name' : 'CC. San Ignacio',
        'coordinates' : {
            14 : [136, 311],
            15 : [388, 294],
            16 : [820, 382],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'chacao' : {
        'id' : 'chacao',
        'name' : 'Chacao',
        'coordinates' : {
            14 : [143, 371],
            15 : [410, 412],
            16 : [860, 617],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'bellocampo' : {
        'id' : 'bellocampo',
        'name' : 'Bello Campo',
        'coordinates' : {
            14 : [191, 379],
            15 : [510, 438],
            16 : [1060, 683],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'lacastellana' : {
        'id' : 'lacastellana',
        'name' : 'La Castellana',
        'coordinates' : {
            14 : [193, 309],
            15 : [503, 286],
            16 : [1040, 365],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'plazaaltamira' : {
        'id' : 'plazaaltamira',
        'name' : 'Plaza Altamira',
        'coordinates' : {
            14 : [244, 334],
            15 : [603, 332],
            16 : [1235, 462],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'altamira' : {
        'id' : 'altamira',
        'name' : 'Altamira',
        'coordinates' : {
            14 : [205, 237],
            15 : [531, 153],
            16 : [1106, 113],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'bottom'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'plazapalosgrandes' : {
        'id' : 'plazapalosgrandes',
        'name' : 'Plaza Los Palos Grandes',
        'coordinates' : {
            14 : [281, 272],
            15 : [691, 211],
            16 : [1427, 221],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    },
    'parquedeleste' : {
        'id' : 'parquedeleste',
        'name' : 'Parque Del Este',
        'coordinates' : {
            14 : [308, 316],
            15 : [738, 297],
            16 : [1515, 389],
        },
        'tooltip': {
            14 : 'top',
            15 : 'top',
            16 : 'top'
        },
        'data' : {
            'availableBikes' : 10,
            'freeDocks' : 20,
        }
    }
}


// Datos segun el escenario
switch (window.scenario) {
    case 1:
    default:
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

        //filter: grayscale(1) blur(0px);

        break;

    case 2:

        break;

    case 3:
        break;
}



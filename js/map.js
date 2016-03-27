/**
 * map
 */
function map(config) {

    this._object = null;

    this._targetId = "#map";

    // Targets de las imagenes
    this._mapImageTargetIds = {
        14 : "#map .map-zoom-14",
        15 : "#map .map-zoom-15",
        16 : "#map .map-zoom-16"
    };

    this._mapImageObjectList = {
        14 : null,
        15 : null,
        16 : null
    };


    // Targets de los contenedores de los
    // elementos que van dentro del mapa
    this._mapObjectContainerTargetIds = {
        14 : "#map .map-zoom-14 .map",
        15 : "#map .map-zoom-15 .map",
        16 : "#map .map-zoom-16 .map"
    };

    this._mapObjectContainerObjectList = {
        14 : null,
        15 : null,
        16 : null
    };


    // Niveles de zoom. Default: 16
    this._zoomLevels = [14, 15, 16];

    // Zoom actual
    this._currentZoomLevel = 16;

    // Zoom default
    this._defaultZoomLevel = 16;

    // Coordenadas posicion actual. Default para zoom 16: [979, 255]
    this._currenPosition = {
        14: [177, 279],
        15: [470, 230],
        16: [979, 255],
    };

    // Medidas mapas, desplazamiento maximo y viewport
    this._mapSizes = {
        14 : [370, 700],
        15 : [1000, 700],
        16 : [1980, 1108],
    };

    this._mapMovements = {
        14 : {left: [10, 0], top: [60, 0]},
        15 : {left: [640, 0], top: [60, 0]},
        16 : {left: [1620, 0], top: [468, 0]},
    };

    this._viewport = [360, 640];

    // Ubicacion actual
    this._currenPositionPointerClass = '.current-position';

    // Boton para centrar en posicion actual
    this._centerOnCurrentPositionButtonClass = ".center-current-position";

    // Botones zoom
    this._zoomInClass  = ".zoom-in";
    this._zoomOutClass = ".zoom-out";


    // Lista de objetos Estaciones
    this._bikeStationsList = {};

    // Lista de objetos Ciclovias
    this._bikeRoadsList = {};

    // Lista de objetos Resultados de busqueda
    this._searchResultsList = {};


    // Datos enviados en inicializacion
    this._rawConfig = null;


    this._construct(config);
}


/**
 * Constructor
 */
map.prototype._construct = function(config) {
    var thisO = this;

    // Guarda configuracion enviada
    thisO._rawConfig = config;
}


/**
 * Inicializa el objeto
 */
map.prototype.init = function() {
    var thisO = this;

    // Selectores
    thisO._object = $(thisO._targetId);

    // Selectores mapas segun zoom
    $.each(thisO._mapImageTargetIds, function(zoomLevel, targetId) {
        thisO._mapImageObjectList[zoomLevel] = $(targetId);
    });

    $.each(thisO._mapObjectContainerTargetIds, function(zoomLevel, targetId) {
        thisO._mapObjectContainerObjectList[zoomLevel] = $(targetId);
    });


    // Inicializa ubicacion actual
    thisO._initCurrenPosition();

    // Inicializa, posiciona y muestra estaciones
    thisO._initBikeStations();

    // Inicializa y posiciona ciclovias
    thisO._initBikeRoads();

    // Busqueda
    //thisO._initSearchResultList();


    // Inicializa eventos
    thisO._initEvents();


    // Centra en la posicion actual
    // y muestra el mapa default
    thisO.centerOnCurrentPosition(thisO._defaultZoomLevel, function(){
        thisO._object.removeClass('no-display');

        $(thisO._zoomInClass).addClass('dimmed');
        thisO.show(thisO._defaultZoomLevel);
    });

    // Centra en los otros zooms de una vez
    thisO.centerOnCurrentPosition(14);
    thisO.centerOnCurrentPosition(15);
}


/**
 *
 */
map.prototype._initEvents = function() {
    var thisO = this;

    // Inicializa eventos draggable
    $.each(thisO._mapObjectContainerObjectList, function(zoomLevel, $map) {

        $map.draggable({containment: thisO._mapImageTargetIds[zoomLevel], scroll: false});
        //console.log('map ', zoomLevel, $map);
    });


    // Centrar en posicion actual
    $(thisO._centerOnCurrentPositionButtonClass).on('click', function(e){
        e.preventDefault();

        window.hideAllButMap();
        thisO.centerOnCurrentPosition(null, function(){

            // Animacion para mostrar una especie de blink
            // a la ubicacion actual
            $(thisO._currenPositionPointerClass)
                .removeClass('blinkOff')
                .addClass('blinkOn');

            setTimeout(function(){
                $(thisO._currenPositionPointerClass)
                    .removeClass('blinkOn')
                    .addClass('blinkOff');

                setTimeout(function(){
                    $(thisO._currenPositionPointerClass)
                        .removeClass('blinkOff');
                }, 600);

            }, 400);

        });
    });


    // Botones zoom
    $(thisO._zoomInClass).on('click', function(e){
        e.preventDefault();

        var zoom = thisO._currentZoomLevel + 1;
        zoom = zoom <= 16 ? zoom : 16;

        $(thisO._zoomOutClass).removeClass('dimmed');
        if (zoom == 16) {
            $(this).addClass('dimmed');
        }

        thisO.show(zoom, 'zoom-in');
    });

    $(thisO._zoomOutClass).on('click', function(e){
        e.preventDefault();

        var zoom = thisO._currentZoomLevel - 1;
        zoom = zoom >= 14 ? zoom : 14;

        $(thisO._zoomInClass).removeClass('dimmed');
        if (zoom == 14) {
            $(this).addClass('dimmed');
        }

        thisO.show(zoom, 'zoom-out');
    });
}



/**
 * Muestra el mapa con el zoom indicado
 *
 * Si no se indica ningun zoom, se muestra el mapa del zoom default
 */
map.prototype.show = function(zoomLevel, zoomEffect) {
    var thisO = this;

    zoomLevel = (14 <= zoomLevel && zoomLevel <= 16) ? zoomLevel : thisO._defaultZoomLevel;

    if (!zoomEffect) {
        // Aparicion normal sin efecto

        $.each(thisO._zoomLevels, function(index, zoom) {

            if (zoomLevel != zoom) {
                thisO._mapImageObjectList[zoom].hide();

            } else {

                thisO._currentZoomLevel = zoom;
                thisO._mapImageObjectList[zoom]
                    .addClass('onTop')
                    .fadeIn('slow');
                    //.show();
            }
        });

    } else if (zoomEffect == 'zoom-in') {

        // Zoom anterior
        var oldZoom = zoomLevel - 1;

        $.each(thisO._zoomLevels, function(index, zoom) {

            if (zoomLevel != zoom && oldZoom != zoom) {
                // Oculta 3er zoom
                thisO._mapImageObjectList[zoom].hide();

            } else if (oldZoom == zoom) {

                // Prepara a mostrar el mapa con el nuevo zoom
                // y hace zoom-in al mapa con el zoom viejo
                thisO._mapImageObjectList[zoomLevel].show();
                thisO._mapImageObjectList[zoom].addClass('map-zoom-in');

                // Espera un poco de tiempo para mostrar el nuevo zoom
                setTimeout(function(){

                    thisO._mapImageObjectList[zoom]
                        .hide()
                        .removeClass('onTop')
                        .removeClass('map-zoom-in');

                    thisO._currentZoomLevel = zoomLevel;
                    thisO._mapImageObjectList[zoomLevel].addClass('onTop');

                }, 600);

            }
        });

    } else if (zoomEffect == 'zoom-out') {

        // Zoom anterior
        var oldZoom = zoomLevel + 1;

        $.each(thisO._zoomLevels, function(index, zoom) {

            if (zoomLevel != zoom && oldZoom != zoom) {
                // Oculta 3er zoom
                thisO._mapImageObjectList[zoom].hide();

            } else if (oldZoom == zoom) {

                // Prepara a mostrar el mapa con el nuevo zoom
                // y hace zoom-out al mapa con el zoom viejo
                thisO._mapImageObjectList[zoomLevel].show();
                thisO._mapImageObjectList[zoom].addClass('map-zoom-out');

                // Espera un poco de tiempo para mostrar el nuevo zoom
                setTimeout(function(){

                    thisO._mapImageObjectList[zoom]
                        .hide()
                        .removeClass('onTop')
                        .removeClass('map-zoom-out');

                    thisO._currentZoomLevel = zoomLevel;
                    thisO._mapImageObjectList[zoomLevel].addClass('onTop');

                }, 600);

            }
        });
    }

    //console.log('map show: current:', zoomLevel, ', old: ', oldZoom, ', effect: ', zoomEffect);

}


/**
 *
 */
map.prototype.centerOnCurrentPosition = function(zoom, callBack) {
    var thisO = this;

    if (!zoom) {
        // Todos los zoom

        $.each(thisO._zoomLevels, function(index, zoom) {

            thisO.centerOnPosition(
                thisO._currenPosition[zoom][0],
                thisO._currenPosition[zoom][1],
                zoom,
                ($(thisO._currenPositionPointerClass, thisO._mapObjectContainerObjectList[zoom]).visible() ? 300 : 600),
                callBack
            );
        });

    } else {
        // Zoom indicado

        thisO.centerOnPosition(
            thisO._currenPosition[zoom][0],
            thisO._currenPosition[zoom][1],
            zoom,
            ($(thisO._currenPositionPointerClass, thisO._mapObjectContainerObjectList[zoom]).visible() ? 300 : 600),
            callBack
        );
    }

}


/**
 *
 */
map.prototype.centerOnBikeStation = function(bikeStationId, callBack) {
    var thisO = this;

    var bikeStation = null;
    $.each(thisO._bikeStationsList, function(bksId, bks) {
        if (bksId == bikeStationId) {
            bikeStation = bks;
        }
    });

    if (!bikeStation) {
        return;
    }


    $.each(thisO._zoomLevels, function(index, zoom) {

        var coordinates = bikeStation.getCoordinates(zoom);
        thisO.centerOnPosition(
            coordinates[0],
            coordinates[1],
            zoom,
            ($("#bks-"+ bikeStationId +"-"+ zoom, thisO._mapObjectContainerObjectList[zoom]).visible() ? 300 : 600),
            function() {
                bikeStation.showTooltip(zoom);
                callBack && callback();
            }
        );
    });
}


/**
 *
 */
map.prototype.centerOnBikeRoad = function(bikeRoadId, callBack) {
    var thisO = this;

    var bikeRoad = null;
    $.each(thisO._bikeRoadsList, function(bkrId, bkr) {
        if (bkrId == bikeRoadId) {
            bikeRoad = bkr;
        }
    });

    if (!bikeRoad) {
        return;
    }

    // Muestra la ciclovia
    bikeRoad.show();

    $.each(thisO._zoomLevels, function(index, zoom) {

        // Redondeo a mitad de la ciclovia (aproximadamente)
        var coordinates = bikeRoad.getCoordinates(zoom);
        var $bikeRoad   = bikeRoad._objects[zoom];
        coordinates[0]  = coordinates[0] + parseInt($bikeRoad.css('width'), 10) / 2 - 10;
        coordinates[1]  = coordinates[1] + parseInt($bikeRoad.css('height'), 10) / 2 - 10;

        thisO.centerOnPosition(
            coordinates[0],
            coordinates[1],
            zoom,
            ($("#bkr-"+ bikeRoadId +"-"+ zoom, thisO._mapObjectContainerObjectList[zoom]).visible() ? 300 : 600),
            function() {
                bikeRoad.showTooltip(zoom);
                callBack && callback();
            }
        );
    });
}



/**
 *
 */
map.prototype.centerOnSearchResult = function(searchResultId, callBack) {
    var thisO = this;

    var searchResult = {
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
    };


    // Muestra el resultado busqueda
    $('#sambil').show();
    $('#endPointer').show();

    $.each(thisO._zoomLevels, function(index, zoom) {

        // Redondeo a mitad de la ciclovia (aproximadamente)
        var coordinates = searchResult.coordinates[zoom]
        //var $bikeRoad   = bikeRoad._objects[zoom];
        coordinates[0]  = coordinates[0] + parseInt(175, 10) / 2 - 10;
        coordinates[1]  = coordinates[1] + parseInt(447, 10) / 2 - 10;

        thisO.centerOnPosition(
            coordinates[0],
            coordinates[1],
            zoom,
            //($("#bkr-"+ bikeRoadId +"-"+ zoom, thisO._mapObjectContainerObjectList[zoom]).visible() ? 300 : 600),
            600,
            function() {
                //bikeRoad.showTooltip(zoom);

                callBack && callback();
            }
        );
    });
}


/**
 *
 */
map.prototype.centerOnPosition = function(left, top, zoom, duration, callBack) {
    var thisO = this;

    var zoom = zoom ? zoom : thisO._currentZoomLevel;

    // Calcula el nuevo left lo mas centrado posible que se pueda
    var mostLeft = thisO._mapMovements[zoom].left[0];
    var lessLeft = thisO._mapMovements[zoom].left[1];

    var newLeft = mostLeft - left + (thisO._viewport[0] / 2);
    if (newLeft > mostLeft) {
        newLeft = mostLeft;
    }
    if (newLeft < lessLeft) {
        newLeft = lessLeft;
    }


    // Calcula el nuevo top lo mas centrado posible que se pueda
    var mostTop = thisO._mapMovements[zoom].top[0];
    var lessTop = thisO._mapMovements[zoom].top[1];

    var newTop = mostTop - top + (thisO._viewport[1] / 2);
    if (newTop > mostTop) {
        newTop = mostTop;
    }
    if (newTop < lessTop) {
        newTop = lessTop;
    }


    // Asigna las nuevas posiciones con animacion
    var duration = duration ? duration : 300;
    thisO._mapObjectContainerObjectList[zoom]
        .animate({"left": newLeft +"px", "top": newTop +"px"}, duration, function(){

            console.log('zoom: ', zoom,
                ', centrado en: calculated('+ newLeft +', '+ newTop +') <--> original('+ left +', '+ top +')',
                ', duration: ', duration);

            // Ejecuta callback luego de terminar la animacion
            callBack && callBack();
        });
}



/**
 * Inicializa ubicacion actual
 */
map.prototype._initCurrenPosition = function() {
    var thisO = this;

    // Asigna datos ubicacion actual si son enviados
    if (thisO._rawConfig.currenPosition) {
        thisO._currenPosition = thisO._rawConfig.currenPosition;
    }

    // Inserta en el mapa los pointers de ubicacion actual
    var pointer = "<div class='"+ thisO._currenPositionPointerClass.substring(1) +"'></div>";
    $.each(thisO._zoomLevels, function(index, zoom) {

        thisO._mapObjectContainerObjectList[zoom]
            .append(pointer);

        $(thisO._currenPositionPointerClass, thisO._mapObjectContainerObjectList[zoom])
            .css({left: thisO._currenPosition[zoom][0], top: thisO._currenPosition[zoom][1]});
    });
}



/**
 * Inicializa las estaciones
 */
map.prototype._initBikeStations = function() {
    var thisO = this;

    var bikeStationsRaw = thisO._rawConfig.bikeStations;
    $.each(bikeStationsRaw, function(bikeStationId, bikeStationData) {
        thisO._bikeStationsList[bikeStationId] = new bikeStation(bikeStationData, thisO);
    });
}


/**
 * Muestra todas las estaciones para todos los zoom
 * o para un zoom especificado
 */
map.prototype.showBikeStations = function(zoom) {
    var thisO = this;

    $.each(thisO._bikeStationsList, function(bikeStationId, bikeStation) {
        bikeStation.show(zoom);
    });
}


/**
 * Muestra la estacion con id indicado
 * para todos los zoom o para un zoom especificado
 */
map.prototype.showBikeStationById = function(bksId, zoom, showTooltip) {
    var thisO = this;

    $.each(thisO._bikeStationsList, function(bikeStationId, bikeStation) {
        if (bksId == bikeStationId) {
            bikeStation.show(zoom, showTooltip);
        }
    });
}


/**
 * Oculta todas las estaciones para todos los zoom
 * o para un zoom especificado
 */
map.prototype.hideBikeStations = function(zoom) {
    var thisO = this;

    $.each(thisO._bikeStationsList, function(bikeStationId, bikeStation) {
        bikeStation.hide(zoom);
    })
}


/**
 * Oculta la estacion con id indicado
 * para todos los zoom o para un zoom especificado
 */
map.prototype.hideBikeStationById = function(bksId, zoom) {
    var thisO = this;

    $.each(thisO._bikeStationsList, function(bikeStationId, bikeStation) {
        if (bksId == bikeStationId) {
            bikeStation.hide(zoom);
        }
    });
}


/**
 *
 */
map.prototype.hideBikeStationsTooltips = function(zoom) {
    var thisO = this;

    $.each(thisO._bikeStationsList, function(bikeStationId, bikeStation) {
        bikeStation.hideTooltip(zoom);
    })
}


/**
 *
 */
map.prototype.dimBikeStations = function(zoom, excludeList) {
    var thisO = this;

    $.each(thisO._bikeStationsList, function(bikeStationId, bikeStation) {

        if (excludeList && excludeList.indexOf(bikeStationId) >= 0) {
            return true;
        }

        bikeStation.dim(zoom);
    })
}

/**
 *
 */
map.prototype.undimBikeStations = function(zoom, excludeList) {
    var thisO = this;

    $.each(thisO._bikeStationsList, function(bikeStationId, bikeStation) {

        if (excludeList && excludeList.indexOf(bikeStationId) >= 0) {
            return true;
        }

        bikeStation.undim(zoom);
    })
}



/**
 * Inicializa las ciclovias
 */
map.prototype._initBikeRoads = function() {
    var thisO = this;

    var bikeRoadsRaw = thisO._rawConfig.bikeRoads;
    $.each(bikeRoadsRaw, function(bikeRoadId, bikeRoadData) {
        thisO._bikeRoadsList[bikeRoadId] = new bikeRoad(bikeRoadData, thisO);
    });
}


/**
 * Muestra todas las ciclovias para todos los zoom
 * o para un zoom especificado
 */
map.prototype.showBikeRoads = function(zoom) {
    var thisO = this;

    $.each(thisO._bikeRoadsList, function(bikeRoadId, bikeRoad) {
        bikeRoad.show(zoom);
    });
}


/**
 * Muestra la ciclovia con id indicado
 * para todos los zoom o para un zoom especificado
 */
map.prototype.showBikeRoadById = function(bkrId, zoom, showTooltip) {
    var thisO = this;

    $.each(thisO._bikeRoadsList, function(bikeRoadId, bikeRoad) {
        if (bkrId == bikeRoadId) {
            bikeRoad.show(zoom, showTooltip);
        }
    });
}


/**
 * Oculta todas las ciclovias para todos los zoom
 * o para un zoom especificado
 */
map.prototype.hideBikeRoads = function(zoom) {
    var thisO = this;

    if (window.bikeRoadsSection._showAlways) {
        return;
    }

    $.each(thisO._bikeRoadsList, function(bikeRoadId, bikeRoad) {
        bikeRoad.hide(zoom);
    })
}


/**
 * Oculta la ciclovia con id indicado
 * para todos los zoom o para un zoom especificado
 */
map.prototype.hideBikeRoadById = function(bkrId, zoom) {
    var thisO = this;

    $.each(thisO._bikeRoadsList, function(bikeRoadId, bikeRoad) {
        if (bkrId == bikeRoadId) {
            bikeRoad.hide(zoom);
        }
    });
}


/**
 *
 */
map.prototype.hideBikeRoadsTooltips = function(zoom) {
    var thisO = this;

    $.each(thisO._bikeRoadsList, function(bikeRoadId, bikeRoad) {
        bikeRoad.hideTooltip(zoom);
    })
}



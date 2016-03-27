// Objetos globales
var navTop = new navTop();
var navBottom = new navBottom();
var menuSidebar = new menuSidebar();
var map = new map({
    bikeStations  : window.bikeStationData,
    bikeRoads     : window.bikeRoadData,
    searchResults : window.searchData,
});
var bikeStationsSection = new bikeStationsSection(window.bikeStationData);
var bikeRoadsSection = new bikeRoadsSection(window.bikeRoadData);
var historySection = new historySection(window.historyData);
var aboutSection = new aboutSection();
var searchSection = new searchSection(window.searchData);
var reportsSection = new reportsSection(window.reportsData);
var addReportsSection = new addReportsSection();
var detailReportsSection = new detailReportsSection();


// Acciones cuando se haya cargado el DOM
$(document).ready(function(){

    initHomeAndLoader();
});


/**
 * Inicializa home y loader
 */
var intervalId;
function initHomeAndLoader() {

    // Oculta la pagina home, muestra la de carga,
    // y luego muestra el home de la app
    $('#init-phone .app-icon').on('click', function(){

        $('#init-phone')
            .animate({"left": "-=360px"}, 600, function(){
                $(this).hide();

                $('#loading-app')
                    .removeClass('no-display')
                    .show();
            });


        // Interval para cargar el loader progresivamente
        intervalId = setInterval(loadingLoader, 200);
    });

}


/**
 * Carga paulatinamente el loader
 */
var percent = 10;
function loadingLoader() {

    percent += 10;

    if (percent > 100) {
        // El loader ya cargo 100%

        clearInterval(intervalId);

        $('#loading-app')
            .animate({"left": "-=360px"}, 600, function(){

                $(this).hide();

                // Inicializa la app
                initApp();
            });

        return;
    }

    $('#loading-loader .progress-bar').width(percent +"%");
}


/**
 * Inicializa la app
 */
function initApp() {

    navTop.init();
    navBottom.init();
    menuSidebar.init();
    map.init();
    bikeStationsSection.init();
    bikeRoadsSection.init();
    searchSection.init();
    historySection.init()
    aboutSection.init();
    reportsSection.init();
    addReportsSection.init();
    detailReportsSection.init();

    // Keyboard global
    jsKeyboard.init("virtualKeyboard");
    jsKeyboard.currentElement = $('#search-to');
    jsKeyboard.currentElement = $('#asunto');
    jsKeyboard.currentElement = $('#descripcion');
    jsKeyboard.currentElementCursorPosition = 0;
}


function hideAll() {

    navTop.hide('slide-up');
    map.hideBikeStationsTooltips();
    map.hideBikeRoads();
    //map.undimBikeStations();
    bikeStationsSection.hide();
    bikeRoadsSection.hide();
    searchSection.hide();
    historySection.hide();
    aboutSection.hide();
    reportsSection.hide();
    addReportsSection.hide();
    detailReportsSection.hide();

}


function hideAllButMap() {

    navTop.show('slide-down');
    map.hideBikeStationsTooltips();
    map.hideBikeRoads();
    //map.undimBikeStations();
    bikeStationsSection.hide();
    bikeRoadsSection.hide();
    searchSection.hide();
    historySection.hide();
    aboutSection.hide();
    reportsSection.hide();
    addReportsSection.hide();
    detailReportsSection.hide();
}

/*
* js/main.js
*/
(() => {
  'use strict';
  // laad modules met requirejs
  requirejs([
    // tools/helpers
    'lib/xhr', // XMLHttpRequest
    'lib/dom', // DOM bewerkingen
    'lib/form', // Formulieren
    'lib/page', // Pagina
    'lib/date', // Datum
    'lib/utils', // Utilities
    'lib/events', // Events
    'lib/actions', // Acties
    'lib/template', // Sjablonen
    // classes
    'class/Dashboard',
    'class/Opdracht',
    'class/Project',
    'class/Notitie',
    'class/Team',
    'class/Data',
    'class/API',
    // pagina's
    'page/dashboard',
    'page/opdrachten',
    'page/projecten',
    'page/notities',
    'page/team',
    'page/data'

  ], () => { // callback requirejs

    $clickEvent( () => {

      // console.log( $callback );
    });

    $pageData( [ 'notities', 'projecten' ] );

    $searchEvent();

    const _jQuery = $utilCheck_jQuery(); // jQuery?
    if( _jQuery ){

    } else {

    }



  }); // requirejs([], () => {

})(); //(() => { (main)

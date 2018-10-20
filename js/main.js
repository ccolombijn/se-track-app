(() => { // main
  'use strict';
  // laad modules met requirejs
  requirejs([
    'lib/xhr', // XMLHttpRequest
    'lib/dom', // DOM bewerkingen
    'lib/form', // Formulieren
    'lib/page', // Pagina
    'lib/date', // Datum
    'lib/utils', // Utilities
    'lib/events', // Events
    'lib/actions', // Acties
    'lib/template', // Sjablonen
    //'lib/LocalDB', // LocalDB.js http://agnostic.github.io/LocalDB.js/;
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
      // a.nav-link is aangeklikt en pagina is geladen;
      console.log( $callback );
    });
    $searchEvent();

    $setMainData();

    const _jQuery = $utilCheck_jQuery(); // jQuery?
    if( _jQuery ){

    } else {

    }



  }); // requirejs([], () => {

})(); //(() => { (main)

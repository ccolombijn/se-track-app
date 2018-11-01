/*
* js/main.js
*/
(() => {
  'use strict';
  // laad modules met requirejs
  requirejs([
    /*
    'lib/v2/utils',
    'lib/v2/events',
    'lib/v2/actions',
    'lib/v2/tools',
    'lib/v2/globs'
    */
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
    'lib/globals', // Globals
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
    let pages = [ 'notities', 'projecten' ];
    /*
    $glob( '$pages','notities', () => {
      $_Notities();
    });

    $glob( '$pages','projecten', () => {
      $_Projecten();
    });
    */
    //
    $clickEvent( () => { // -> lib/events

    });
    /*
    $clickEvent([
      { '.nav-link' : (() => {
        // reset .nav-link
        for( let nav_link of nav_links ) nav_link.setAttribute( 'class', 'nav-link' );
        // voeg .action toe bij huidig aangeklikte nav-link
        nav_link.setAttribute( 'class', 'nav-link active' );
        // page_id op basis van locatie na #
        let page_id = nav_link_href === '#' ? 'dashboard' : nav_link_href.slice(1);
        $pageView( page_id );
        })
      },{ '.settings' : (() => {
          settings();
        })
      }
    ]);

    $clickEvent([{ element: [target] , action : (() =>{})}])
    */

    $pageData( pages ); // data-[page] attribute main -> lib/page

    $searchEvent(); // zoekfunctie (invoerveld ) -> lib/events

    const _jQuery = $utilCheck_jQuery(); // jQuery check -> lib/utils
    if( _jQuery ){

    } else {

    }



  }); // requirejs([], () => {

})(); //(() => { (main)

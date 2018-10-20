'use strict';
/*
* js/lib/events.js
*/
function $clickEvent( callback ) {
  let nav_links = document.querySelectorAll( 'a.nav-link' );
  for( let nav_link of nav_links ) {
    let nav_link_href = nav_link.getAttribute( 'href' );
    nav_link.addEventListener( 'click', ( event ) => {
      for( let nav_link of nav_links ) nav_link.setAttribute( 'class', 'nav-link' );
      nav_link.setAttribute( 'class', 'nav-link active' );
      let page_id = nav_link_href === '#' ? 'dashboard' : nav_link_href.slice(1);
      $pageView( page_id );
      callback();
    });
  }
  let settings_links = document.querySelectorAll( 'a.settings' );
  for( let settings_link of settings_links ) {
    settings_link.addEventListener( 'click', (event) => {
      $settings();
    });
  }
}

function $searchEvent(){
  let search_input = document.querySelector( 'input.search' );
  let search_results_div = document.createElement( 'div' );
  search_results_div.setAttribute( 'class', 'search-results' );
  search_input.addEventListener( 'keyup', ( event ) => {
    let search_query = search_input.value;
    let search_results = [];
    let projecten = $data( 'main', 'projecten' );
    for( let project of projecten ){
      if( new RegExp( search_query ).test( project.name ) ){
        search_results.push( { result: 'projecten',id : project.id, name: project.name }  )
      }
    }
    let notities = $data( 'main', 'notities' );
    for( let notitie of notities ){
      if( new RegExp( search_query ).test( notitie.name ) ){
        search_results.push( { result: 'notities',id : notitie.id, name: notitie.name } )
      }
    }
    console.log( search_results );
  });

}

function $event( trigger, target, callback ){
  let elements = document.querySelectorAll( target );
  for( let element of elements ){
    element.addEventListener( trigger, (event) => {
      callback();
    });
  }
}

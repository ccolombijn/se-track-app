'use strict';
/*
* js/lib/events.js
*/

// click; a.nav-link wordt aangeklikt
// -----------------------------------------------------------------------------
function $clickEvent( callback ) {
  // selecteer .nav-link
  let nav_links = document.querySelectorAll( 'a.nav-link' );
  // loop door geselecteerde elementen
  for( let nav_link of nav_links ) {
    // selecteer href attribute
    let nav_link_href = nav_link.getAttribute( 'href' );
    nav_link.addEventListener( 'click', ( event ) => {
      // reset .nav-link
      for( let nav_link of nav_links ) nav_link.setAttribute( 'class', 'nav-link' );
      // voeg .action toe bij huidig aangeklikte nav-link
      nav_link.setAttribute( 'class', 'nav-link active' );
      // page_id op basis van locatie na #
      let page_id = nav_link_href === '#' ? 'dashboard' : nav_link_href.slice(1);
      $pageView( page_id ); // paginaweergave op basis van page_id
      callback();
    });
  }
  // settings
  let settings_links = document.querySelectorAll( 'a.settings' );
  for( let settings_link of settings_links ) {
    settings_link.addEventListener( 'click', (event) => {
      $settings();
    });
  }
}




// location;   adresbalk (#hash) wordt aangepast (link in pagina)
// -----------------------------------------------------------------------------
function $locationEvent(){

  let location = location.hash.slice(1); // locatie na # in adres

  location_data = $data( 'main', 'location' ); // opgeslagen locatie
  // event; huidige locatie komt niet overeen met opgeslagen locatie
  if( location_data !== location ){
    //  array op basis van #page/action/param
    let location_ = location.split('/'),
    page = location_[0],
    action = location_[1],
    param = location_[2];

    // data
    let data = $data( 'main', page );

    let items = [];
    for( let item in data ){
      items.push( item );
    }
    // object
    let obj = $callObj( page );
    // call
    $pageView( page, () => {

      if( action ) $actionCall( action, obj, data, items );

      $data( 'main', 'location', location ); // locatie opslaan

    });

  }
  // iedere halve seconde controleren of locatie gewijzigd is
  setInterval( $locationEvent() , 500);
}

function $actionCall( action, obj, data, items ){

  switch ( action ) {

    case 'overview':
      $overview( items, data, obj, () => {
        if( $callback.$overview() ) $callback.$overview();
      });
      break;

    case 'add':
      $add( obj, () => {
        if( $callback.$add() ) $callback.$add();
      });
      break;

    case 'view':
      $view( data, obj, () => {
        if( $callback.$view() ) $callback.$view();
      });
      break;

    case 'update':
      $update( obj, data, () => {
        if( $callback.$update() ) $callback.$update();
      });
      break;

    case 'delete':
      $delete( obj, data, () => {
        if( $callback.$delete() ) $callback.$delete();
      });
      break;


  }
}

function $callObj( obj, args ){
  let obj_inst;
  switch (obj) {
    case 'notities':
      obj_inst = new Notitie( args );
      break;
    case 'projecten':
      obj_inst = new Project( args );
      break;
  }
  return obj_inst;

}



// search
// -----------------------------------------------------------------------------
function $searchEvent(){

  let search_input = document.querySelector( 'input.search' );
  let search_results_div = document.createElement( 'div' );
  search_results_div.setAttribute( 'class', 'search-results' );

  search_input.addEventListener( 'keyup', ( event ) => {
    search_results_div.innerHTML = '';
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

    for( let result of search_results ){

      let result_text = result.name;
      result_text.replace( search_query, `<b>${search_query}</b>` );
      let result_element = document.createElement( 'a' );
      result_element.setAttribute( 'href', `#${result.result}/view/${result.id}` );
      result_element.innerHTML = result_text;
      search_results_div.appendChild( result_element );

    }
  });

}

// fetch
// -----------------------------------------------------------------------------
function $fetchEvent( key ){
  //https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
  addEventListener('fetch', event => {

  if (event.request.method != 'GET') return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cache = await caches.open( key );
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      // If we found a match in the cache, return it, but also
      // update the entry in the cache in the background.
      event.waitUntil(cache.add(event.request));
      return cachedResponse;
    }

    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});
}

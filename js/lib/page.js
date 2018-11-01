'use strict';
/*
* js/lib/page.js
*/
let $pages;

function $pageData( pages ){
  for( let page of pages ){
    //$data( 'main', page, '' );
    document.querySelector('main').setAttribute(`data-${page}`,'');
  }

}

function $pageView( page_id ) {

  $loadPage( page_id, () => {
    // callback
    // let page = $pages[ page_id ];
    // page(); 
    switch ( page_id ) {
      case 'notities':
        $_Notities();
        break;
      case 'projecten':
        $_Projecten();
        break;
      }

    });

}
function $loadPage( page_id, callback ){
  $( 'main' ).hide();
  $.ajax( { url: `html/page/${page_id}.html` } ).done( ( response ) => {
    $( 'main' ).html( response );
    $( 'main' ).fadeIn();
    callback();
  });
}



function $settings(){
  console.log('test');
    $( '#settings_modal' ).modal( 'toggle' );
}

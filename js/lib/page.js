'use strict';
function $pageView( page_id ) {
  //let location_hash = location.hash;
  //let page_id = location_hash === '#' ? 'dashboard' : location_hash.slice(1);
  //let page_data = {};
  //let page_content = $getTemplate( `html/page/${page_id}`, page_data );
  //$('main').load({ url: `tmpl/html/page/${page_id}.html` });
  //$setElement( 'div#content', page_content, 'main' );
  $loadPage( page_id, () => {
   switch ( page_id ) {
     case 'notities':
        $_Notities();
        break;
    case 'projecten':
        $_Projecten();
       break;
     default:

   }
 });


}
function $loadPage( page_id, callback ){
  $('main').hide();
  $.ajax({url: `html/page/${page_id}.html`}).done( ( data ) => {
    $('main').html( data );
    $('main').fadeIn();
    callback();
  });
}

function $setMainData(){
  document.querySelector('main').setAttribute('data-notities','');
  document.querySelector('main').setAttribute('data-projecten','');
}

function $settings(){
  console.log('test');
    $( '#settings_modal' ).modal( 'toggle' );
}

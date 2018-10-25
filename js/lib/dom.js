'use strict';
/*
* js/lib/dom.js
*/
// table
// -----------------------------------------------------------------------------
function $tableGrid( target ){

 let table_tds = document.querySelectorAll( `${target} tbody td` );
 for( let table_td of table_tds ){
   table_td.addEventListener( 'click', (event) =>{

     let current_input = document.querySelector( 'td input' );
     if( current_input ){
       let current_input_td = current_input.parentNode;
       let current_input_val = current_input.value;
       current_input_td.innerHTML = current_input_val;
       $tableData( target );

     }

     let target_ = event.target;
     let row_id = target_.parentNode.id;
     let content = target_.innerHTML;
     let input = document.createElement( 'input' );
     input.value = content;
     target_.innerHTML = '';
     target_.appendChild( input );
     input.setAttribute('class', 'form-control');
     input.focus();

   });

 }

}

function $tableData( target ){
 let table = document.querySelector( target );

   let table_thead_ths = document.querySelectorAll( `${target} thead th` );
   let table_tbody_trs = document.querySelectorAll( `${target} tbody tr` );
   let data_array = [];

   for( let table_tbody_tr of table_tbody_trs ){
     let data_item = {};
     let index = 0;
     let table_tbody_tr_id = table_tbody_tr.getAttribute( 'id' );

     let table_tbody_tr_tds = document.querySelectorAll( `#${table_tbody_tr_id} td` )
     data_item[ 'id' ] = table_tbody_tr_id;
     for( let table_thead_th of table_thead_ths ){
       let table_tbody_tr_td_val;
       let table_tbody_tr_td_input = document.querySelector( `#${table_tbody_tr_id} input`);
       if(  table_tbody_tr_td_input ){
         table_tbody_tr_td_val = table_tbody_tr_td_input.value;
       } else {
         table_tbody_tr_td_val = table_tbody_tr_tds[ index ].innerHTML
       }
       data_item[ table_thead_th.innerHTML ] = table_tbody_tr_td_val;
       index++;
     }
     data_array.push( data_item );
   }


   table.setAttribute( 'data-table', JSON.stringify( data_array ) );
   return data_array;


}
// misc
// -----------------------------------------------------------------------------
function $createElement( element ){
  let element_;
  if( element.indexOf( '.' ) > 0 ) element_ = element.split( '.' )[0];
  if( element.indexOf( '#' ) > 0 ) element_ = element.split( '#' )[0];
  let new_element = document.createElement(element_);

  if( element.indexOf( '.' ) > 0 ) new_element.setAttribute( 'class', element.split( '.' )[1] );
  if( element.indexOf( '#' ) > 0 ) new_element.setAttribute( 'id', element.split( '.' )[0].split( '#' )[1] );

  return new_element;

}

function $setElement( element, str, target ) {
  let target_element = document.querySelector( target );
  let element_ = $createElement( element );
  element_.innerHTML = str;
  let _element = $createElement( element );
  _element.appendChild( element_ );
  target_element.innerHTML = _element.innerHTML;
  return target_element;
}

function $setHTML( target, str ) {
  let element = document.querySelector( target );
  element.innerHTML = str;
  return element;
}

function $appendElement( element, str, target ) {
  let new_element = $createElement( element );
  // inhoud van element
  let textnode = document.createTextNode(str);
  // element.innerHTML = str;
  new_element.appendChild(textnode);
  // voeg element toe aaan document in opgegeven doelelement
  document.querySelector(target).appendChild( new_element );
  return new_element;
}

function $queryElement( element, query ) {
  return element.querySelector( query );
}

function $strToElement ( str ) {
  let parser = new DOMParser();
  return parser.parseFromString( str, 'text/xml' );
}





function $alert( type, icon, msg ){
  let info_alert_id = $getRandomInt( 1000, 9999 );
  let info_alert = $( '<div></div>' ).addClass( 'alert alert-' + type) .attr( 'role', 'alert' ).attr( 'id', info_alert_id );
  info_alert.html( `<i class="fas fa-${icon}"></i> ${msg}` );
  $( 'main' ).prepend( info_alert );
  setTimeout( () => {
    info_alert.fadeOut();
    setTimeout( () => { $( '#' + info_alert_id ).remove() } ,1000 );
  }, 5000 );

}

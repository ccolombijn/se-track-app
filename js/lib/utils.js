'use strict';
function $utilCheck_jQuery() {
  let util_check;
  typeof jQuery != 'undefined' ? util_check = false : util_check = true;
  return util_check;
}

function $data( element, name, value ) {
    element = document.querySelector( element );
    if ( value === undefined ){
        value = element.getAttribute( `data-${name}` );
        try{
          return value !== '' ? JSON.parse( value ) : [];
        } catch {
          return value.split(',');
        }

    } else {
        element.setAttribute( `data-${name}`, JSON.stringify( value ) );
    }
}

function $data_update( update_data ){
  let updated_data = [];
  let overview_trs = document.querySelectorAll('.overview tbody tr');
  for( let overview_tr of overview_trs ){
    let data = overview_tr.getAttribute( 'data-item' );
    data = JSON.parse( data );
    //console.log( notitie_data );
    if( update_data.id == data.id ){
      updated_data.push( update_data );
    } else {
      updated_data.push( data );
    }

  }
  return updated_data;
}

function $loop( callback, interval ) {
    return setTimeout( () => {
        callback( () => {
            $loop( callback, interval );
        });
    }, interval);
}
function $getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

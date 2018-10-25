'use strict';
/*
* js/lib/utils.js
*/

function $utilCheck_jQuery( log ) {
  let util_check;
  typeof jQuery != 'undefined' ? util_check = false : util_check = true;
  if (log) {
    if ( util_check ){
      console.info( `jQuery ${jQuery.fn.jquery}` );
    } else {
      console.warn( 'jQuery niet beschikbaar');
    }
  }
  return util_check;
}

function $data( element, name, value ) {
    element = document.querySelector( element );
    if ( value === undefined ){

        value = element.getAttribute( `data-${name}` );
        try{
          if( value ){
            value = JSON.parse( value )
          } else {
            value = [];
          }
          // console.log( value );
          return value;
          //return value !== '' ? JSON.parse( value ) : [];
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

function $event( trigger, target, callback ){
  let elements = document.querySelectorAll( target );
  for( let element of elements ){
    element.addEventListener( trigger, (event) => {
      callback();
    });
  }
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

function $contains( query ) {
  // $contains.call( array, query )
    let findNaN = query !== query;
    let indexOf;

    if( !findNaN && typeof Array.prototype.indexOf === 'function' ) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = (query) => {
            let i = -1, index = -1;

            for( i = 0; i < this.length; i++ ) {
                let item = this[i];

                if( ( findNaN && item !== item ) || item === query ) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call( this, needle ) > -1;
}
// $resizeable
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

function $caller(){
  let caller
  try {
    throw new Error()
  } catch( e ){

    let pattern = /(\w+)@|at (\w+) \(/g
    let stack = e.stack
    let name
    pattern.exec( stack )
    name = pattern.exec( stack )
    caller = name[1] || name[2]
  }
  return caller
}

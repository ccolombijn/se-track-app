'use strict';
/*
* js/lib/xhr.js
*/
function $xhr( type, url, data, callback ) {
  // initieer XMLHttpRequest
  let xhr = new XMLHttpRequest();
  let response;
  xhr.onreadystatechange = () => {
    // geef response terug als verzoek ok is
    if ( xhr.readyState === 4 && xhr.status === 200 ) {
      response = xhr.responseText;

      callback();
    }
  }
  // verzoek openen & verzenden
  xhr.open( type, url, true );
  xhr.send( data );
  return response;

}

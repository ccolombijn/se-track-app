'use strict';
/*
* js/page/notities.js
*/

function $_Notities(){
  let notities = new Notitie;
  let notities_main_data = $data( 'main', 'notities' );
  let notities_overview_items = [ 'name', 'date' ]; // velden in overzicht



  $glob( '$objects' , 'notities', () => {
    let inst_notities = new Notitie;
    return inst_notities;
  });
  /*
  $callback = {
    '$overview': ()=>{
      //console.log( '$overview notities' );
    },
    '$add': ()=>{
      //console.log( '$add notities' );
    },
    '$view': () => {
      //console.log( '$view notities' )
    },
    '$update': ()=> {
      //console.log( '$update notities' )
    },
    '$delete': ()=> {
      //console.log( '$delete notities' )
    }
  }
  */
  $glob( '$callbacks' , '$overview', () => {
    console.log( 'callback $overview')
  });
  $overview( notities_overview_items, notities_main_data, $objects.notities() );

  $add( notities, () => { // actie toevoegen
      // set globals->callbacks->overview
      $glob( '$callbacks', '$overview', ()=>{ // -> lib/globals
        console.log( 'callback $overview in callback $add');
      });

      $overview( notities_overview_items, $data( 'main','notities' ), $objects.notities() );
      let notitie_add_data = $data( '.add_form_container form', 'added' ); // toegevoegde data
      notities = new Notitie( notitie_add_data );

      //console.table( notitie_add_data );
  });

}

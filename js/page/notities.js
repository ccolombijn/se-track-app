'use strict';
/*
* js/page/notities.js
*/

function $_Notities(){
  let notities = new Notitie;
  let notities_main_data = $data( 'main', 'notities' );
  let notities_overview_items = [ 'name', 'date' ]; // velden in overzicht


  $callback = {
    '$overview': ()=>{
    
    },
    '$add': ()=>{

    },
    '$view': () => {

    },
    '$update': ()=> {

    },
    '$delete': ()=> {

    }
  }

  $overview( notities_overview_items, notities_main_data, notities);

  $add( notities, () => { // actie toevoegen
      $overview( notities_overview_items, $data( 'main','notities' ), notities);
      let notitie_add_data = $data( '.add_form_container form', 'added' ); // toegevoegde data
      notities = new Notitie( notitie_add_data );

      console.table( notitie_add_data );
  });

}

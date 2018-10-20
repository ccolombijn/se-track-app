'use strict';
/*
* js/page/notities.js
*/

function $_Notities(){
  let notities = new Notitie;
  let notities_main_data = $data( 'main', 'notities' );
  let notities_overview_items = [ 'name', 'date' ]; // velden in overzicht


  $callback = {
    overview: ()=>{
      console.log( '$overview notities' );
    },
    view: () => {
      let view = $data( '.overview','selected' );
      console.log( `$view notitie ${view.id}` )
    },
    update: ()=> {
      console.log( '$update notities' )
    },
    del: ()=> {
      console.log( '$delete notities' )
    }
  }

  $overview( notities_overview_items, notities_main_data, notities);

  $add( notities, () => { // actie toevoegen
      $overview( notities_overview_items, $data( 'main','notities' ), notities);
      let notitie_add_data = $data( '.add_form_container form', 'added' ); // toegevoegde data
      notities = new Notitie( notitie_add_data );
      console.log( notitie_add_data.id +' added' );
      console.table( notitie_add_data );
  });

}

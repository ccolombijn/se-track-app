'use strict';
/*
* js/lib/actions.js
*/

// add
// -----------------------------------------------------------------------------
function $add( object, callback ){

  let obj_name = object.shortName(),
  full_name = object.fullName();

  // formulier met velden properties class
  let add_form = $buildFormFromObjProps( object,
    '.add_form_container',
    () => {
      $form_select_projecten(); // vervang input projecten met select
      $formInputDateToday(); // datum van vandaag in input.date
      //location.hash = `${obj_name}/add`;

  }); // $buildFormFromObjProps

  $formSubmit( add_form, () => {

    let add_data = $getFormData( add_form ); // haal data uit formulier

    $( '.add_form_container input,.add_form_container textarea' ).val(''); // maak formulier leeg
    $formInputDateToday(); // datum van vandaag in input.date
    $( '.add_form_modal' ).modal( 'toggle' ); // sluit bootstrap modal

    add_data.id = $getRandomInt( 1000, 9999 ); // random getal als id
    $data( '.add_form_container form', 'added', add_data); // form[data-added]
    let current_data = $data( 'main', obj_name );
    current_data.push( add_data );


    $data( 'main', obj_name, current_data );
    $alert( 'success','info-circle', `${full_name} '${add_data.name}' is toegevoegd`);
    //$overview( $data( '.overview', 'items' ), current_data, object );
    callback();



  }); // $formSubmit
  $( '.add_form_modal' ).on('shown', () => {
    $('.view_container').html('');
    location.hash = `${obj_name}/add`;
  }).on('hidden.bs.modal', () =>{
    location.hash = `${obj_name}`;
  });
}



let $callback = {};

// overview
// -----------------------------------------------------------------------------

function $overview( items, data, object, callback, callback_view, callback_update, callback_delete ){

  $overviewTable( '.overview_container', data, items, object)

  $overviewTableActions( object, ()=>{
      //callback();
      if( $callback.overview() ) $callback.overview();
  },() => {
      //callback_view()
      if( $callback.view() ) $callback.view();
  },() =>{
      //callback_update()
      if( $callback.update() ) $callback.update();
  },() =>{
      //callback_delete()
      if( $callback.del() ) $callback.del();
  });


}

function $overviewTable ( target, data, items, object, callback ){

 let overview_table = $( '<table></table>' )
  .addClass( 'table table-striped table-hover overview' )
  .attr( 'data-items', items ),
 overview_table_thead = $( '<thead></thead>' ),
 overview_table_thead_tr = $( '<tr></tr>' );

 for( let item_th of items ){
   overview_table_thead_tr.append( '<th>'+ object.PropertyLabel()[ '_' + item_th ] + '</th>' );
 }

 overview_table_thead.html( overview_table_thead_tr );
 overview_table.append( overview_table_thead );

 let overview_table_tbody = $( '<tbody></tbody>' );

 for( let item of data ){
    let overview_table_tbody_tr = $( '<tr></tr>' ).attr( 'id',item.id ).attr( 'data-item', JSON.stringify( item ) );
    for( let item_td of items ){
      overview_table_tbody_tr.append( `<td class="${item_td}">${item[item_td]}</td>` );
    }
    overview_table_tbody.append( overview_table_tbody_tr );
 }

 overview_table.append(overview_table_tbody);
 data.length > 0 ?  $( target ).html( overview_table ) : $( target).html( '' );
 $overviewTableEvents();
 //callback();
}

function $overviewTableEvents() {

  if ( typeof jQuery != 'undefined' ) {
    // jquery-timeago
    $( 'td.date' ).timeago();
  }
}

function $overviewTableActions( object, callback, callback_view, callback_update, callback_delete ){
  let obj_name = object.shortName();
  let overview_trs = document.querySelectorAll('.overview tbody tr');
  let overview_thead_tr = document.querySelector('.overview thead tr');
  let overview_thead_tr_th = document.createElement( 'th' );
  if (overview_thead_tr ) overview_thead_tr.appendChild( overview_thead_tr_th );
  let action_click = false;
  for( let overview_tr of overview_trs ){
    let overview_tr_td = document.createElement( 'td' );
    overview_tr_td.setAttribute( 'class', 'text-right' );
    overview_tr_td.setAttribute( 'style', 'width:75px;' );

    let item_data = overview_tr.getAttribute( 'data-item' );
    item_data = JSON.parse( item_data );
    let update_action = document.createElement( 'i' );
    update_action.setAttribute( 'class', 'fas fa-edit' );
    update_action.addEventListener( 'click', (event) => {
      action_click = true;
      $update( object, item_data, () =>{
        //$overview( $data( '.overview', 'items' ), $data( 'main', obj_name ), object );
        callback_update();
      });


    });
    overview_tr_td.appendChild( update_action );
    let delete_action = document.createElement( 'i' );
    delete_action.setAttribute( 'class', 'fas fa-times' );
    delete_action.addEventListener( 'click', (event) => {
      action_click = true;
      $delete( object, item_data, () =>{
        //$overview( $data( '.overview', 'items' ), $data( 'main', obj_name ), object );
        callback_delete();
      });


    });
    overview_tr_td.appendChild( delete_action );
    overview_tr.appendChild( overview_tr_td );
    overview_tr.setAttribute( 'class', 'pointer' );
    overview_tr.addEventListener( 'click', (event) => {
      if(!action_click){
        //console.log( 'row_click' );
        $( '.overview tr' ).removeClass( 'active' );
        overview_tr.setAttribute( 'class', 'pointer active' );
        $data( '.overview' ,'selected', item_data );
        $view( $data( '.overview', 'selected' ), object, () =>{
          callback_view();
        });
      }
    });
  }
  callback();

}

// view
// -----------------------------------------------------------------------------
function $view( data, object, callback ){
  let obj_name = object.shortName();
  data[ 'obj_name' ] = obj_name;
  let view_container = $( '.view_container' ).hide();
  $.ajax({ url: `html/page/${obj_name}/view.html` }).done( ( xhr_response ) => {
    for( let data_item in data ){
      xhr_response = xhr_response.replace( new RegExp(`{${data_item}}`, 'g' ), data[ data_item ]);
    }

    view_container.html( xhr_response ).fadeIn();
    location.hash = `${obj_name}/view/${data.id}`;
    callback();
  });
}


// update
// -----------------------------------------------------------------------------
function $update( object, data, callback ){
  let obj_name = object.shortName();
  let full_name = object.fullName();
  let update_form = $buildFormFromObjProps(object,
    '.update_form_container',() => {
      //$form_select_projecten(); // vervang input projecten met select
      for( let item in data ){
        if( data.hasOwnProperty(item) ) {
          //console.log( item + ' : ' + data[ item ] );
          let update_form_input = document.querySelector( '.update_form_container #'+item );
          update_form_input.innerHTML = data[ item ];
          update_form_input.value = data[ item ];
        }
      }
      document.querySelector( '.update_form_modal form button' ).innerHTML = 'Aanpassen';
      let delete_btn = document.createElement( 'button' );
      delete_btn.setAttribute( 'type','button' );
      delete_btn.setAttribute( 'class','btn btn-danger' );
      delete_btn.innerHTML = 'Verwijderen';
      delete_btn.addEventListener( 'click', (event) => {
        $delete( object, data, () => {
          $( '.update_form_modal' ).modal( 'toggle' );
          $overview( $data( '.overview', 'items' ), $data( 'main', obj_name ), object, () =>{
            callback();
          });
        });
      });
      document.querySelector( '.update_form_container form .footer' ).appendChild( delete_btn );
      $( '.update_form_modal' )
        .modal( 'toggle' )
        .on('shown', () => {

        }).on('hidden.bs.modal', () =>{
          location.hash = `${obj_name}`;
        });
        setTimeout( () => {
          $('.view_container').html('');
          location.hash = `${obj_name}/update/${data.id}`;
        } ,500 );
  }); // $buildFormFromObjProps

  $formSubmit( update_form, () => {
    let update_data = $getFormData( update_form); // haal data uit formulier
    let current_data = $data( 'main', obj_name );
    let updated_data = [];
    for( let data_item of current_data ){
      if( update_data.id == data_item.id ) {
        updated_data.push( update_data );
      } else {
        updated_data.push( data_item );
      }
    }
    $data( 'main', obj_name, updated_data );
    $( '.update_form_modal' ).modal( 'toggle' );
    $alert( 'primary','info-circle', `${full_name} '${update_data.name}' is aangepast`);
    $overview( $data( '.overview', 'items' ), updated_data, object );
    location.hash = `${obj_name}`;
    callback();
  });
}


// delete
// -----------------------------------------------------------------------------
function $delete( object, data, callback ){
  let obj_name = object.shortName();
  let full_name = object.fullName();
  let updated_data = [];
  let current_data = $data( 'main', obj_name  );
  for( let data_item of current_data ){

    if( data.id != data_item.id ){
      updated_data.push( data_item );
    }

  }
  console.log( updated_data );
  $data( 'main', obj_name, updated_data  );
  $alert( 'primary','info-circle', `${full_name} '${data.name}' is verwijderd`);
  $overview( $data( '.overview', 'items' ), updated_data, object );
  $('.view_container').html('');
  callback();
}

'use strict';
/*
* js/page/projecten.js
*/
function $_Projecten(){

  let projecten = new Project; // class instantie
  let projecten_main_data = $data( 'main', 'projecten' ); // page data
  let projecten_overview_items = [ 'name', 'date' ]; // kolommen overzicht


  $callback = {
    '$overview': () => {

    },
    '$add': () => {

    },
    '$view': () => {

      $view_notities(); // notities bij project

    },
    '$update': () => {

    },
    '$delete': () => {

    }
  }

  $overview( projecten_overview_items, projecten_main_data, projecten );

  $add( projecten, () => {
    $overview( projecten_overview_items, $data( 'main', 'projecten' ), projecten );
    let project_add_data = $data( '.add_form_container form', 'added' );
    projecten = new Project( project_add_data );
  });
}

function $view_notities(){

  let current_view = $data( '.overview', 'selected' );
  let notities_data = $data( 'main', 'notities' );
  let notities_obj = new Notitie;
  let project_notities = [];

  for( let notitie of notities_data ){
    if( current_view.id == notitie.project ){
      project_notities.push( notitie );
    }
  }

  if( project_notities.length > 0 ){
    $overviewTable( '.notities', project_notities, ['name','date'], notities_obj, () => {
      let notities_header = document.createElement( 'h4' );
      notities_header.innerHTML = `${project_notities.length} notities`;
      let notities = document.querySelector( '.notities' );
      let notities_table = document.querySelector( '.notities table' );
      notities.insertBefore( notities_header, table );
    });
  }
}

function $form_select_projecten( form, id ){

  let projecten = $data( 'main', 'projecten' );

  if( projecten.length > 0 ){
    let select = document.createElement( 'select' );
    select.setAttribute( 'class','form-control' );
    select.id = 'project';
    select.name = 'project';
    let option = document.createElement( 'option' );
    option.innerHTML = '- Selecteer Project -';
    option.value = '';
    select.appendChild( option );

    for( let data_item of projecten ){
      option = document.createElement( 'option' );
      option.value = data_item.id;
      option.innerHTML = data_item.name;

      if( id == option.value ){
        option.setAttribute( 'selected', 'selected' );
      }
      select.appendChild( option );
    }

    let col_inputs = document.querySelectorAll( `${form} .form-group#form-group_project .col-input`);
    for( let col_input of col_inputs ){
      let input = document.getElementById( 'project' );
      //col_input.removeChild( input );
      col_input.innerHTML = '';
      col_input.appendChild( select );
    }

  } else {
    let form_group = document.querySelector( '.form-group#form-group_project' );
    if (form_group) form_group.setAttribute( 'style', 'display:none' );
  }
}

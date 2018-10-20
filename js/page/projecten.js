'use strict';
/*
* js/page/projecten.js
*/
function $_Projecten(){
  let projecten = new Project;
  let projecten_main_data = $data( 'main', 'projecten' );
  let projecten_overview_items = [ 'name', 'date' ];


  $callback = {
    overview: ()=>{
      console.log( '$overview projecten' );
    },
    view: () => {
      console.log( '$view projecten' )
    },
    update: ()=> {
      console.log( '$update projecten' )
    },
    del: ()=> {
      console.log( '$delete projecten' )
    }
  }

  $overview( projecten_overview_items, projecten_main_data, projecten);

  $add( projecten, () => {
    $overview( projecten_overview_items, $data( 'main','projecten' ), projecten);
    let project_add_data = $data( '.add_form_container form', 'added' );
    projecten = new Project( project_add_data );
  });
}

function $form_select_projecten(){

  let form_group = document.querySelector( '.form-group#form-group_project' );
  let input = document.querySelector( '.form-group#form-group_project .col-input input' );
  let select_ = document.querySelector( '.form-group#form-group_project .col-input select' );
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
      if( input ){
        if( input.value == option.value ) option.setAttribute( 'selected', 'selected' );
      }
      select.appendChild( option );
    }

    let col_input = document.querySelector( '.form-group#form-group_project .col-input');
    let placeholder = document.createElement( 'div' );
    placeholder.appendChild( select );

    //if( !select_ ) col_input.removeChild( input );
    //col_input.appendChild( select );
    //col_input.innerHTML = placeholder.innerHTML;
  } else {
    if (form_group) form_group.setAttribute( 'style', 'display:none' );
  }
}

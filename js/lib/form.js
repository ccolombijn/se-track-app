'use strict';
/*
* js/lib/form.js
*/

/*
let object =  new Class;
let options = {
  placeholder : true,
  append: true,
  formgrid: [
    { content: 'firstname-5;preposition-2;lastname-5' },
    { content: 'street-6;housenumber-2;postalcode-4' }
  ]
};
let form = $buildForm ( object, target, options, () => {
  // callback na laden formulier
});
*/

function $buildForm ( object, target, options, callback ){


  let form = $( '<form></form>' ), added = [];
  // http://getbootstrap.com/docs/4.1/components/forms/#form-grid
  // formgrid
  if( options.formgrid ){
    if( options.formgrid.length > 0 ){
      for(let row of options.formgrid ){
        let fields = row.content.split( ';' );
        for( let field of fields ){
          let field_size = field.split( '-' )[1];
          let field_id = field.split( '-' )[0];
          let form_group = $( '<div></div>' ).addClass( `form-group col-md-${field_size}` );
          let input = $( '<input />' ).attr( 'id', field_id ).attr( 'name', field_id );
          let label;
          typeof object.PropertyLabel() !== 'undefined' ? label = object.PropertyLabel()[ field_id ] : label = field_id;
          if( options.placeholder ){ // voeg bij alle velden placeholder toe
            input.attr( 'placeholder', label )
          } else {
            if( row.placeholder ){ // voeg bij velden in deze rij placeholder toe
              input.attr( 'placeholder', label )
            } else if (field.split( '-' )[3] === 'placeholder' ) { // voeg bij enkel veld placeholder toe
              input.attr( 'placeholder', label )
            }
          }
          form.append( form_group);
          added.push( field_id );
        }
      }
    }
  }

  let objPropNames = Object.getOwnPropertyNames( object )
  for( let propName of objPropNames ){
    if( ! $contains.call( added, propName ) ){ // niet toevoegen als item al in formgrid toegevoegd is

      let input = $( '<input />' ).attr( 'id', propName ).attr( 'name', propName );

      if( options.placeholder ){

      } else {

      }

      if( options.append ){

      } else {

      }

    }
  }
  return form
  callback()
}



function $buildFormFromObjProps( object, target, callback, options ) {

  let obj_prop_names = Object.getOwnPropertyNames( object ); // namen properties object
  let form = document.createElement( 'form' ); // formulier element

  for( let prop_name of obj_prop_names ){ // loop door namen properties object

    // Bootstrap form-group row
    let form_group = document.createElement( 'div' );
    form_group.setAttribute( 'class', 'form-group row' );
    form_group.setAttribute( 'id', 'form-group' + prop_name );
    // Bootstrap col-form-label
    let label = document.createElement( 'label' );
    label.setAttribute( 'class', 'col-sm-2 col-form-label' );
    // property naam (gelijk aan 'name' en 'id' attributes input) als 'for' attribute label
    label.setAttribute( 'for', prop_name.slice(1) );



    // haal tekst van label uit getPropertyLabel method van object
    typeof object.PropertyLabel() !== 'undefined' ? label.innerHTML = object.PropertyLabel()[ prop_name ] : label.innerHTML = prop_name;


    // kolom input element
    let col_sm = document.createElement( 'div' );
    col_sm.setAttribute( 'class', 'col-sm-10 col-input' );
    let hidden = false;
    // input element
    let input;
    if( prop_name.indexOf( 'content' ) > 0 ) {
      input = document.createElement( 'textarea' );
      input.setAttribute( 'rows', '5' );
    } else {
      input = document.createElement( 'input' );
    }
    input.setAttribute( 'class', 'form-control' );
    input.setAttribute( 'name', prop_name.slice(1) );
    input.setAttribute( 'id', prop_name.slice(1) );

    // type invoer
    if( prop_name.indexOf( 'date' ) > 0 ) input.setAttribute( 'class', 'form-control date' );
    if( prop_name.indexOf( 'email' ) > 0 ) input.setAttribute( 'class', 'form-control email' );
    if( prop_name.indexOf( 'id' ) > 0 ) { // verberg id
      input.setAttribute( 'type', 'hidden' );
      hidden = true;
    }

    // voeg label/input element toe
    col_sm.appendChild( input );

    form_group.appendChild( label );
    form_group.appendChild( col_sm );
    // verborgen element niet als rij/kolommen toevoegen
    hidden ? form.appendChild( input ) : form.appendChild( form_group );
  }
  // knop t.b.v. toevoegen formulier
  let button = document.createElement( 'button' );
  //voeg  bootstrap btn btn-primary class toe
  button.setAttribute( 'class', 'btn btn-primary' );
  // tekst knop
  if( options ){
    button.innerHTML = options.buttontxt;

  } else {
    button.innerHTML = 'Toevoegen';
  }

  // voeg knop toe aan formulier
  let footer = document.createElement('div');
  footer.setAttribute( 'class', 'footer text-right' );
  footer.appendChild( button );
  form.appendChild( footer );
  // voeg formulier in doelelement
  let placeholder = document.createElement("div");
  placeholder.appendChild( form );
  let target_element = document.querySelector( target );
  if( target_element ){ // check of doelelement bestaat
    if( options ){
      options.append ? target_element.appendChild( form ) : target_element.innerHTML = placeholder.innerHTML;
    } else {
      target_element.innerHTML = placeholder.innerHTML;
    }
  }


  // formEvents ; date,email e.d.
  $formEvents();
  // callback; voer funtie uit nadat formulier aan doelelement is toegevoegd
  callback();
  // geef formulier uit doelelement terug
  return document.querySelector( target + ' form' );

}

function $getFormData( form ) {
  // maak nieuw object aan
  let data = {};
  // roep FormData object aan met formulier
  let formData = new FormData( form );
  // loop door .entries
  for( let item of formData.entries() ) {
    // voeg waarden toe aan data object
    data[ item[0] ] = item[1];
  }
  // geef data object terug
  return data;
}

function $formEvents() {
  if ( typeof jQuery != 'undefined' ) {
    //console.info( `jQuery ${jQuery.fn.jquery}` );
    $( 'input.date' ).datepicker( { format:'dd-mm-yyyy' });

    $( 'input.email' ).on( 'keyup', (event) => {
      $inputValidEmail();
    });

  } else {
    console.warn( 'jQuery is niet beschikbaar' );
    $event( 'keyup', 'input.email', () => {
      $inputValidEmail();
    });

  }
}

function $formSubmit( form, callback ){
  try{
    form.addEventListener( 'submit', (event) => {
      event.preventDefault();
      callback();
    });
  } catch{

  }
}


function $formInputDateToday(){
  let date_inputs = document.querySelectorAll( 'input.date' );
  for( let date_input of date_inputs ){
    date_input.value = $date();
  }
}

function $inputValidEmail() {
  let input_email = document.querySelectorAll( 'input.email' );
  // https://emailregex.com/
  let email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  for( let input of input_email ) {
    let email_input_id = input.getAttribute( 'id' );
    let email_input_ = document.querySelector( `#${email_input_id}` );
    let email_input_value =  email_input_.value;
    let email_pattern_test = email_pattern.test( email_input_value );
    email_pattern_test ? email_input_.setAttribute( 'class','form-control email is-valid' ) : email_input_.setAttribute( 'class','form-control email is-invalid' );

  }
}

function $buildFormFromObjPropsTmpl( object, target, callback ) {

  let obj_props = Object.getOwnPropertyNames( object );
  let form = document.createElement( 'form' );

  for( let prop_name of obj_prop_names ){
    let label =  typeof object.getPropertyLabel() !== 'undefined' ? object.getPropertyLabel()[ prop_name ] : prop_name;
    let form_group_row_tmpl_data = {
      'input' : prop_name,
      'input_val' : '',
      'input_class' : (() => {
                        if( prop_name.indexOf( 'date_' ) > 0 ){
                          return 'form-control date';
                        }else{
                          return 'form-control';
                        }
                    })(),
      'label' : label
    }

    let form_group_row_tmpl = $getTemplate( 'form_group_row', form_group_row_tmpl_data );
    // Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
    // functie (input_class uit object geeft functie terug i.p.v. string
    form.appendChild( form_group_row_tmpl );
  }
  let form_btn_row_tmpl_data = { 'btn_class' : '', 'btn_label' : 'Toevoegen' }
  let form_btn_row_tmpl = $getTemplate( 'form_btn_row', form_btn_row_tmpl_data );

  form.appendChild( form_btn_row_tmpl );
  // Voeg formulier toe aan target
  document.querySelector( target ).appendChild( form );
  callback();
  return document.querySelector( target + ' form' );
}

// form element lib - dom lib dependency
$buildFormFromObjProps = ( object, target, callback ) => {

  // namen properties object
  let obj_prop_names = Object.getOwnPropertyNames( object );

  // formulier element
  let form = $createElement( 'form' );

  // loop door namen properties object
  for( let prop_name of obj_prop_names ){

    // Bootstrap form-group row
    let form_group = $createElement( 'div.form-group row');

    // Bootstrap col-form-label
    let label =  $createElement( 'label.col-sm-2 col-form-label');
    // property naam (gelijk aan name en id attributes) als for attribute label
    label.setAttribute( 'for', prop_name);
    // haal tekst van label uit getPropertyLabel method van object
    typeof object.getPropertyLabel() !== 'undefined' ? label.innerHTML = object.getPropertyLabel()[ prop_name] : label.innerHTML = prop_name;

    // input element
    let col_sm = $createElement( 'div.col-sm-10');
    let input =  $createElement( `input#${prop}` );

    input.setAttribute( 'name', prop_name);

    let hidden = false;

    input.setAttribute( 'class', 'form-control' );

    if( prop_name.indexOf( 'date' ) > 0 ) input.setAttribute( 'class', 'form-control date' );
    if( prop_name.indexOf( 'email' ) > 0 ) input.setAttribute( 'class', 'form-control email' );
    if( prop_name.indexOf( 'id' ) > 0 ) {
      input.setAttribute( 'type', 'hidden' );
      hidden = true;
    }


    // voeg label en input toe aan form-group
    col_sm.appendChild( input );
    form_group.appendChild( label );
    form_group.appendChild( col_sm );
    // als element verborgen is, voeg enkel element toe i.p.v. form-group aan formulier
    hidden ? form.appendChild( input ) : form.appendChild( form_group );
  }
  // voeg knop toe aan formulier
  let button = $createElement( 'button.btn btn-primary' );
  button.innerHTML = 'Toevoegen';
  let footer = $createElement('div.text-right');
  footer.appendChild( button );
  form.appendChild( footer );

  $setElement( 'form', form.innerHTML, target );
  callback();
  return form;
}

$getFormData = ( form ) => {
  // maak nieuw object aan
  let data = {};
  // roep FormData object aan met formulier
  let formData = new FormData( form );
  // loop door .enries method array
  for( let item of formData.entries() ) {
    // voeg waarden toe aan data object
    data[item[0]] = item[1];
  }
  // geef data object terug
  return data;
}

$buildFormFromObjPropsTmpl = ( object, target, callback ) => {

  let obj_prop_names = Object.getOwnPropertyNames( object );
  let form = document.createElement( 'form' );

  for( let prop_name of obj_prop_names ){
    let label;
    typeof object.getPropertyLabel() !== 'undefined' ? label = object.getPropertyLabel()[ prop_name] : label = prop_name;
    let form_group_row_tmpl_data = {
      'input' : prop,
      'input_val' : '',
      'input_class' : () => {
                        if( prop_name.indexOf( 'date_' ) > 0 ){
                          return 'form-control date';
                        }else{
                          return 'form-control';
                        }
                    },
      'label' : label
    }

    let form_group_row_tmpl = $getTemplate( 'form_group_row', form_group_row_tmpl_data );
    // Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
    // functie uit object geeft functie terug i.p.v. string
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

$buildFormFromObjProps = ( object, target, callback ) => {

  // namen properties object
  let obj_prop_names = Object.getOwnPropertyNames( object );

  // formulier element
  let form = $( '<form></form>' );

  // loop door namen properties object
  // $.obj_prop_names.each({ }) alternatief jquery?
  for( let prop_name of obj_prop_names ){

    // Bootstrap form-group row
    let form_group = $( '<div></div>' ).addClass( 'form-group row' );
    // Bootstrap col-form-label
    let label = $( '<label></label>' ).addClass( 'col-sm-2 col-form-label' ).attr( 'for', prop_name.slice(1) );
    typeof object.getPropertyLabel() !== 'undefined' ? label.html( object.getPropertyLabel()[ prop_name ] ) : label.html( prop_name );
    // kolom input element
    let col_sm = $( '<div></div>' ).addClass( 'col-sm-10' );
    let hidden = false;
    // input element
    let input = $( '<input />' ).addClass( 'form-control' ).attr( 'name', prop_name.slice(1) ).attr( 'id', prop_name.slice(1) );
    if( prop_name.indexOf( 'date' ) > 0 ) input.addClass( 'date' );
    if( prop_name.indexOf( 'email' ) > 0 ) input.addClass( 'email' );
    if( prop_name.indexOf( 'id' ) > 0 ) {
      input.attr( 'type', 'hidden' );
      hidden = true;
    }

  }
});
$.fn.buildFormFromObjProps = ( object, callback ) => {
  $buildFormFromObjProps( object, this, callback );
}
/* maak beschikbaar als jquery plug-in;
let class_instance = new Class();
$( '#formulier' ).buildFormFromObjProps( class_instance, () => {
  // uitvoeren nadat formulier is geladen
});

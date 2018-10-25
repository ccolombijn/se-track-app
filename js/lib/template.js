'use strict';
/*
* js/lib/template.js
*/

function $getTemplate( src, data ) {
  /*
  let templates =  {

    'test' : `${data.firstName}`,
    'form_group_row' : (() => {
                          let form_group_row = document.createElement('div');
                          form_group_row.setAttribute('class','form-group row test');
                          let content = `<label class="col-sm-2 col-form-label" for="${data.input}">${data.label}</label>
                          <div class="col-sm-10"><input id="${data.input}" name="${data.input}" class="${data.input_class}" value="${data.input_val}" /></div>`;
                          form_group_row.innerHTML = content;
                          return form_group_row;
                    })(),
    'form_btn_row' : (() => {
                          let form_btn_row = document.createElement('div');
                          let  content = `<button class="btn btn-primary ${data.btn_class}">${data.btn_label}</button>`;
                          form_btn_row.innerHTML = content;
                          return form_btn_row;
                    })()
  }

  if( templates[src] === undefined ){
  */
    if ( typeof jQuery != 'undefined' ) {

      $.ajax({ url: `tmpl/${src}.html` }).done( ( xhr_response ) => {

        for( let data_item in data ){
          xhr_response.replace( new RegExp(`{${data_item}}`, 'g'), data[ data_item ] );
        }

        return xhr_response;
      });
    } else {

      xhr_response = $xhr( 'GET', `tmpl/${src}.html` );
    }

  /*
  } else {
    return templates[src];
  }
  */


}

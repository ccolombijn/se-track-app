'use strict';
/*
* js/lib/v2/globs.js
*/
try{
  global['_glob'] = {};
}catch( error ){
  window['_glob'] = {}
}
function $glob(){
  //let $views, $callbacks, $pages;
  this.$v = {};
  this.$f = {};
  this.$p = {};

  return this
}
function glob( element, key, val ){
  let glob =  _glob[ element ] ? _glob[ element ] : new $glob()[ element ]
  //let glob_el = _glob[ element ]
  if( key) {
    if( val) {
      glob[ key ] = val;
      _glob[ element ] = glob;
    } else{

      return _glob[ element ][ key ];
    }
  }
  //console.log( glob );
  return _glob[ element ]
}
// -----------------------------------------------------------------------------
//glob();
//_glob.$v[ 'foo' ] = 'bar';
glob( '$v', 'foo', 'bar'); // aanmaken
console.log( glob( '$v' ) )
_glob.$v[ 'foo' ] = 'bar2';
//glob( '$v', 'foo', 'bar2'); // wijzigen
console.log( glob( '$v' ) )
 _glob.$v[ 'foo2' ] = _glob.$v[ 'foo' ];
//glob( '$v', 'foo2', glob( '$v', 'foo' ) ); // aanmaken/opvragen
console.log( glob( '$v' ) );
// _glob.$f[ 'foo_' ] = ()=>{ console.log('foo_') }
glob( '$f', 'foo_', () => { // functie aanmaken
  console.log('foo_');
});
 _glob.$f[ 'bar_' ] = () => {
   console.log('bar_')
}
function foo_(){
  _glob.$f.foo_(); // functie oproepen
  _glob.$f.bar_();
}
foo_();

/*
(() => {
  let glob = _glob;
  console.log(glob)
 setInterval( () =>{
   if(_glob !== glob ){
     glob = _glob;
     console.log('_glob changed')
   }
 },10)
})();

setTimeout(()=>{
  glob( '$views', 'foo', 'bar3'); // wijzigen
  console.log(_glob)
},100) */

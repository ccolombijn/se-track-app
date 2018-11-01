( () => {
  'use strict';
  /*
  * js/lib/globals.js
  */


  let _global,
      $views,
      $pages,
      $objects,
      $callbacks;
    //process.config.node_no_browser_globals = false;
    try{ // Node.js -> global
      global['$views'] = $views = {};
      global['$pages'] = $pages = {};
      global['$objects'] = $objects = {};
      global['$callbacks'] = $callbacks = {};
      global['_global'] = _global = $setGlob();
      //setInterval(()=>{

        console.log( process );
        //console.clear();
      //},10)

    }catch( error ){ // User agent -> window
      //console.warn('global not available, using window instead');
      window['$views'] = $views = {};
      window['$pages'] = $pages = {};
      window['$objects'] = $objects = {};
      window['$callbacks'] = $callbacks = {};
      window['_global'] = _global = $setGlob();
      console.log( navigator );
    }
})();

function $setGlob(){
  return {
    '$views': $views,
    '$pages': $pages,
    '$objects': $objects,
    '$callbacks': $callbacks
  }
}

function $glob( name, key, value ){

  let glob = _global[ name ];
  if ( value) glob[ key ] = value;
  _global[ name ] = glob;
  return glob[ key ];
  //$global[ name ] = result;

}
//$views['foo'] = 'bar';
//$glob( '$views' , 'foo', 'bar' );

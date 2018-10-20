class Dashboard {
  constructor( data ) {
    if( data ) {
      this._items = data.items;
    } else {
      this._items = undefined;
    }
  }
  get localStorage(){
    let dashboard_local_storage = new LDB.Collection( 'dashboard' );
    return dashboard_local_storage;
  }
  
}

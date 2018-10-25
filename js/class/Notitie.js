'use strict';
class Notitie {
  constructor( data ) {
    this.setProperties( data );
  } // constructor( data )

  setProperties( data ){
    if( data ) {
      this._id = data.id;
      this._name = data.name;
      this._project = data.project;
      this._content = data.content;
      this._date = data.date;
      this._tags = data.tags;
    } else {
      this._id = undefined;
      this._name = undefined;
      this._project = undefined;
      this._content = undefined;
      this._date = undefined;
      this._tags = undefined;
    }
  }

  PropertyLabel(){
    return {
      '_id' : 'Id',
      '_name' : 'Titel',
      '_project' : 'Project',
      '_content' : 'Notitie',
      '_date' : 'Datum',
      '_tags' : 'tags'
    }
  }

  get PropertyObj(){
    return {
      '_id' : this._id,
      '_name' : this._name,
      '-project' : this._project,
      '_content' : this._content,
      '_date' : this._date,
      '_tags' : this._tags
    }
  }

  set add( data) {
    this.setProperties( data );

  }

  get overview(){
    //
  }
  shortName(){
    return 'notities';
  }
  fullName( plural ){

    return plural ? 'Notities' : 'Notitie';
  }


}

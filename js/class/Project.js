class Project {
  constructor( data ) {
    this.setProperties( data );
  } // constructor( data )

  setProperties( data ){
    if( data ) {
      this._id = data.id;
      this._name = data.name;
      this._category = data.category;
      this._git_repo = data.git_repo;
      this._content = data.content;
      this._date = data.date;
      this._tags = data.tags;
    } else {
      this._id = undefined;
      this._name = undefined;
      this._category = undefined;
      this._git_repo = undefined;
      this._content = undefined;
      this._date = undefined;
      this._tags = undefined;
    }
  }

  PropertyLabel(){
    return {
      '_id' : 'Id',
      '_name' : 'Naam',
      '_category' : 'Categorie',
      '_git_repo' : 'Github Repository',
      '_content' : 'Notitie',
      '_date' : 'Datum',
      '_tags' : 'tags'
    }
  }

  get PropertyObj(){
    return {
      _id : this._id,
      _name : this._name,
      _category : this._category,
      _git_repo : this._git_repo,
      _content : this._content,
      _date : this._date,
      _tags : this._tags
    }
  }

  set add( data) {
    this.setProperties( data );

  }

  get overview(){
    //
  }
  shortName(){
    return 'projecten';
  }
  fullName( plural ){

    return plural ? name = 'Projecten' : 'Project';
  }

}

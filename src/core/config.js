class Config {
  constructor () {
    this._configs = {};
  }

  get (path) {
    return this._configs[path];
  }

  add (json) {
    Object.assign(this._configs, this.flat(json));
  }

  flat (json, path) {
    return Object.keys(json).reduce((flattened, key) => {
      let data = json[key];
      let childPath = path ? `${path}.${key}` : key;
      if (typeof data === 'string' || typeof data === 'number') {
        flattened[childPath] = data;
      } else {
        Object.assign(flattened, this.flat(data, childPath))
      }
      return flattened;
    }, {})
  }
}

export default new Config();

import { extendObservable } from 'mobx';

class caption {
  constructor() {
    extendObservable(this, {
        caption: null
    })
  }
}

export default new caption();
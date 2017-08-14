import { extendObservable } from 'mobx';

class caption {
  constructor() {
    extendObservable(this, {
        text: null
    })
  }
}

export default new caption();
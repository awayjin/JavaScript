import { observable, action, makeAutoObservable } from 'mobx'

class Style {
  constructor() {
    makeAutoObservable(this)
  }
  @observable color = 'red';
  @observable size = 20;
  
  @action changeColor(color) {
    this.color = color;
  }
}

export default new Style();
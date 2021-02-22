import React from 'react'
import {observable, action, makeAutoObservable, trace} from 'mobx'

class Todo {
  @observable id = Math.random();
  @observable title = "";
  @observable finished =  false ;

  constructor (title) {
    this.title =  title;
    makeAutoObservable(this)
  }

  @action finishedToggle () {
    // console.log('finished', this.finished)
    this.finished = !this.finished;
  }

}

export default Todo
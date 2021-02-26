import {observable, action, makeAutoObservable} from 'mobx'
import { fetchUserInfoAPI } from '../api/index'

class User {
  constructor() {
    makeAutoObservable(this)
  }
  @observable user = [];
  @action async fetchUserInfo() {
    this.user = (await fetchUserInfoAPI()).data
  }   
}

export default new User();
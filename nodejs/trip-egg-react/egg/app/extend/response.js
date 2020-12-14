'use strict';

module.exports = {
  set token(token) {
    // console.log('11--> token:', this.get('token'));
    console.log('response this:', this);
    this.set('token', token);
  },
};
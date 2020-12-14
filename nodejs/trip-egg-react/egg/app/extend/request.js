'use strict';

module.exports = {
  get token() {
    console.log('11--> token:', this.get('token'));
    console.log('this:', this);
    return this.get('token');
  },
};
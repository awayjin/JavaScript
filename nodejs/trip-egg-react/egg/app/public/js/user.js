'use strict';

// eslint-disable-next-line no-unused-vars
function login() {
  // eslint-disable-next-line no-undef
  fetch('/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: 'admin',
      pwd: 'admin',
    }),
  })
    .then(res => res.json())
    .then(res => {
      console.log('res', res);
      // eslint-disable-next-line no-undef
      location.reload();
    })
    .catch(err => console.error('error:', err));
}
// eslint-disable-next-line no-unused-vars
function logout() {
  // eslint-disable-next-line no-undef
  fetch('/logout', {
    method: 'post',
  })
    .then(res => res.json())
    .then(res => {
      console.log('logout res', res);
      // eslint-disable-next-line no-undef
      location.reload();
    })
    .catch(err => console.error('error:', err));
}

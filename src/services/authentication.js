import { handleResponse } from './handle-response';
const config = require('../config.json');

const user_storage = localStorage.getItem('currentUser')

export const authenticationService = {
  login,
  logout,
  signup,
  currentUser: user_storage,
  user_id: (user_storage) ? JSON.parse(user_storage).id_pembeli : false
}

async function login(nomor_telepon, password) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomor_telepon, password })
  };

  const response = await fetch(`${config.base_url}/pembeli/login`, requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
}

function logout() {
  localStorage.removeItem('currentUser');
}

async function signup(user) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };

  const response = await fetch(`${config.base_url}/pembeli`, requestOptions);
  const user_1 = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('currentUser', JSON.stringify(user_1));
  return user_1;
}
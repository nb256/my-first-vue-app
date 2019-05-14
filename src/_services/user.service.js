import config from "config";
import axios from "axios";

export const userService = {
  login,
  logout,
  register
};

function login(email, password) {
  return axios
    .post(`${config.apiUrl}/api/Account/Login`, { email, password })
    .then(handleResponse)
    .then(res => {
      // login successful if there's a jwt token in the response
      if (res && res.data) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(res.data));
        // location.reload(true);
      }

      return res.data;
    })
    .catch(error => {
      return error;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  return axios
    .post(`${config.apiUrl}/api/Account/Register`, user)
    .then(handleResponse)
    .then(res => {
      // login successful if there's a jwt token in the response
      if (res && res.data) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(res.data));
        //   location.reload(true);
      }

      return res.data;
    });
}

function handleResponse(response) {
  console.log(response);
  if (response.statusText !== "OK") {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      location.reload(true);
    }

    const error = (response && response.data) || response.statusText;
    return Promise.reject(error);
  }

  return response;
}

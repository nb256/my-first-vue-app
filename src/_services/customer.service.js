import config from "config";
import { authHeader } from "../_helpers";
import axios from "axios";

export const customerService = {
  getAll,
//   getById,
//   update,
//   delete: _delete,
  changeStatus,
  createCustomer
};

function getAll({page}) {
  return (
    axios
      .post(
        `${config.apiUrl}/api/Customers/GetCustomers`,
        {
          pageNumber: page,
          itemCount: 50,
          sortColumn: 0,
          sortType: 0,
          searchKeyword: ""
        },
        { headers: authHeader() }
      )
      .then(handleResponse, page)
     
      .catch(error => {
        return error;
      })
  );
}

function changeStatus({id}) {
    return axios
      .get(
        `${config.apiUrl}/api/Customers/ChangeCustomerStatus?customerId=${id}`,
       
        { headers: authHeader() }
      )
      .then(handleResponse)
    
      .catch(error => {
        return error;
      })
   
  }
  function createCustomer(customer) {
    return axios
      .post(
        `${config.apiUrl}/api/Customers`,
       customer,
        { headers: authHeader() }
      )
      .then(handleResponse)
    
      .catch(error => {
        return error;
      })
   
  }
// function getById(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader()
//   };

//   return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }

// function update(user) {
//   const requestOptions = {
//     method: "PUT",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   };

//   return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
//     handleResponse
//   );
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: "DELETE",
//     headers: authHeader()
//   };

//   return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }

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

export function authHeader() {
    // return authorization header with jwt token
    // let user = JSON.parse(localStorage.getItem('user'));
    let user = localStorage.getItem("user").slice(1,localStorage.getItem("user").length-1)

    if (user ) {
        return { 'Authorization': 'Bearer ' + user };
    } else {
        return {};
    }
}
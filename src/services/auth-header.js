


class AuthHeader {

    token = JSON.parse(localStorage.getItem('token'));

    authHeader() {


        if (this.token && this.token.access_token) {
            return { Authorization: 'Bearer ' + this.token.access_token }; // for Spring Boot back-end
        } else {
            return {};
        }
    }

    authRefreshHeader() {

        if (this.token && this.token.refresh_token) {
            return { Authorization: 'Bearer ' + this.token.refresh_token }; // for Spring Boot back-end
        } else {
            return {};
        }
    }
}
export default new AuthHeader()

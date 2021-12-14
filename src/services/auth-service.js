import axios from "axios";
import AuthHeader from "@/services/auth-header";
const HOST = "http://localhost:8080/api/"

class AuthService {

    login(user)
    {
        const email = user.email;
        const pass = user.pass;
        return axios.post(HOST + 'login' ,null, {
            params: {
                email,
                pass
            }

        }).then(response => {

            if(response.data.access_token)
            {
                localStorage.setItem('token', JSON.stringify(response.data));
            }
            if(response.data.refresh_token)
            {
                localStorage.setItem('r-token', JSON.stringify(response.data));
            }


        }).catch(e=> {
            console.log(e);
        })
    }

    logout()
    {
        localStorage.removeItem('token');
        localStorage.removeItem('r-token');
        window.location.reload();
    }

    refresh()
    {
        return axios.get(HOST + "token/refresh", {headers: AuthHeader.authRefreshHeader() }).then(response=>{
            if(response.data.access_token)
            {
                localStorage.setItem('token', JSON.stringify(response.data));
            }
        })
    }


}

export default new AuthService();
import axios from "axios";
import AuthHeader from "@/services/auth-header";

const HOST = "http://localhost:8080/api/user/";

class StatisticService {



    getUsers() {
        let url = HOST + 'all';
        return axios.get(url, {headers: AuthHeader.authHeader()})
            .catch(e =>
                console.log("ошибка rest-api: " + e));
    }

    getStatisticForUser(user_id, statistic_type)
    {
        let url = HOST + user_id + '/statistic/' + statistic_type;
        return axios.get(url, {headers: AuthHeader.authHeader()})
            .catch(e =>
                console.log("ошибка rest-api: " + e));
    }
}

export default new StatisticService();

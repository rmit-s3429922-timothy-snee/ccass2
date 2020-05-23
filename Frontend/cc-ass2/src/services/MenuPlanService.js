import axios from "axios";

const API_URL = "http://localhost:8080";

class MenuPlanService {
    getMenuPlan(username) {
        return axios.get(`${API_URL}/menuplan/${username}`);
    }

    async postMenuPlan(username, recipes) {
        axios.post(`${API_URL}/newmenuplan/${username}`, recipes)
            .then(function(response) {
                console.log(response);
            })
    }
}

export default new MenuPlanService();

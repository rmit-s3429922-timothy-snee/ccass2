import axios from 'axios'

const API_URL = 'http://localhost:8080'

class MainService {
    retrieveUser() {
        return axios.get(`${API_URL}/main/`);
    }
}

export default new MainService()
import axios from 'axios'

const API_URL = 'http://localhost:8080'

class ListRecipesService {
    retrieveAllRecipes() {
        return axios.get(`${API_URL}/recipes/`)
    }
}

export default new ListRecipesService()
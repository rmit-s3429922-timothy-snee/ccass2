import axios from "axios";

const API_URL = "http://localhost:8080";

class PantryService {
	retrievePantryItems(username) {
		return axios.get(`/user/${username}`);
	}

	async postPantryItems(username, pantry) {
		axios.post(`/set/${username}`, pantry).then(function (response) {
			console.log(response);
		});
	}
}

export default new PantryService();

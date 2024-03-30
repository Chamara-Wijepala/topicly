import axios from 'api/axios';

type UserType = {
	username: string;
	password: string;
};

async function handleLogin(endpoint: string, userData: UserType) {
	const response = await axios.post(endpoint, userData);

	return response;
}

export default handleLogin;

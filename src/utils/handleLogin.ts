import axiosInstance from 'api/axiosInstance';

type UserType = {
	username: string;
	password: string;
};

async function handleLogin(endpoint: string, userData: UserType) {
	const response = await axiosInstance.post(endpoint, userData);

	return response;
}

export default handleLogin;

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'api/axios';
import Header from 'components/header';
import Home from 'pages/home';
import PostDetails from 'pages/post-details';
import Register from 'pages/register';
import Login from 'pages/login';
import CreatePost from 'pages/create-post';
import { CurrentUserType } from 'types/currentUser.type';

function App() {
	const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);

	async function refresh() {
		const response = await axios.get('/auth/refresh');

		if (currentUser) {
			setCurrentUser({
				username: currentUser.username,
				accessToken: response.data.accessToken,
			});
		}

		return response.data.accessToken;
	}

	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;

			// _retry is a custom property used to prevent axios from causing an
			// infinite loop
			if (error.response?.status === 401 && !originalRequest?._retry) {
				originalRequest._retry = true;

				const token = await refresh();

				originalRequest.headers.authorization = `Bearer ${token}`;

				return axios(originalRequest);
			}

			return Promise.reject(error);
		}
	);

	// TEMP: Delete later
	useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);

	return (
		<>
			<main>
				<Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
				<div className="max-w-[768px] mx-auto p-4 border-red-400 border-2">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/post/:id" element={<PostDetails />} />
						<Route
							path="/register"
							element={<Register setCurrentUser={setCurrentUser} />}
						/>
						<Route
							path="/login"
							element={<Login setCurrentUser={setCurrentUser} />}
						/>
						<Route
							path="/create"
							element={<CreatePost currentUser={currentUser} />}
						/>
					</Routes>
				</div>
			</main>
		</>
	);
}

export default App;

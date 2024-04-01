import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/header';
import Home from 'pages/home';
import PostDetails from 'pages/post-details';
import Register from 'pages/register';
import Login from 'pages/login';
import CreatePost from 'pages/create-post';
import { CurrentUserType } from 'types/currentUser.type';

function App() {
	const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);

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

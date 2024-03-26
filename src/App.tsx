import { Routes, Route } from 'react-router-dom';
import Home from 'pages/home';
import PostDetails from 'pages/post-details';
import Register from 'pages/register';

function App() {
	return (
		<>
			<main>
				<div className="max-w-[768px] mx-auto p-4 border-red-400 border-2">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/post/:id" element={<PostDetails />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
			</main>
		</>
	);
}

export default App;

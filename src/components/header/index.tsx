import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import axios from 'api/axios';
import logo from 'assets/icons/logo.svg';
import { CurrentUserType } from 'types/currentUser.type';

function Header({
	currentUser,
	setCurrentUser,
}: {
	currentUser: CurrentUserType | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType | null>>;
}) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const firstChar = currentUser?.username.charAt(0);

	async function handleLogout() {
		await axios.get('/auth/logout');
		setCurrentUser(null);
	}

	return (
		<header className="bg-white shadow-md p-4">
			<div className="max-w-[120rem] mx-auto flex items-center justify-between relative">
				<div className="max-w-16 md:max-w-24">
					<Link to="/">
						<img src={logo} alt="Website logo" />
					</Link>
				</div>

				{currentUser === null ? (
					<div className="flex items-center gap-4">
						<Link to="/login">Log In</Link>
						<Link to="/register">Sign Up</Link>
					</div>
				) : (
					<div className="flex items-center gap-4">
						<Link to="/create">New</Link>

						<button onClick={() => setIsPopupOpen(!isPopupOpen)}>
							<div className="text-2xl bg-emerald-400 p-4 rounded-full aspect-square leading-4">
								{firstChar}
							</div>
						</button>

						{isPopupOpen && (
							<div className="bg-white shadow-md p-4 min-w-40 max-w-64 top-20 absolute right-0 rounded-md flex flex-col items-center grow">
								<div className="min-w-full flex">
									<button
										onClick={() => setIsPopupOpen(false)}
										className="ml-auto"
									>
										<AiOutlineClose />
									</button>
								</div>
								<div className="text-2xl bg-emerald-400 p-4 rounded-full aspect-square leading-4 max-w-12">
									{firstChar}
								</div>
								<p className="mb-4 break-all">{currentUser.username}</p>
								<button
									className="flex items-center gap-1"
									onClick={handleLogout}
								>
									<span>Log Out</span>
									<IoLogOutOutline />
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;

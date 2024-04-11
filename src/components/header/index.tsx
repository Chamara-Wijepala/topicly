import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/button';
import { AiOutlineClose } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import axiosInstance from 'api/axiosInstance';
import logo from 'assets/icons/logo.svg';
import { CurrentUserType } from 'types/currentUser.type';

function Header({
	currentUser,
	setCurrentUser,
}: {
	currentUser: CurrentUserType | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType | null>>;
}) {
	const navigate = useNavigate();
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const firstChar = currentUser?.username.charAt(0);

	async function handleLogout() {
		await axiosInstance.get('/auth/logout');
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
						<Button variant="regular" onClick={() => navigate('/login')}>
							Log In
						</Button>
						<Button variant="neutral" onClick={() => navigate('/register')}>
							Sign Up
						</Button>
					</div>
				) : (
					<div className="flex items-center gap-4">
						<Button variant="regular" onClick={() => navigate('/create')}>
							New
						</Button>

						<button onClick={() => setIsPopupOpen(!isPopupOpen)}>
							<div className="text-2xl bg-emerald-400 p-4 rounded-full aspect-square leading-4">
								{firstChar}
							</div>
						</button>

						{isPopupOpen && (
							<div className="bg-white shadow-md p-4 min-w-40 max-w-64 top-20 absolute right-0 rounded-md flex flex-col items-center grow z-10">
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
								<Button variant="neutral" onClick={handleLogout}>
									<span>Log Out</span>
									<IoLogOutOutline />
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;

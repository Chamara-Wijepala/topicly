import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from 'components/text-input';
import Button from 'components/button';
import BackButton from 'components/back-button';
import handleLogin from 'utils/handleLogin';
import { CurrentUserType } from 'types/currentUser.type';

type Props = {
	setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType | null>>;
};

function Login({ setCurrentUser }: Props) {
	const [username, setUsername] = useState('');
	const [isUsernameValid, setIsUsernameValid] = useState(false);

	const [password, setPassword] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		try {
			const response = await handleLogin('/auth/login', { username, password });

			setCurrentUser({
				username,
				accessToken: response.data.accessToken,
			});
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		setIsUsernameValid(username !== '');
		setIsPasswordValid(password !== '');
	}, [username, password]);

	return (
		<section className="mt-4 md:mt-12 bg-white p-8 md:p-16 shadow-md rounded-md">
			<h2 className="text-3xl md:text-4xl font-bold">Sign In</h2>

			<form className="flex flex-col gap-8 my-8">
				<TextInput
					state={username}
					setState={setUsername}
					isStateValid={isUsernameValid}
					label="Username"
				/>
				<TextInput
					state={password}
					setState={setPassword}
					isStateValid={isPasswordValid}
					label="Password"
					isPassword
				/>

				<div className="flex gap-4 flex-col-reverse md:flex-row">
					<BackButton />
					<Button
						variant="regular"
						disabled={!isUsernameValid && !isPasswordValid}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
				</div>
			</form>

			<p>
				Don't have an account?{' '}
				<Link to={'/register'} className="font-bold text-emerald-500">
					Sign Up
				</Link>
			</p>
		</section>
	);
}

export default Login;

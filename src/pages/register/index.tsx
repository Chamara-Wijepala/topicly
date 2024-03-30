import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from 'components/text-input';
import axios from 'api/axios';
import handleLogin from 'utils/handleLogin';
import { CurrentUserType } from 'types/currentUser.type';

type Props = {
	setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType | null>>;
};

const USERNAME_REGEX = /^[a-zA-Z0-9 _.-]{3,20}$/;
const PWD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~]{8,24}$/;

function Register({ setCurrentUser }: Props) {
	const [username, setUsername] = useState('');
	const [isUsernameValid, setIsUsernameValid] = useState(false);

	const [password, setPassword] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState(false);

	const [passwordMatch, setPasswordMatch] = useState('');
	const [isPasswordMatchValid, setIsPasswordMatchValid] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		try {
			const response = await axios.post('/users/register', {
				username,
				password,
			});

			if (response.status === 201) {
				const authResponse = await handleLogin('/auth/login', {
					username,
					password,
				});

				setCurrentUser({
					username,
					accessToken: authResponse.data.accessToken,
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		setIsUsernameValid(USERNAME_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		const result = PWD_REGEX.test(password);
		setIsPasswordValid(result);

		const match = password === passwordMatch;
		setIsPasswordMatchValid(match);
	}, [password, passwordMatch]);

	return (
		<section className="mt-4 md:mt-12 bg-white p-8 md:p-16 shadow-md rounded-md">
			<h2 className="text-3xl md:text-4xl font-bold">Welcome to Topicly</h2>
			<p className="text-slate-500">Create an account</p>

			<form className="flex flex-col gap-8 my-8">
				<TextInput
					state={username}
					setState={setUsername}
					isStateValid={isUsernameValid}
					label="Username"
					note="Must be at least 3 characters and 20 characters max. Can have letters, numbers, spaces, dots, underscores and hyphens."
				/>
				<TextInput
					state={password}
					setState={setPassword}
					isStateValid={isPasswordValid}
					label="Password"
					note="Must be at least 8 characters and 24 characters max. Must have at least 1 lowercase letter, 1 uppercase letter and 1 number. Special characters are allowed but not required"
				/>
				<TextInput
					state={passwordMatch}
					setState={setPasswordMatch}
					isStateValid={isPasswordMatchValid}
					label="Repeat Password"
					note="Must match original password."
				/>

				<div>
					<button onClick={() => navigate(-1)}>Back</button>
					<button onClick={(e) => handleSubmit(e)}>Sign Up</button>
				</div>
			</form>
		</section>
	);
}

export default Register;

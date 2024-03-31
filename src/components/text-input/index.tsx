import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';

function TextInput({
	state,
	setState,
	isStateValid,
	label,
	note,
	isPassword = false,
}: {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	isStateValid: boolean;
	label: string;
	note?: string;
	isPassword?: boolean;
}) {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [showValidationStatus, setShowValidationStatus] = useState(false);
	const [inputType, setInputType] = useState<'text' | 'password'>('text');
	const [autoComplete, setAutoComplete] = useState<'off' | 'new-password'>(
		'off'
	);

	function toggleInputType(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();

		inputType === 'text' ? setInputType('password') : setInputType('text');
	}

	useEffect(() => {
		if (isPassword) {
			setInputType('password');
			setAutoComplete('new-password');
		}
	}, [isPassword]);

	return (
		<div className="relative">
			<label htmlFor={label} className="text-slate-700 text-sm">
				{label}*
			</label>
			<div className="flex gap-2 items-center border-b-2 border-slate-250">
				<input
					type={inputType}
					value={state}
					id={label}
					autoComplete={autoComplete}
					required
					aria-invalid={isStateValid ? 'false' : 'true'}
					aria-describedby="note"
					onChange={(e) => setState(e.target.value)}
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => {
						setIsInputFocused(false);
						setShowValidationStatus(true);
					}}
					className="py-2 outline-none md:text-xl grow bg-transparent min-w-0"
				/>

				{showValidationStatus &&
					(isStateValid ? (
						<AiOutlineCheckCircle className="md:min-h-6 md:min-w-6 text-emerald-500" />
					) : (
						<AiOutlineCloseCircle className="md:min-h-6 md:min-w-6 text-rose-500" />
					))}

				{isPassword && (
					<button onClick={(e) => toggleInputType(e)}>
						{inputType === 'text' ? (
							<AiFillEyeInvisible className="min-h-6 min-w-6" />
						) : (
							<AiFillEye className="min-h-6 min-w-6" />
						)}
					</button>
				)}
			</div>

			{note && (
				<div
					className={classNames(
						isInputFocused ? 'block' : 'sr-only',
						'p-2 flex gap-2 mt-4'
					)}
				>
					<AiOutlineExclamationCircle className="m-1 md:min-h-5 md:min-w-5" />
					<p id="note">{note}</p>
				</div>
			)}
		</div>
	);
}

export default TextInput;

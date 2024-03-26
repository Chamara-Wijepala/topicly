import { useState } from 'react';
import classNames from 'classnames';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

function TextInput({
	state,
	setState,
	isStateValid,
	label,
	note,
}: {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	isStateValid: boolean;
	label: string;
	note: string;
}) {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [showValidationStatus, setShowValidationStatus] = useState(false);

	return (
		<div className="relative">
			<label htmlFor={label} className="text-slate-700 text-sm">
				{label}*
			</label>
			<div className="flex gap-2 items-center border-b-2 border-slate-250">
				<input
					type="text"
					value={state}
					id={label}
					autoComplete="off"
					required
					aria-invalid={isStateValid ? 'false' : 'true'}
					aria-describedby="note"
					onChange={(e) => setState(e.target.value)}
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => {
						setIsInputFocused(false);
						setShowValidationStatus(true);
					}}
					className="py-2 outline-none md:text-xl grow bg-transparent"
				/>

				{showValidationStatus &&
					(isStateValid ? (
						<AiOutlineCheckCircle className="md:min-h-6 md:min-w-6 text-emerald-500" />
					) : (
						<AiOutlineCloseCircle className="md:min-h-6 md:min-w-6 text-rose-500" />
					))}
			</div>

			<div
				className={classNames(
					isInputFocused ? 'block' : 'sr-only',
					'p-2 flex gap-2 mt-4'
				)}
			>
				<AiOutlineExclamationCircle className="m-1 md:min-h-5 md:min-w-5" />
				<p id="note">{note}</p>
			</div>
		</div>
	);
}

export default TextInput;

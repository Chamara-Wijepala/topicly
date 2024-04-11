import classNames from 'classnames';

type Props = React.ComponentProps<'button'> & {
	variant: 'regular' | 'neutral' | 'danger';
	square?: boolean;
};

function Button({ variant, square, disabled, children, ...props }: Props) {
	return (
		<button
			{...props}
			disabled={disabled}
			className={classNames(
				{
					['bg-emerald-400 hover:bg-emerald-500 text-white']:
						variant === 'regular' && !disabled,
					['bg-emerald-200 text-white cursor-not-allowed']:
						variant === 'regular' && disabled,
					['bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow']:
						variant === 'neutral',
					['bg-transparent hover:bg-rose-500 text-rose-400 hover:text-white border-2 border-rose-400 hover:border-rose-500']:
						variant === 'danger',
					'p-1 md:p-2 grow-0': square,
					'py-1 md:py-2 px-2 md:px-4': !square,
				},
				'flex gap-1 md:gap-2 items-center justify-center grow rounded-sm'
			)}
		>
			{children}
		</button>
	);
}

export default Button;

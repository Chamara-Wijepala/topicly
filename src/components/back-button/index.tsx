import { useNavigate } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';

function BackButton() {
	const navigate = useNavigate();

	return (
		<button onClick={() => navigate(-1)} className="flex items-center gap-2">
			<BsArrowLeftCircle />
			<span>Back</span>
		</button>
	);
}

export default BackButton;

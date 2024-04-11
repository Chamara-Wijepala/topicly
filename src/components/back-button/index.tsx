import { useNavigate } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import Button from 'components/button';

function BackButton() {
	const navigate = useNavigate();

	return (
		<Button variant="neutral" onClick={() => navigate(-1)}>
			<BsArrowLeftCircle />
			<span>Back</span>
		</Button>
	);
}

export default BackButton;

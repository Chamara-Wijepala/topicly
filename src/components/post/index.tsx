import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { BsThreeDots } from 'react-icons/bs';
import { MdCloseFullscreen } from 'react-icons/md';
import { MdOpenInFull } from 'react-icons/md';
import Button from 'components/button';
import axiosInstance from 'api/axiosInstance';
import isoStringToRelativeTime from 'utils/isoStringToRelativeTime';
import { PostType } from 'types/post.type';
import { CurrentUserType } from 'types/currentUser.type';

type Props = PostType & {
	currentUser: CurrentUserType | null;
	removePostFromList(id: string): void;
};

function Post({
	_id,
	createdAt,
	updatedAt,
	username,
	title,
	body,
	currentUser,
	removePostFromList,
}: Props) {
	const navigate = useNavigate();
	const [isBodyExpanded, setIsBodyExpanded] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const firstChar = username.charAt(0);
	const isPostUpdated = createdAt !== updatedAt;

	async function handleDelete() {
		const response = await axiosInstance.delete(`/posts/${_id}`);

		if (response.status === 200) {
			removePostFromList(_id);
		}
	}

	return (
		<div className="grid grid-cols-[min-content_1fr] gap-2 md:gap-x-4 text-slate-950">
			<div className="text-2xl bg-emerald-400 p-4 rounded-full aspect-square leading-4">
				{firstChar}
			</div>

			<div className="flex justify-between">
				<div className="col-start-2 flex flex-col gap-1 md:flex-row md:items-center">
					<p className="font-bold text-sm md:text-base">{username}</p>

					<span className="w-1 h-1 rounded-full bg-slate-700 hidden md:block"></span>

					<p className="text-xs md:text-sm text-slate-700">
						{isPostUpdated
							? `Updated ${isoStringToRelativeTime(updatedAt)}`
							: isoStringToRelativeTime(createdAt)}
					</p>
				</div>

				{username === currentUser?.username && (
					<div className="relative">
						<button onClick={() => setIsPopupOpen((prev) => !prev)}>
							<BsThreeDots />
						</button>

						{isPopupOpen && (
							<div className="bg-white shadow-md p-4 min-w-40 max-w-64 top-6 right-0 absolute rounded-md flex flex-col gap-4 z-10">
								<Button
									variant="neutral"
									onClick={() => navigate(`/update/${_id}`)}
								>
									Update
								</Button>
								<Button variant="danger" onClick={handleDelete}>
									Delete
								</Button>
							</div>
						)}
					</div>
				)}
			</div>

			<div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
				<Link to={`/post/${_id}`}>
					<h2 className="font-bold">{title}</h2>
				</Link>

				<Button
					variant="neutral"
					square
					onClick={() => setIsBodyExpanded(!isBodyExpanded)}
				>
					{isBodyExpanded ? (
						<>
							<span className="sr-only">Collapse text</span>
							<MdCloseFullscreen className="text-sm" />
						</>
					) : (
						<>
							<span className="sr-only">Expand text</span>
							<MdOpenInFull className="text-sm" />
						</>
					)}
				</Button>

				<Link to={`/post/${_id}`}>
					<p
						className={classNames(
							isBodyExpanded ? 'block' : 'hidden',
							'text-sm'
						)}
					>
						{body}
					</p>
				</Link>
			</div>
		</div>
	);
}

export default Post;

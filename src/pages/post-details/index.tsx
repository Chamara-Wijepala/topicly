import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import Button from 'components/button';
import BackButton from 'components/back-button';
import axiosInstance from 'api/axiosInstance';
import isoStringToRelativeTime from 'utils/isoStringToRelativeTime';
import { PostType } from 'types/post.type';
import { CurrentUserType } from 'types/currentUser.type';

function PostDetails({ currentUser }: { currentUser: CurrentUserType | null }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState<PostType | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const firstChar = post?.username.charAt(0);
	const isPostUpdated = post?.createdAt !== post?.updatedAt;

	async function handleDelete() {
		const response = await axiosInstance.delete(`/posts/${id}`);

		if (response.status === 200) {
			navigate('/');
		}
	}

	useEffect(() => {
		axiosInstance
			.get(`/posts/${id}`)
			.then((response) => setPost(response.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<section>
			<div className="my-8">
				<BackButton />
			</div>

			{post ? (
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-[min-content_1fr_min-content] gap-2 md:gap-4">
						<div className="text-2xl bg-emerald-400 p-4 rounded-full aspect-square leading-4 flex items-center justify-center self-center">
							<span>{firstChar}</span>
						</div>

						<div>
							<p className="font-bold md:text-lg">{post.username}</p>

							<p className="text-slate-700 text-sm">
								{isPostUpdated
									? `${isoStringToRelativeTime(
											post.createdAt
									  )} - Updated ${isoStringToRelativeTime(post.updatedAt)}`
									: isoStringToRelativeTime(post.updatedAt)}
							</p>
						</div>

						{currentUser?.username === post.username && (
							<div className="relative">
								<button onClick={() => setIsPopupOpen((prev) => !prev)}>
									<BsThreeDots />
								</button>

								{isPopupOpen && (
									<div className="bg-white shadow-md p-4 min-w-40 max-w-64 top-6 right-0 absolute rounded-md flex flex-col gap-4 z-10">
										<Button
											variant="neutral"
											onClick={() => navigate(`/update/${post._id}`)}
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

					<h2 className="text-lg font-bold md:text-3xl mt-4 md:mt-8 md:mb-4">
						{post.title}
					</h2>

					<p className="md:text-xl">{post.body}</p>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</section>
	);
}

export default PostDetails;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import isoStringToRelativeTime from 'utils/isoStringToRelativeTime';
import { PostType } from 'types/post.type';

function PostDetails() {
	const { id } = useParams();
	const [post, setPost] = useState<PostType | null>(null);

	const firstChar = post?.username.charAt(0);
	const isPostUpdated = post?.createdAt !== post?.updatedAt;

	useEffect(() => {
		axios
			.get(`http://localhost:5500/posts/${id}`)
			.then((response) => setPost(response.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<section>
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

						<button className="self-start">
							<BsThreeDots />
						</button>
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

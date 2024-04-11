import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'components/button';
import axiosInstance from 'api/axiosInstance';
import { CurrentUserType } from 'types/currentUser.type';

function UpdatePost({ currentUser }: { currentUser: CurrentUserType | null }) {
	const { id } = useParams();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [isPostValid, setIsPostValid] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		try {
			const response = await axiosInstance.patch(
				`/posts/${id}`,
				{
					title,
					body,
				},
				// The key can be 'authorization' or 'Authorization'
				{ headers: { authorization: `Bearer ${currentUser?.accessToken}` } }
			);

			if (response.status === 200) {
				navigate(`/post/${id}`);
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		axiosInstance
			.get(`/posts/${id}`)
			.then((response) => {
				setTitle(response.data.title);
				setBody(response.data.body);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		title === '' || body === '' ? setIsPostValid(false) : setIsPostValid(true);
	}, [title, body]);

	return (
		<section className="bg-white shadow-md rounded-md p-4 md:p-8 md:mt-12">
			<h2 className="font-bold text-2xl">Update post</h2>

			<form>
				<div className="flex flex-col my-6 md:my-8">
					<input
						type="text"
						placeholder="Title"
						maxLength={100}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-[1px] border-slate-300 rounded-md p-2 outline-none"
					/>
					<span className="text-slate-500 text-sm">{title.length}/100</span>
				</div>

				<div>
					<textarea
						rows={10}
						placeholder="Body"
						maxLength={500}
						value={body}
						onChange={(e) => setBody(e.target.value)}
						className="min-w-full border-[1px] border-slate-300 p-2 outline-none"
					></textarea>

					<div className="flex justify-between">
						<span className="text-slate-500 text-sm">{body.length}/500</span>

						<div className="flex gap-2 mt-3 md:mt-4">
							<Button variant="neutral" onClick={() => navigate(-1)}>
								Cancel
							</Button>
							<Button
								variant="regular"
								disabled={!isPostValid}
								onClick={handleSubmit}
							>
								Post
							</Button>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
}

export default UpdatePost;

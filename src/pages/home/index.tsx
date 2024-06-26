import { useState, useEffect, Fragment } from 'react';
import Post from 'components/post';
import axiosInstance from 'api/axiosInstance';
import { PostType } from 'types/post.type';
import { CurrentUserType } from 'types/currentUser.type';

function Home({ currentUser }: { currentUser: CurrentUserType | null }) {
	const [posts, setPosts] = useState<Array<PostType> | null>(null);

	function removePostFromList(id: string) {
		if (posts) {
			const filteredPosts = posts.filter((post) => post._id !== id);

			setPosts(filteredPosts);
		}
	}

	useEffect(() => {
		axiosInstance
			.get('/posts/')
			.then((response) => setPosts(response.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<section className="flex flex-col gap-6">
				{posts ? (
					posts.map((post) => (
						<Fragment key={post._id}>
							<Post
								{...post}
								currentUser={currentUser}
								removePostFromList={removePostFromList}
							/>
						</Fragment>
					))
				) : (
					<div>Loading...</div>
				)}
			</section>
		</>
	);
}

export default Home;

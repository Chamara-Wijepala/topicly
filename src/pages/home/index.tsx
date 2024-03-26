import { useState, useEffect, Fragment } from 'react';
import Post from 'components/post';
import axios from 'api/axios';
import { PostType } from 'types/post.type';

function Home() {
	const [posts, setPosts] = useState<Array<PostType> | null>(null);

	useEffect(() => {
		axios
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
							<Post {...post} />
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

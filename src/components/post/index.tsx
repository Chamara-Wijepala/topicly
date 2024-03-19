import { PostType } from '../../types/post.type';

function Post({ _id, createdAt, updatedAt, username, title, body }: PostType) {
	console.log(_id, createdAt, updatedAt, username, title, body);
	return <div>Post</div>;
}

export default Post;

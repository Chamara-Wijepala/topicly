import { useState } from 'react';
import classNames from 'classnames';
import isoStringToRelativeTime from 'utils/isoStringToRelativeTime';
import { PostType } from 'types/post.type';

function Post({ _id, createdAt, updatedAt, username, title, body }: PostType) {
	const [isBodyExpanded, setIsBodyExpanded] = useState(false);
	const firstChar = username.charAt(0);
	const isPostUpdated = createdAt !== updatedAt;

	return (
		<div className="grid grid-cols-[min-content_1fr] gap-2 md:gap-x-4 text-slate-950">
			<div className="text-2xl bg-emerald-400 p-4 rounded-full aspect-square leading-4">
				{firstChar}
			</div>

			<div className="col-start-2 flex items-center gap-1">
				<p className="font-bold">{username}</p>
				<span className="w-1 h-1 rounded-full bg-slate-600"></span>
				<p className="text-sm">
					{isPostUpdated
						? `Updated ${isoStringToRelativeTime(updatedAt)}`
						: isoStringToRelativeTime(createdAt)}
				</p>
			</div>

			<div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3">
				<h2 className="font-bold">{title}</h2>
				<button onClick={() => setIsBodyExpanded(!isBodyExpanded)}>
					{isBodyExpanded ? 'Collapse' : 'Expand'}
				</button>
				<p
					className={classNames(isBodyExpanded ? 'block' : 'hidden', 'text-sm')}
				>
					{body}
				</p>
			</div>
		</div>
	);
}

export default Post;

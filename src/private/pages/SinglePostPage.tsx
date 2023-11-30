import { useSelector } from 'react-redux'
import { selectPostById } from '../../features/posts/postsSlice'

import PostAuthor from "../components/PostAuthor";
import TimeAgo from '../components/TimeAgo';
import ReactionButtons from '../components/ReactionButtons';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state:RootState) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post?.title || ''}</h2>
            <p>{post?.body || ''}</p>
            <p className="postCredit">
                <Link to={`/private/posts/edit/${post?.id}`}>Edit Post</Link>
                <PostAuthor userId={String(post?.userId)} />
                <TimeAgo timestamp={post?.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage
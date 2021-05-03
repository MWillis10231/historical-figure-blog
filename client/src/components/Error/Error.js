import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { resetState, selectBlogError, selectBlogCommentError } from "../../features/blog/blogSlice";

export default function Error(props) {
    const error = useSelector(selectBlogError)
    const commentError = useSelector(selectBlogCommentError)
    const dispatch = useDispatch()
    const history = useHistory();

    function returnHomeClearState(){
        dispatch(resetState());
        history.push("/")
    }

    function returnToBlogHomeClearState() {
        return
    }

    if (error) {
        return (
            <main>
                <h2>{error}</h2>
                <p>There has been an error. Sorry!</p>
                <u onClick={returnHomeClearState}>Return Home</u>
            </main>
        )
    } else if (commentError) {
        <article>
                <h2>{error}</h2>
                <p>There has been an error. Sorry!</p>
                <Link to="/blog/">Back to Blogs</Link>
                <u onClick={returnToBlogHomeClearState}>Return Home</u>
        </article>
    } else {
        return (
            <main>
                <h2>{error}</h2>
                <p>There has been an error. Sorry!</p>
                <u onClick={returnHomeClearState}>Return Home</u>
            </main>
        )
    }
  
    
}
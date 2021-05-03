import React from 'react'

import BlogPostComment from "../BlogPostComment/BlogPostComment";

export default function BlogCommentList(props) {
    // filter out the relevant comments by their parent. if there's no parent, the parent_id is null. props.parent identifier passed down by blog(so null) or revelant comment id to allow them to render their child comments
    
    if (props.comments.length) {
        const listComments = props.comments.filter(comment => comment.parent_id === props.parent)
        return (
            <ul className="blogCommentList">
                {listComments.map((comment, index) => 
                <BlogPostComment data={listComments[index]} key={listComments[index].id} comments={props.comments}/>
                )}
            </ul>
        )
    } else {
        return (
            <ul className="blogCommentList" style={{height: "500px"}}>
                <li className="blogComment" style={{textAlign: "center"}}>Nobody has replied yet.</li>
            </ul>
        )
    }
}
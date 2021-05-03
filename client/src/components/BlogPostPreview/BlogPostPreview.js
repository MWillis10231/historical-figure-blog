import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import BlogTags from '../BlogTags.js/BlogTags';
import './BlogPostPreview.css'

import BlogPostHeader from '../BlogPostHeader/BlogPostHeader';

export default function BlogPostPreview(props) {
    let history = useHistory();
    let match = useRouteMatch();
    let comment = "Comments"
    if (props.data.total_comments === "1") {
        comment = "Comment"
    } 

    function navigateToPost() {
        history.push(`${match.url}${props.data.id}`)
    }

    if (props.extraClass) {
        return (
        <div className="BlogPreview firstPost" onClick={navigateToPost}>
            <BlogPostHeader blogPost={props.data} frontPage="true" firstPost="true"/>
            <BlogTags tags={props.data.tags} setFilterTag={props.setFilterTag} setFilter="true" />
        </div>
        )
    } else if (props.data) {
        return (
            <div className="BlogPreview" onClick={navigateToPost}>
                <BlogPostHeader blogPost={props.data} frontPage="true"/>
                <BlogTags tags={props.data.tags} setFilterTag={props.setFilterTag} setFilter="true" />
                <p className="BlogPreviewCommentContainer">{props.data.total_comments} {comment}</p>
            </div>
            )

    } else {
        return (
        <div>
            <h3>Title of blog post</h3>
            <date>Date of blog post</date>
            <p>Type of blog post</p>
        </div>
        )
    }
}
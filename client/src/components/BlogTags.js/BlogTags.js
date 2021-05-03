import React from 'react'
import './BlogTags.css'

export default function BlogTags(props) {

    function chooseTag(tag) {
        if (props.setFilter) {
            props.setFilterTag(tag)
        }
    }
    let allTags
    if (props.mainPage) {
        allTags  = <li className="BlogTagListItemsLinks" onClick={() => chooseTag("none")}>All tags</li>
    }

    return (
        <React.Fragment>
        <ul className="BlogTagList">
            {allTags}
            {props.tags.map((tag, index) => 
            <li className={props.setFilter ? "BlogTagListItemsLinks" : "BlogTagListItems"} key={`${tag}${index}`} onClick={() => chooseTag(tag)}>
                {tag}
            </li>)}
        </ul>
        </React.Fragment>
    )
}
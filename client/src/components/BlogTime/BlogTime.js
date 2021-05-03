import { formatDistanceToNow } from 'date-fns'
import './BlogTime.css'

export default function BlogTime(props) {
    return (
        <time className="blogDate" dateTime={props.date}>{formatDistanceToNow(new Date(props.date))} ago</time>
    )
}
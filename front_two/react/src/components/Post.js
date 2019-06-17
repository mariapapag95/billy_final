import React from 'react'

function Post(props) {
    return(
        <div className="post">
        <span className="space">{props.user}</span>
        <span className="space">{props.total}</span>
        <span className="space">{props.company}</span>
        <span className="space">{props.time}</span>
        <br/>
        <span>{props.text}</span>
        </div>
    )
}

export default Post;
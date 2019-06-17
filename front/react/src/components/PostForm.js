import React from 'react'
import MakePost from './MakePost';

function PostForm(props) {
    if (props.hidden === false) {
        return null
    } else {
        return (
            <MakePost/>
        )
    }
}

export default PostForm;
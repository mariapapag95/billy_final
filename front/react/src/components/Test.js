// import React from 'react'
// import PostContainer from './PostContainer';

function Test() {
    fetch(`http://127.0.0.1:5000/api/stripe/customer`)
    .then (blob => blob.json()).then(json => {
        let customerObject = json
        console.log(customerObject)
        })
}

export default Test
import React from 'react';
import Post from './Post'

const url = `http://127.0.0.1:5000/user`

export default class UserPage extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        allPosts: [],
    }
}

    fetchAll = () => {
        fetch(url)
        .then (blob => blob.json()).then(json => {
            let allPosts = json
            this.setState({allPosts : allPosts})
        })
    }

    componentDidMount () {
        this.fetchAll()
    }

    render () {
        let posts = this.state.allPosts.map((element, i) => {
            return <div key={i}>
            <Post 
            total={element.total_due || element.amount_paid} 
            user={element.due_by || element.paid_by}
            company={element.due_to || element.paid_to}
            time={element.created_on}
            text={element.caption || element.note}
            key={i}
            style={{fontWeight :'bold'}}/>
            </div>
        })
            return (
                <div>
                    <div>{posts}</div>
                </div>
            )
    }
}
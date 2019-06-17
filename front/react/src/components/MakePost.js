import React from 'react'

const url = `http://127.0.0.1:5000/api/post`

export default class MakePost extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        totalDue : '',
        dueBy : 'Maria', // hardcoded for now no login
        dueTo : '',
        caption : ''
    }
}

    postBill() {
        let post = {
            'totalDue': this.state.totalDue, 
            'dueBy': this.state.dueBy, 
            'dueTo': this.state.dueTo,
            'caption': this.state.caption,}
        fetch (url, {
            headers: {"Content-Type" : "application/json"}, 
            body: JSON.stringify(post),
            mode:"cors",
            method:"post"
        })
    }

    handleInput() {
        this.setState({
            totalDue: document.getElementById('totalDue').value,
            dueTo: document.getElementById('dueTo').value,
            caption: document.getElementById('caption').value
        }, ()=>this.postBill())
    }

    render() {
        return (
            <div className='makepost'>
                <form>
                    <input 
                    className='input'
                    id='totalDue'
                    placeholder='Enter $$$ amount'>
                    </input>
                    <input 
                    className='input'
                    id='dueTo'
                    placeholder='company'>
                    </input>
                    <input 
                    className='input'
                    id='caption'
                    placeholder='write caption'>
                    </input>
                    <button 
                    className="test"
                    type="submit"
                    onClick={()=>{this.handleInput()}}>
                    POST
                    </button>
                </form>
            </div>
        )
    }
}
import React from 'react'

const url = `http://127.0.0.1:5000/api/bills/`

export default class MakePay extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        amountPaid : '',
        paidBy : 'maria', // hardcoded for now no login
        note : '',
        id : undefined
    }
}

    payBill() {
        let post = {
            'amountPaid': this.state.amountPaid, 
            'note': this.state.note,}
        fetch (url + `${this.state.id}/pay`, {
            headers: {"Content-Type" : "application/json"}, 
            body: JSON.stringify(post),
            mode:"cors",
            method:"post"
        })
    }

    handleInput() {
        this.setState({
            amountPaid: document.getElementById('amountPaid').value,
            note: document.getElementById('note').value,
            id : document.getElementById('note')
        }, ()=>this.payBill())
    }

    render() {
        return (
            <div className='makepost'>
                <form>
                    <input 
                    className='input'
                    id='amountPaid'
                    placeholder='Enter $ amount'>
                    </input>
                    <input 
                    className='input'
                    id='note'
                    placeholder='add note'>
                    </input>
                    <button 
                    className="test"
                    type="submit"
                    onClick={()=>{this.handleInput()}}>
                    PAY
                    </button>
                </form>
            </div>
        )
    }
}
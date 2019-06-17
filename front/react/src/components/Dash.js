import React from 'react';
import Post from './Post'
import Nav  from './Nav'
//mport PayForm from './drafts_trash/PayForm1'
import PostForm from './PostForm';

const url = `http://127.0.0.1:5000/api/`

export default class Dash extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        allPosts: [],
        payForm: false,
        postForm: false,
        amountPaid: undefined,
        note: '',
        id: undefined,
    }
}

    fetchAll = () => {
        fetch(url+'all')
        .then (blob => blob.json()).then(json => {
            let allPosts = json
            this.setState({allPosts : allPosts})
            })
        .then (
            fetch ("https://connect.stripe.com/oauth/token")
        )
    }

    componentDidMount() {
        this.fetchAll()
    }

    pay(id) {
        console.log("pay function fired with this id::", id)
        fetch (url+`bills/${id}`)
        .then (blob => blob.json()).then(json => {
            let bill = json
            this.setState({allPosts : [bill], payForm : true, id : id})
            console.log("this is BILL in pay(id)", this.state.allPosts)
        })
    }
        
    payBill() {
            let post = {
            'amountPaid': this.state.amountPaid, 
            'note': this.state.note,}
        fetch (url+`bills/${this.state.id}/pay`, {
            headers: {"Content-Type" : "application/json"}, 
            body: JSON.stringify(post),
            mode:"cors",
            method:"post"
        })
    }

    handleInput() {
        this.setState({
            amountPaid: document.getElementById('amountPaid').value,
            note: document.getElementById('note').value
        }, ()=>this.payBill())
    }

    like(id) {
        console.log("LIKE button pressed with this id::", id)
    }

    makePost() {
        this.setState({postForm : !this.state.postForm})
    }

    test() {
        console.log("this is a test")
    }

    // pay(e) {
    //     let billAmount = e.target.value
    //     console.log(billAmount)

    //     onClick={e => this.pay(e, "value")}
    // }

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
            <button 
            id={element.bill_id || element.payment_id} 
            className={element.bill_id === undefined ? "likebutton" : "paybutton"} 
            onClick={()=>{element.total_due === undefined ? this.like(element.payment_id) : this.pay(element.bill_id)}}>
            {element.bill_id === undefined ? "LIKE" : "PAY"}
            </button>
            </div>
        })
        return (
            <div>
                <div>
                <Nav/>
                </div>
                {/* <button className="test" onClick={()=>{this.test()}}>
                    test
                </button> */}
                <button 
                className="test"
                onClick={()=>{this.makePost()}}>
                {"POST YOUR BILL"}
                </button>
                <br/>
                <br/>
                <br/>
                <br/>
                <PostForm hidden={this.state.postForm}/>
                <div>{posts}</div>
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
                {/* <PayForm hidden={this.state.payForm}/> */}
            </div>
            // <div className="box">
            // <Form className="box">
            // <Form.Group controlId="formBasicEmail">
            //     <Form.Label>Email address</Form.Label>
            //     <Form.Control type="email" placeholder="Enter email" />
            //     <Form.Text className="text-muted">
            //     We'll never share your email with anyone else.
            //     </Form.Text>
            // </Form.Group>

            // <Form.Group controlId="formBasicPassword">
            //     <Form.Label>Password</Form.Label>
            //     <Form.Control type="password" placeholder="Password" />
            // </Form.Group>
            // <Form.Group controlId="formBasicChecbox">
            //     <Form.Check type="checkbox" label="Check me out" />
            // </Form.Group>
            // <Button variant="primary" type="submit">
            //     Submit
            // </Button>
            // </Form>
            // </div>
        )
    }
}
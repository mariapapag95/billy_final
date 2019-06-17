import React from 'react';
import Post from '../Post';
//import {Link} from 'react-router-dom';

//import {Form, Button} from 'react-bootstrap'

const url = `http://127.0.0.1:5000/api/bills`

export default class PostBill extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        allBills: []
    }
}

    fetchBill = () => {
        fetch(url)
        .then (blob => blob.json()).then(json => {
            let allBills = json
            this.setState({allBills : allBills})
            })
        }

    componentDidMount() {
        this.fetchBill()
    }

    pay(id) {
        console.log(id)
        const endpoint = url+`/${id}`
        fetch (endpoint, {
            headers:{"Content-Type" : "application/json"}, 
            mode:"cors",
            method:"get"
            })
        .then (blob => blob.json()).then(json => {
            let bill = json
            this.setState({allBills : [bill]})
            console.log("this is BILL in pay(id)", this.state.allBills)
        })
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
        let bills = this.state.allBills.map((element, i) => {
            console.log("element from allBills.map", element)
            return <div key={i}>
            <Post 
            total={element.total_due} 
            user={element.due_by}
            company={element.due_to}
            time={element.created_on}
            text={element.caption}
            key={i}/>
            <button 
            id={element.bill_id} 
            className="button" 
            onClick={()=>{this.pay(element.bill_id)}}>
            PAY BUTTON
            </button>
            </div>
        })
        return (
            <div>
                {/* <button className="test" onClick={()=>{this.test()}}>
                    test
                </button> */}
                <div>{bills}</div>
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
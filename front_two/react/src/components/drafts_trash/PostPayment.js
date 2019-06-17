import React from 'react';
import Post from '../Post';

//import {Form, Button} from 'react-bootstrap'

const url = `http://127.0.0.1:5000/api/payments`

export default class PostPayment extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        allPays: []
    }
}

    fetchPay = () => {
        fetch(url)
        .then (blob => blob.json()).then(json => {
            let allPays = json
            this.setState({allPays : allPays})
            })
        }

    componentDidMount() {
        this.fetchPay()
    }

    test() {
        console.log("this is a pay test")
    }

    // pay(e) {
    //     let billAmount = e.target.value
    //     console.log(billAmount)

    //     onClick={e => this.pay(e, "value")}
    // }

    render () {
        let pays = this.state.allPays.map((element, i) => {
            return <div key={i}>
            <Post 
            total={element.amount_paid} 
            user={element.paid_by}
            company={element.paid_to}
            time={element.created_on}
            text={element.note}
            key={i}/>
            <button value={element.amount_paid} id={element.payment_id} className="button" onClick={console.log("like")}>Like</button>
            </div>
        })
        return (
            <div>
                {/* <button className="test" onClick={()=>{this.test()}}>
                    test
                </button> */}
                <div>{pays}</div>
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
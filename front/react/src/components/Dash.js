import React from 'react';
import Post from './Post'
import { TabContent, TabPane, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import classnames from 'classnames';
import UserPage from './UserPage';
import MakePost from './MakePost';

const url = `http://127.0.0.1:5000/api/`

export default class Dash extends React.Component {
    constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
        activeTab: '1',
        allPosts: [],
        payForm: false,
        postForm: false,
        amountPaid: undefined,
        note: '',
        id: undefined,
        collapsed: true
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

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab
            });
        }
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
                <Nav tabs>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar></Collapse>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
                >
                BILLY
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
                >
                USER
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
                >
                POST BILL
            </NavLink>
            </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <div>
            
                <div>{posts}</div>

                {this.state.payForm ? 
                    (<div className='makepost'>
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
                </div>):(null)}

                </div>
            </TabPane>
            <TabPane tabId="2">
                <UserPage/>
            </TabPane>
            <TabPane tabId="3">
                <MakePost/>
            </TabPane>
            </TabContent>
            </div>
            </div>
        )
    }
}
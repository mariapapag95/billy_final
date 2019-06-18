import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, NavbarToggler, Collapse, Navbar } from 'reactstrap';
import classnames from 'classnames';
import UserPage from './UserPage';
import MakePost from './MakePost';
import ReactTimeAgo from 'react-time-ago/tooltip'
import 'react-time-ago/Tooltip.css'
import '../App.css'

const url = `http://127.0.0.1:5000/api/`

export default class Dash extends React.Component {
    constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
        activeTab: '1',
        tabColor: "white",
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
            activeTab: tab,
            });
        console.log(this.state.activeTab !== tab)
        return this.state.activeTab !== tab
        }
    }

    paidFormat(string,string2) {
        return string + " paid " + string2
    }

    render () {

        let posts = this.state.allPosts.map((element, i) => {
            return <div key={i}>
            <div className={element.bill_id === undefined ? "paycontainer" : "billcontainer"} >
            <Navbar>
            {/* <span><div className="icon"></div></span> */}
            <div>{element.due_by === undefined ? this.paidFormat(element.paid_by, element.bill_owner) : element.due_by}</div>
            <div>${element.total_due || element.amount_paid}</div>
            <div>{element.due_to || element.paid_to}</div>
            <div className="comment"><ReactTimeAgo date = {element.created_on * 1000} timeStyle = "twitter"/></div>
            </Navbar>
            <div className="comment">"{element.caption || element.note}"</div>
            <div>{element.due_by === undefined ? 
            (
            // <button 
            // id={element.payment_id} 
            // className="likebutton" 
            // onClick={()=>{this.like(element.payment_id)}}>LIKE</button>
            null
            ) 
            :(<button 
                id={element.bill_id} 
                className="paybutton" 
                onClick={()=>{this.pay(element.bill_id)}}>PAY</button>)}</div>
            </div>
            </div>
        })
        return (
            <div>
                <div>
                <Nav tabs style={{backgroundColor: 'rgb(207, 68, 43)', 
                    fontFamily: 'Lucida Console, Monaco, monospace', 
                    fontStyle : "strong",
                    fontSize : "large"}}>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar></Collapse>
            <NavItem>
            <NavLink
                style = {this.state.activeTab !== '1' ? {color : "white"} : {color : 'rgb(207, 68, 43)'}}
                className={classnames({ active: this.state.activeTab === '1'})}
                onClick={() => { this.toggle('1'); }}
                >
                BILLY
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                style = {this.state.activeTab !== '2' ? {color : "white"} : {color : 'rgb(207, 68, 43)'}}
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
                >
                USER
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                style = {this.state.activeTab !== '3' ? {color : "white"} : {color : 'rgb(207, 68, 43)'}}
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
                >
                POST BILL
            </NavLink>
            </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <div>{posts}</div>
                <div>
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
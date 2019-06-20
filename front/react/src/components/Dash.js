import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, NavbarToggler, Collapse, Navbar } from 'reactstrap';
import classnames from 'classnames';
import UserPage from './UserPage';
import ReactTimeAgo from 'react-time-ago/tooltip'
import 'react-time-ago/Tooltip.css'
import '../App.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import HandlePay from './HandlePay'

const url = `http://127.0.0.1:5000/api/`
const stripe = `http://127.0.0.1:5000/api/stripe/`


export default class Dash extends React.Component {
    constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
        activeTab: '1',
        tabColor: "white",
        allPosts: [],
        payButton: true,
        payForm: false,
        postForm: false,
        amountPaid: undefined,
        note: '',
        id: undefined,
        collapsed: true,
        login : false,

        email : 'paying.user@example.com',
        name : "default",
        sources: undefined, 
        password : undefined,
        username: undefined,
        default_payment: undefined,

        source : 'tok_visa',
        card : undefined,
        customer : undefined,
        amount : undefined,
        redirect : false, 
        form : true, 
        charge : undefined, 
        totalDue : undefined,
        dueBy : 'Maria', // hardcoded for now no login
        dueTo : undefined,
        dueDate : undefined,
        caption : '',
        payIntent : undefined,
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    fetchAll = () => {
        fetch(url+'all')
        .then (blob => blob.json()).then(json => {
            let allPosts = json
            this.setState({
                allPosts : allPosts})
            })
        .then (
            fetch ("https://connect.stripe.com/oauth/token")
        )
    }

    componentDidMount() {
        this.fetchAll()
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createCustomerObject = () => {
        let post = {
            email : this.state.email,
            name : this.state.name,
            source : this.state.source
            }
        fetch(stripe + `customer`, {
            method:"POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        })
        .then (blob => blob.json()).then(json => {
            let customerObject = json
            console.log(customerObject)
            this.setState({
                card : customerObject['default_source'],
                customer : customerObject['id'],
                sources : customerObject['sources'],
                })
        }).then (()=> this.saveCustomer())
    }

    saveCustomer = () => {
        let post = {
            name : this.state.name, 
            username : this.state.username,
            password: this.state.password,
            customerID : this.state.customer,
            email : this.state.email,
            default_payment: this.state.card,
        }
        fetch(url + `save_customer`, {
            method:"POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        })
    }

    submit () {
        this.setState({
            password : document.getElementById("password").value,
            email : document.getElementById("email").value,
            username : document.getElementById("username").value,
            name : document.getElementById("first").value + " " + document.getElementById("last").value,
            login : true
            }
        , ()=>this.createCustomerObject())
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    stripePayIntent() {
        let post = {
            'totalDue' : this.state.totalDue,
            'card' : this.state.card,
            'customer': this.state.customer,
        }
        fetch (stripe + `payintent`, {
            method:"POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        }).then (blob => blob.json()).then(json => {
            let payIntent = json
            console.log("this is pay intent",payIntent)
            this.setState({
                payIntent : payIntent
                }, ()=>{this.postBill()})
        })
    }

    handlePost(e) {
        e.preventDefault()
        this.setState({
            totalDue: document.getElementById('totalDue').value,
            dueTo: document.getElementById('dueTo').value,
            caption: document.getElementById('caption').value,
            dueDate: document.getElementById('dueDate').value,
        }, ()=>this.stripePayIntent())
    }

    postBill() {
        let post = {
            'totalDue': this.state.totalDue, 
            'dueBy': this.state.dueBy, 
            'dueTo': this.state.dueTo,
            'caption': this.state.caption,
            'dueDate': this.state.dueDate,
            // 'card': this.state.card
        }
        fetch (url + `post`, {
            headers: {"Content-Type" : "application/json"}, 
            body: JSON.stringify(post),
            mode:"cors",
            method:"post"
        })
        .then(window.location.reload())
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this is the function that fires onclick the pay button from the dashboard
    pay(id) {
        //console.log("pay function fired with this id::", id)
        // fetch (url+`bills/${id}`)
        // .then (blob => blob.json()).then(json => {
        //     let bill = json
            this.toggleClass()
            this.setState({
                // allPosts : [bill], 
                payForm : true, 
                id : id})
            //console.log("this is BILL in pay(id)", this.state.allPosts)
            //console.log("LOOK AT MEEEEE",this.state.payForm)
        // })
    }
        
    stripeCharge() {
        let post = {
            "amount" : this.state.amountPaid,
            'customer': this.state.customer,
            'card' : this.state.card
        }
        fetch (stripe + `charge`, {
            method:"POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        }).then (blob => blob.json()).then(json => {
            let charge = json
            console.log(charge['id'])
            this.setState({
                charge : charge['id'],
                }, ()=>{this.postPayment()})
        })
    }

    handleInput(e) {
        e.preventDefault()
        this.setState({
            amountPaid: document.getElementById('amountPaid').value * 100,
            note: document.getElementById('note').value
        }, ()=>this.stripeCharge())
    }

    // just posts payment to dashboard
    postPayment() {
        let post = {
        'amountPaid': this.state.amountPaid, 
        'note': this.state.note,}
        fetch (url+`bills/${this.state.id}/pay`, {
            headers: {"Content-Type" : "application/json"}, 
            body: JSON.stringify(post),
            mode:"cors",
            method:"post"
        }).then(window.location.reload())
    }

    // retrieveCharge = () => {
    //     fetch (stripe + `charge/${this.state.charge}`)
    //     .then (blob => blob.json()).then(json => {
    //         let charge = json
    //         console.log(charge)
    //         })
    // }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // like(id) {
    //     console.log("LIKE button pressed with this id::", id)
    // }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
            activeTab: tab,
            });
        }
    }

    toggleClass() {
        const currentState = this.state.payButton;
        this.setState({ payButton: !currentState });
    };

    paidFormat(string,string2) {
        return string + " paid " + string2
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    render () {
        let posts = this.state.allPosts.map((element, i) => 
        {
        if (this.state.login)
            {return <div key={i}>
                <div className={element.bill_id === undefined ? "paycontainer" : "billcontainer"} >
                <Navbar>
            {/* <span><div className="icon"></div></span> */}
            <div>{element.due_by === undefined ? this.paidFormat(element.paid_by, element.bill_owner) : element.due_by}</div>
            <div>${element.total_due || element.amount_paid}</div>
            <div>{element.due_to || element.paid_to}</div>
            <div>{element.due_date ? (<div>Due on {element.due_date}</div>) : (<div className="comment"><ReactTimeAgo date = {element.created_on * 1000} timeStyle = "twitter"/></div>)}</div>
            </Navbar>
            <div className="comment">{element.caption || element.note}</div>
            <div>
            {
            element.due_by === undefined ? 
            (null) 
            :
            // (<button 
            //     id={element.bill_id} 
            //     className="paybutton" 
            //     onClick={()=>{this.pay(element.bill_id)}}>PAY</button>)


            // (<HandlePay 
            //     payform={this.state.payForm}
            //     id = {element.bill_id} 
            //     function = {()=>this.pay(element.bill_id)}
            //     handleInput = {(e)=>this.handleInput(e)}
            // />)
            
            (<div>
            <button className="width" onClick={()=>this.pay(element.bill_id)}><ExpansionPanel className='dropdown_container'>
            <ExpansionPanelSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <div className="dropdown_title">
            {this.state.payButton ? 'PAY': <div className="grey">CANCEL</div>} 
            </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <HandlePay 
                payform={this.state.payForm}
                id = {element.bill_id} 
                function = {()=>this.pay(element.bill_id)}
                handleInput = {(e)=>this.handleInput(e)}
            />
            </ExpansionPanelDetails>
            </ExpansionPanel></button>
            </div>)


            }
            </div>
            </div>
            </div>}
        else {return null}
        }
        )
        if (!this.state.login) { return <div>
            <form className="billcontainer">
                <p className="title">PERSONAL INFO</p>
                <input 
                    className = "input"
                    id = "first"
                    placeholder = "First Name"/>
                <input 
                    className = "input"                
                    id = "last"
                    placeholder = "Last Name"/>
                <input 
                    className = "input"
                    id = "email"
                    placeholder = "Email"/>
                <input 
                    className = "input"
                    id = "username"
                    placeholder = "Username"/>
                <input 
                    className = "input"
                    id = "password"
                    placeholder = "Password"/>
                <input 
                    className = "input"
                    id = "confirm"
                    placeholder = "Confirm Password"/>
                <p className="title">PAYMENT INFO</p>
                <input
                    className = "input"
                    placeholder = "Credit Card"/>
                <input
                    className = "input"
                    placeholder = "Expiry Month"/>
                <input
                    className = "input"
                    placeholder = "Expiry Year"/>
                <input
                    className = "input"
                    placeholder = "CVC"/>
                <button 
                    className = "paybutton"
                    onClick={()=>{this.submit()}}>SUBMIT
                </button>
                <button
                onClick={()=>this.test()}>
                    TEST
                </button>
                {/* <button 
                    className = "paybutton"
                    onClick = {()=>{this.signup()}}>
                    signup SUCESSFUL
                </button>
                <button 
                    className = "paybutton"
                    onClick = {()=>{this.badsignup()}}>
                    signup UNSUCESSFUL
                </button> */}
            </form>
        </div>}
        return (
            <div>
        <button className="paybutton" onClick = {()=>this.createCustomerObject()}>
        mimics customer sign in for now
        </button>
                <div>
                <Nav tabs style={{backgroundColor: 'rgba(248,80,50,1)', 
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
                {/* <MakePost/> */}
            <div className='paycontainer'>
                <form>
                    <input 
                    className='input'
                    id='totalDue'
                    placeholder='Enter Bill Amount'>
                    </input>
                    <br/>
                    <input 
                    className='input'
                    id='dueTo'
                    placeholder='Company'>
                    </input>
                    <br/>
                    <input 
                    className='input'
                    id='dueDate'
                    placeholder='Due Date'>
                    </input>
                    <br/>
                    <input 
                    className='input'
                    id='caption'
                    placeholder='Caption (Optional)'>
                    </input>
                    <br/>
                    <button 
                    className="postbillbutton"
                    type="submit"
                    onClick={(e)=>{this.handlePost(e)}}>
                    POST
                    </button>
                </form>
            </div>
            </TabPane>
            </TabContent>
            </div>
            </div>
        )
    }
}
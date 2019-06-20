import React from 'react';
import { Navbar } from 'reactstrap';
import ReactTimeAgo from 'react-time-ago/tooltip'
import Options from './Options'
import UserIcon from'./UserIcon'


const url = `http://127.0.0.1:5000/user`

export default class UserPage extends React.Component {
    constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
        allPosts: [],
        dropdownOpen: false,
        refresh: false,
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

    paidFormat(string,string2) {
        return string + " paid " + string2
    }
    
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
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
            <br/>
            <div> </div>
            {/* <div>{element.due_by === undefined ? 
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
                onClick={()=>{this.pay(element.bill_id)}}>PAY</button>)}</div> */}
            </div>
            </div>
        })
            return (
                <div>
                    <Options/>
                    <UserIcon/>
                    {/* <button 
                    className = "logout"
                    onClick= {()=>this.options()}>
                    OPTIONS
                    </button> */}
                    <div>{posts}</div>
                </div>
            )
    }
}
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
        contributors: false,
        login: true
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

    paidFormat(string,string2, string3, string4) {
        return string + " paid " + string2 + ' $' + string4 + ' for ' + string3 
    }

    postFormat(string, string2, string3) {
        return string + " owes $" + string2 + " to " +string3 
    }
    
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    contributors(string) {
        string = string.split(",")
        if (string.length === 1)
        {return string + " contributed"}
        else if (string.length === 2)
        {return string[0] + " and " + string[1] + " contributed"}
        else if (string.length === 3)
        {return string[0] + ", " + string[1] + ", and " + string[2] + " contributed"}
        else if (string.length > 3)
        // {return string.length + "people contributed"}
        { let contributor_list = string.map((person, i) => {return <div>{person}<br/></div>})
        return <div>
        <button onClick={()=>this.toggleContributors()}>
        <div style={{color:"white"}}>
        {string.length + " people contributed"}
        </div>
        </button>
        {this.state.contributors ? <div style={{color:"white", marginBottom:8}}>{contributor_list}</div> : (null)}
        </div>
    }}
    
    toggleContributors() {
        const currentState = this.state.contributors;
        this.setState({ contributors: !currentState });
    };

    money(string) {
        return "$"+string
    }

    render () {
        let posts = this.state.allPosts.map((element, i) => 
        {
        if (this.state.login)
            {return <div key={i}>
                <div className={element.bill_id === undefined ? "paycontainer" : "billcontainer"} >
                <Navbar>
            {/* <span><div className="icon"></div></span> */}
            <div className='ower'>
            {element.due_by === undefined ? 
            this.paidFormat(element.paid_by, element.paid_to, element.bill_owner, element.amount_paid) 
            : 
            this.postFormat(element.due_by, element.total_due, element.due_to)}</div>
            {/* <div>{element.due_date ? (null) : (<div className="comment"><ReactTimeAgo style={{width:80}} date = {element.created_on * 1000} timeStyle = "twitter"/></div>)}</div> */}
            </Navbar>
            <div className="comment">{element.caption || element.note}</div>
            <div className={element.bill_id === undefined ? "comment" : "due"}>{element.due_date ? (<div>Due{element.due_date}</div>) : (<div className="time"><ReactTimeAgo date = {element.created_on * 1000} timeStyle = "twitter"/></div>)}</div>
            <div>
            {element.contributors ? (<div className='dropdown_title_wide'> <div className="contributors">{this.contributors(element.contributors)} </div></div>) : (null)}
            </div>
            </div>
            </div>}
        else {return null}
        }
        )
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
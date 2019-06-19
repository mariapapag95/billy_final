import React from 'react'

function HandlePay (props) {
    if (!props.payform) {
        return <button 
            id={props.id} 
            className="paybutton" 
            onClick={props.function}>PAY</button>
    } else {
        return <div className='payform'>
        <form>
            <div>
            <input 
            className='input'
            id='amountPaid'
            placeholder='Enter $ amount'>
            </input>
            </div>
            <div>
            <input 
            className='input'
            id='note'
            placeholder='add note'>
            </input>
            </div>
            <div>
            <button 
            className="likebutton"
            type="submit"
            onClick={props.handleInput}>
            PAY
            </button>
            </div>
        </form>
    </div>
    }
}

export default HandlePay
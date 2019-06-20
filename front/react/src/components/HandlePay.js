import React from 'react'

function HandlePay (props) {
    if (!props.payform) {
        return <button 
            id={props.id} 
            className="dropdown" 
            onClick={props.function}>PAY</button>
    } else {
        return <div className='dropdown'>
        <form>
            <div>
            <input 
            className='dropdowninputamount'
            id='amountPaid'
            placeholder='$'
            />
            </div>
            <div>
            <input 
            className='dropdowninput'
            id='note'
            placeholder='add note'/>
            </div>
            <div>
            <button 
            className="confirmpaybutton"
            type="submit"
            onClick={props.handleInput}>
            CONFIRM
            </button>
            </div>
        </form>
    </div>
    }
}

export default HandlePay
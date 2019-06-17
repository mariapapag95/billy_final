import React from 'react'

function maria() {
    console.log("hello world")
}

function PayButton() {
    return(
        <div>
        <button id="pay button" className="button" onClick={maria()}>PAY</button>
        </div>
    )
}

export default PayButton;
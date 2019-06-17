import React from 'react'
import MakePay from './MakePay';

function PayForm(props) {
    if (props.hidden === false) {
        return null
    } else {
        return (
            <MakePay/>
        )
    }
}

export default PayForm;
// import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <div style={{margin:"220px",marginLeft:"500px", color:"black"}}>
            <h1 textTransform={"uppercase"}> Payment Successfull</h1>
            <p>
                Note the Reference No: {referenceNum}
            </p>
        </div>
    )
}

export default PaymentSuccess
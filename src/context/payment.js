import {
    createContext, useCallback, useContext, useEffect, useState,
} from 'react'

export const PaymentContext = createContext()

export const PaymentProvider = (props) => {
    const [paymentForm, setPaymentForm] = useState({"cardnumber": 'undefined'})
    const { children } = props
    const DataPayment = (value) => {
       setPaymentForm(value)
    }
    return (
        <PaymentContext.Provider
            value={{
                paymentForm,
                DataPayment
            }}>
            {children}
        </PaymentContext.Provider>
    )
}
export const PaymentSet = () => useContext(PaymentContext)
  
export default PaymentContext
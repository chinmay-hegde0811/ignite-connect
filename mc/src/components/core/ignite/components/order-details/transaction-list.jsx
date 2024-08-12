import PropTypes from "prop-types"

const TransactionList = ({transactionList}) => {
  return (
    <>
        {transactionList.map((transaction) => (
            <div key={transaction.id} className="transaction-list">
                <p>
                    <span>{JSON.parse(transaction.payload).capturedAmount || JSON.parse(transaction.payload).refundedAmount || JSON.parse(transaction.payload).voidAmount}</span>
                </p>
                <p>
                    <span className="status-field">{transaction.action}</span>
                </p>
                <p><span>{new Date(transaction.createdAt).toLocaleDateString()}</span></p>
            </div>
        ))}
    </>
  )
}

export default TransactionList

TransactionList.propTypes = {
    transactionList: PropTypes.array
};
import Table from "./table/Table"

const Order = ({order}) => {
    return (
        <div className="admin__order">
            <Table order={order}></Table>
        </div>
    )
}

export default Order
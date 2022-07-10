import Table from "./table/Table"

const Product = ({product}) => {
    return (
        <div className="admin__user">
            <Table product={product}></Table>
        </div>
    )
}

export default Product
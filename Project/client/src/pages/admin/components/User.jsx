import Table from "./table/Table"

const User = ({users}) => {
    return (
        <div className="admin__user">
            <Table users={users}></Table>
        </div>
    )
}

export default User
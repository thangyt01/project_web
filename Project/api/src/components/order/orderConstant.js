function orderResponseFormat(e){
    return {
        id: e.id,
        user: {
            user_id: e.user_id,
            firstname: e.firstname,
            lastname: e.lastname,
            phone: e.phone,
            address: e.address
        },
        order: {
            order_id: e.order_id,
            status: e.status,
            detail: [
                {
                    product_id: e.product_id,
                    name: e.name,
                    color: e.color,
                    quantity: e.quantity,
                    total_cost: e.total_cost
                }
            ],
            total_cost: e.total_cost
        },
        date: e.date,
        month: e.month,
        year: e.year,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
    }
}

module.exports = {
    orderResponseFormat
}
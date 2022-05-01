const models = require('../index')

//format query truyền vào hàm find. Hãy viết hàm buildQuery biến object query thành 
//1 câu query như 'select A.a, A.b, A.c... from A leftjoin B on A.a = B.a where .... group by .... having ... order by ...
// query = {
//     attributes: ['a', 'b', 'c'],
//     table: 'A',
//     includes: [
//         {
//             attributes: ['a', 'b', 'c'],
//             table: 'B',
//             on: 'A.a = B.a',
//             type: 'left join'
//         },
//         {
//             attributes: ['a', 'b', 'c'],
//             table: 'C',
//             on: 'A.b = C.b',
//             type: 'inner join'
//         }
//     ],
//     where: "A.c < 10 and C.a = 'Hehe'",
//     offset: 10, //bỏ qua 10 phần tử
//     limit: 10, //tối đa 10 phần tử,
//     orderBy: {
//         "A.a": "DESC",
//     },
//     groupBy: ['a.a', 'a.b'],
//     having: ['COUNT(a.a) > 5']
// }

function buildQuery(params) {
    let {
        attributes = [],
        table = null,
        includes = [],
        where = 1,
        offset = null,
        limit = null,
        orderBy = null,
        groupBy = [],
        having = [],
        type = null
    } = params;
    let query = '';

    if (!type) {
        return {
            error: true,
            message: "[database][service] Kiểu truy vấn không xác định, type = null",
            data: {}
        }
    }
    if (!table) {
        return {
            error: true,
            message: "[database][service] Chưa xác định được table, table = null",
            data: {}
        }
    }

    type = type.toLowerCase();
    if (type === 'select') {
        let atts = '';
        let join = '';
        atts = setAttributies(table, attributes);
        includes.map(item => {
            if (!item.table){
                return {
                    error: true,
                    message: "[database][service] Join bảng không hợp lệ, table = null",
                    data: {}
                }
            }
            atts += ', ' + setAttributies(item.table, item.attributes || []);
            join += item.type + ' ' + item.table + ' on ' + item.on + ' ';
        })
        query = 'select ' + atts + ' from ' + table + ' ' + join  + ' where ' + where;

        if(orderBy){
            query += ' order by ' + Object.keys(orderBy)[0] + ' ' + Object.values(orderBy)[0];
        }
        if(groupBy.length > 0){
            query += ' group by ' + groupBy.join(', ');
        }
        if(having.length > 0){
            query += ' having ' + having.join(', ');
        }
        if(limit){
            query += ' limit ' + limit;
        }
        if(offset){
            query += ' offset ' + offset;
        }
    }
    return query;
}

function setAttributies(tableName, attributes = []){
    if (!tableName) {
        return {
            error: true,
            message: "[database][service][setAttributies] Chưa xác định được tableName, tableName = null",
            data: {}
        }
    }
    if (attributes.length === 0) {
         return `${tableName}.*`;
    }
    return attributes.map(att => tableName + "." + att).join(', ');
}

function find(query = {}) {
    return new Promise((resole, reject) => {
        query = buildQuery({ ...query, type: 'select' });
        if (query.error) {
            reject(query);
        }
        try {
            models.query(query, function (err, results, fields) {
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
                if (err) {
                    reject(err);
                }
                resole(results);
            });
        } catch (error) {
            resole(error)
        }
    })
}

function update(query = {}) {
    return new Promise((resole, reject) => {
        query = buildQuery({ ...query, type: 'select' });
        if (query.error) {
            reject(query);
        }
        try {
            models.query(query, function (err, results, fields) {
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
                if (err) {
                    reject(err);
                }
                resole(results);
            });
        } catch (error) {
            resole(error)
        }
    })
}
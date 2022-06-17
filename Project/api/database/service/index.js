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
//     having: ['COUNT(a.a) > 5'],
    // data: {
    //     a: 'c',
    //     b: 'a'
    // }
// }

function buildQuery(params) {
    let {
        attributes = [],
        table = null,
        tableAttributes = 1,
        includes = [],
        where = 1,
        offset = null,
        limit = null,
        orderBy = null,
        groupBy = [],
        having = [],
        data = {},
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
        atts = setAttributies(table, attributes, tableAttributes);
        includes.map(item => {
            if (!item.table){
                return {
                    error: true,
                    message: "[database][service] Join bảng không hợp lệ, table = null",
                    data: {}
                }
            }
            atts += ', ' + setAttributies(item.table, item.attributes || [], tableAttributes);
            join += item.type + ' ' + item.table + ' ON ' + item.on + ' ';
        })
        query = 'SELECT ' + atts + ' FROM ' + table + ' ' + join  + ' WHERE ' + where;

        if(groupBy.length > 0){
            query += ' GROUP BY ' + groupBy.join(', ');
        }
        if(having.length > 0){
            query += ' HAVING ' + having.join(', ');
        }
        if(orderBy){
            query += ' ORDER BY ' + orderBy;
        }
        if(limit){
            query += ' LIMIT ' + limit;
        }
        if(offset){
            query += ' OFFSET ' + offset;
        }
    }
    if(type === 'update'){
        let set = Object.keys(data).map(item => `${item} = '${data[item]}'`).join(', ');
        query = 'UPDATE ' + table + ' SET ' + set + ' WHERE ' + where;
    }
    if(type === 'create'){
        let cols = Object.keys(data).join(', ');
        let values = Object.values(data);
        values = values.map(i => `'${i}'`)
        values = Object.values(values).join(', ');
        query = 'INSERT INTO ' + table + ' (' + cols + ') VALUES (' + values + ')';
    }
    if(type === 'destroy'){
        query = 'DELETE FROM ' + table + ' WHERE ' + where;
    }
    console.log("buildQuery " , query);
    return query;
}

function setAttributies(tableName, attributes = [], tableAttributes){
    if(!tableAttributes){
        return attributes.join(', ')
    }
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

function execQuery(resole, reject, query, logging = false){
    try {
        models.query(query, function (err, results) {
            if (logging) console.log(results); // results contains rows returned by server
            if (err) {
                reject(err);
            }
            resole(results);
        });
    } catch (error) {
        resole(error);
    }
}

function find(query = {}) {
    let {logging = false, ...rest} = query
    return new Promise((resole, reject) => {
        query = buildQuery({ ...rest, type: 'select' });
        if (query.error) {
            reject(query);
        }
        execQuery(resole, reject, query, logging);
    })
}

function update(query = {}) {
    let {logging = false, ...rest} = query
    return new Promise((resole, reject) => {
        query = buildQuery({ ...rest, type: 'update' });
        if (query.error) {
            reject(query);
        }
        execQuery(resole, reject, query, logging);
    })
}

function create(query = {}) {
    let {logging = false, ...rest} = query
    return new Promise((resole, reject) => {
        query = buildQuery({ ...rest, type: 'create' });
        if (query.error) {
            reject(query);
        }
        execQuery(resole, reject, query, logging);
    })
}

function destroy(query = {}) {
    let {logging = false, ...rest} = query
    return new Promise((resole, reject) => {
        query = buildQuery({ ...rest, type: 'destroy' });
        if (query.error) {
            reject(query);
        }
        execQuery(resole, reject, query, logging);
    })
}

module.exports = {
    find,
    create,
    update,
    destroy
}
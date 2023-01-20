
const db = require("./db-config");

module.exports = {
    findAktor,
    findAktorById,
    addAktor,
    updateAktor,
    deletAktor, 
};


function findAktor() {
    return db('aktor');
}

function findAktorById(id){
    return db("aktor").where({id}).first();
}

function addAktor(yeniAktor) {
    return db("aktor")
    .insert(yeniAktor, "id")
    .then(([id]) => {
      return db("aktor").where({ id }).first();
    });
}
function updateAktor(updateAktor, id){
    return db("aktor")
    .update(updateAktor)
    .where({id})
    .then((updated) => {
        if(updated){
            return db("aktor").where({id}).first();
        }
    });
}

function deletAktor(id){

    return db("aktor").del().where({id});
}
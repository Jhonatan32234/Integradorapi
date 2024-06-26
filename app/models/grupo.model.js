const sql = require('./db.js');

const Grupo = function(grupo){
    this.nombreGrupo = grupo.NombreGrupo;
    this.materias = JSON.stringify(grupo.Materias);
   
}

Grupo.create = (newGrupo,result)=>{
    sql.query('INSERT INTO grupo set ?',newGrupo,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Grupo: ", { id: res.insertId, ...newGrupo });
        result(null, { id: res.insertId, ...newGrupo });
    })
}

Grupo.getAll = (nombre, result) => {
    let query = "SELECT * FROM grupo";
  
    if (nombre) {
      query += ` WHERE NombreGrupo LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Grupo: ", res);
      result(null, res);
    });
  };

  Grupo.remove = (id, result) => {
    sql.query("DELETE FROM grupo WHERE idGrupo = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Grupo with idGrupo: ", id);
      result(null, res);
    });
  };
  
  Grupo.updateById = (id, grupo, result) => {
    sql.query(
      "UPDATE grupo SET NombreGrupo = ?, Materias = ? WHERE idGrupo = ?",
      [grupo.nombreGrupo, grupo.materias, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Grupo: ", { id: id, ...grupo });
        result(null, { id: id, ...grupo });
      }
    );
  };

  module.exports = Grupo;
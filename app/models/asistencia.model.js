const sql = require('./db.js');

const Asistencia = function(asistencia){
    this.fecha = asistencia.Fecha;
    this.asistio = asistencia.Asistio;
    
}

Asistencia.create = (newAsistencia,result)=>{
    sql.query('INSERT INTO asistencia set ?',newAsistencia,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Asistencia: ", { id: res.insertId, ...newAsistencia });
        result(null, { id: res.insertId, ...newAsistencia });
    })
}

Asistencia.getAll = (fecha, result) => {
    let query = "SELECT * FROM asistencia";
  
    if (fecha) {
      query += ` WHERE Fecha LIKE '%${fecha}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Asistencia: ", res);
      result(null, res);
    });
  };

  Asistencia.remove = (id, result) => {
    sql.query("DELETE FROM asistencia WHERE idAsistencia = ?", id, (err, res) => {
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
  
      console.log("deleted Asistencia with idAsistencia: ", id);
      result(null, res);
    });
  };
  
  Asistencia.updateById = (id, asistencia, result) => {
    sql.query(
      "UPDATE asistencia SET Fecha = ?, Asistio = ? WHERE idAsistencia = ?",
      [asistencia.fecha, asistencia.asistio, id],
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
  
        console.log("updated Asistencia: ", { id: id, ...asistencia });
        result(null, { id: id, ...asistencia });
      }
    );
  };

  module.exports = Asistencia;
const sql = require('./db.js');

const Actividad = function(actividad){
  console.log('Guardado'+actividad.NombreActividad)
    this.nombreActividad = actividad.NombreActividad;
    this.valorActividad = actividad.ValorActividad;
    this.calificacionActividad = actividad.CalificacionActividad;
}

Actividad.create = (newActividad,result)=>{
  console.log(newActividad)
 console.log("Creacion"+newActividad.NombreActividad)
    sql.query('INSERT INTO actividad set ?',newActividad,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Actividad: ", { id: res.insertId, ...newActividad });
        result(null, { id: res.insertId, ...newActividad });
    })
}

Actividad.getAll = (nombre, result) => {
    let query = "SELECT * FROM actividad";
  
    if (nombre) {
      query += ` WHERE NombreActividad LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Actividad: ", res);
      result(null, res);
    });
  };

  Actividad.remove = (id, result) => {
    console.log("id---"+id)
    sql.query("DELETE FROM actividad WHERE idActividad = ?", id, (err, res) => {
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
  
      console.log("deleted Actividad with idActividad: ", id);
      result(null, res);
    });
  };
  
  Actividad.updateById = (id, actividad, result) => {
    console.log(actividad)
    sql.query(
      "UPDATE actividad SET NombreActividad = ?, ValorActividad = ?, CalificacionActividad = ? WHERE idActividad = ?",
      [actividad.nombreActividad, actividad.valorActividad, actividad.calificacionActividad, id],
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
  
        console.log("updated Actividad: ", { id: id, ...actividad });
        result(null, { id: id, ...actividad });
      }
    );
  };

  module.exports = Actividad;
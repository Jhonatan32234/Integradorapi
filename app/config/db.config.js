module.exports = {
  HOST: "44.223.221.177",
  USER: "mysql",
  PASSWORD: "c4r4j0f3rn4n",
  DB: "testdb",
  dialect:"mysql",
  pool:{
    max:5,
    min: 0,
    acquire:30000,
    idle:10000
  }
};


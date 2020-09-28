const Sequelize = require('sequelize');

const sequelize = new Sequelize('delidbs', 'dbadmin', 'dbadmin', {    
  host: 'localhost'
  ,dialect: 'mysql'
  ,logging: false
  ,define: {
    timestamps: false
  }
});

// dishes
const dishes = sequelize.define('dishes', {
    id: {
        type: Sequelize.SMALLINT
        ,autoIncrement: true
        ,primaryKey: true
    },
    dishName: {
        type: Sequelize.STRING
        ,unique: true
    }
    ,description: {type: Sequelize.STRING}
    ,price: {type: Sequelize.REAL}
    ,requestedBy: {type: Sequelize.STRING}
  },{
    timestamp: false
  });

  function getDishes() {
    return dishes.findAll()
  };

  function dishById(dishId) {
    return dishes.findOne({
        where: {
            id: dishId
        }
    })
  };

  function newDish(req) {
    return dishes.create({
        dishName: req.body.dishName
        ,description: req.body.description
        ,price: req.body.price
        ,requestedBy: req.body.requestedBy
    })
  };

  function updateDish(req) {
    return dishes.update({
      dishName: req.body.dishName
      ,description: req.body.description
      ,price: req.body.price
      ,requestedBy: req.body.requestedBy
    } 
    ,{
        where: {
            id: req.params.id
        }
    })
  };

  function destroyDish(req) {
    return dishes.destroy({
        where: {
            id: req.params.id
        }
    })
  };
  
  module.exports =  {getDishes, dishById, newDish, updateDish, destroyDish, dishes};
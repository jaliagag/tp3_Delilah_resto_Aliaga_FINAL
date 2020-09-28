const Sequelize = require('sequelize');

const sequelize = new Sequelize('delidbs', 'admin', 'admin', {
  host: 'localhost'
  ,dialect: 'mysql'
  ,logging: false
  ,define: {
    timestamps: false
}
});

// orders
const ordersndishes = sequelize.define('ordersndishes', {
    orderId: {
        type: Sequelize.SMALLINT
        ,foreignKey: true
        ,primaryKey: true
    },
    dishId: {
        type: Sequelize.SMALLINT
        ,foreignKey: true
        ,primaryKey: true
    }
    ,dishQ: {
        type: Sequelize.SMALLINT
    }
    ,dishPrice: {
        type: Sequelize.REAL
    }
  },{
    timestamp: false
  });

  function getByOrderId(idOrder) {
    return ordersndishes.findOne({
        where: {
            orderId: idOrder
        }
    })
  };

  function addOrderDish(req, idOrder) {
    return ordersndishes.create({
        orderId: idOrder
        ,dishId: req.dishId
        ,dishQ: req.dishQ
        ,dishPrice: req.dishPrice
    })
  };

  function deleteOrderDish(idOrder) {
    return ordersndishes.destroy({
        where: {
            orderId: idOrder
        }
    })
  };
  
  module.exports =  { getByOrderId, addOrderDish, deleteOrderDish, ordersndishes};
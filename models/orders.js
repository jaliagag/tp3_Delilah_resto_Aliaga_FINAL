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
const orders = sequelize.define('orders', {
    id: {
        type: Sequelize.SMALLINT
        ,primaryKey: true
        ,autoIncrement: true
    },
    userId: {
        type: Sequelize.SMALLINT
        ,foreignKey: true
    }
    ,date: {type: Sequelize.DATE}
    ,payMethod: {type: Sequelize.STRING}
    ,status: {type: Sequelize.INTEGER}
    ,price: {type: Sequelize.INTEGER}
    ,userAddress: {type: Sequelize.STRING}
    ,userPhone: {type: Sequelize.STRING}
  },{
    timestamp: false
  });

  function getOrders() {
    return orders.findAll()
  }

  function orderById(userId) {
    return orders.findOne({
        where: {
            id: userId
        }
    })
  };

  function newOrder(req) {
    return orders.create({
        userId: req.body.userId
        ,date: req.body.date
        ,payMethod: req.body.payMethod
        ,status: req.body.status
        ,price: req.body.price
        ,userAddress: req.body.userAddress
        ,userPhone: req.body.userPhone
    })
  };

  function updateOrder(req) {
    return orders.update({
        status: req.body.status
    }
    ,{
        where: {
            id: req.params.id
        }
    })
  };

  function cancelOrder(req) {
    return orders.destroy({
        where: {
            id: req.params.id
        }
    })
  };
  
  module.exports =  {getOrders, orderById, newOrder, updateOrder, cancelOrder, orders};
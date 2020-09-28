const Sequelize = require('sequelize');

const sequelize = new Sequelize('delidbs', 'dbadmin', 'dbadmin', {
  host: 'localhost'
  ,dialect: 'mysql'
  ,logging: false
  ,define: {
    timestamps: false
}
});

// users
const users = sequelize.define('users', {
  id: {
        type: Sequelize.SMALLINT
        ,autoIncrement: true
        ,primaryKey: true
    },
    userNickname: {
        type: Sequelize.STRING
        ,unique: true
    }
    ,userName: {type: Sequelize.STRING}
    ,userLastname: {type: Sequelize.STRING}
    ,userEmail: {type: Sequelize.STRING}
    ,userPhone: {type: Sequelize.STRING}
    ,address: {type: Sequelize.STRING}
    ,password: { type: Sequelize.STRING}
    ,role: {type: Sequelize.SMALLINT}
  },{
    timestamps: false
  });

  function getUsers() {
    return users.findAll()
  };

  function userById(userId) {
    return users.findOne({
        where: {
            id: userId
        }
    })
  };

  function newUser(req) {
    return users.create({
        userNickname: req.body.userNickname
        ,userName: req.body.userName
        ,userLastname: req.body.userLastname
        ,userEmail: req.body.userEmail
        ,userPhone: req.body.userPhone
        ,address: req.body.address
        ,password: req.body.password
    })
  };

  function updateUser(req) {
    return users.update({
        userNickname: req.body.userNickname
        ,userName: req.body.userName
        ,userLastname: req.body.userLastname
        ,userEmail: req.body.userEmail
        ,userPhone: req.body.userPhone
        ,address: req.body.address
        ,password: req.body.password
    }
    ,{
        where: {
            userNickname: req.params.userNickname
        }
    })
  };

  function destroyUser(userId) {
    return users.destroy({
        where: {
            id: userId
        }
    })
  };

  function searchNickname(nickName){
    return users.findOne({
      where:{
        userNickname: nickName
      }
    })
  }; 
  module.exports =  {getUsers, userById, newUser, updateUser, destroyUser, searchNickname, users};
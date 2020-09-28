const Sequelize = require('sequelize');

const sequelize = new Sequelize('delidbs', 'dbadmin', 'dbadmin', {    
  host: 'localhost'
  ,dialect: 'mysql'
  ,logging: false
  ,define: {
    timestamps: false
  }
});

sequelize.authenticate()
.then(() => {
  console.log('Conectado')
})
.catch(err => {
  console.log('No se conecto')
})

// roles
const roles = sequelize.define('roles', {
  id: {
        type: Sequelize.SMALLINT
        ,primaryKey: true
    },
    roleName: {
        type: Sequelize.STRING
        ,unique: true
    }
  },{
    timestamps: false
  })

function getRoles() {
    return roles.findAll()
  }

  function roleById(roleId) {
    return roles.findOne({
        where: {
            id: roleId
        }
    })
  };

  function newRole(req) {
    return roles.create({
        role: req.body.role
    })
  };

  function updateRole(req) {
    return roles.update({
        role: req.body.role
    }
    ,{
        where: {
            id: req.params.id
        }
    })
  };

  function destroyRole(req) {
    return roles.destroy({
        where: {
            id: req.params.id
        }
    })
  };
  
  module.exports =  {getRoles, roleById, newRole, updateRole, destroyRole, roles};
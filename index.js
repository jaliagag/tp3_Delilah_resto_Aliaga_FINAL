const express = require('express');
const bodyParser = require('body-parser');
const key = require('./secretKey');
const port = process.env.PORT || 3000;
const app = express();
const jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('delidbs', 'dbadmin', 'dbadmin', {    
  host: 'localhost'
  ,dialect: 'mysql'
  ,logging: false
  ,define: {
    timestamps: false
}
});

sequelize.sync({ force: false })
.then(()=>{
    console.log('Tablas sincronizadas')
});

sequelize.sync({ force: false })
.then(()=>{
    console.log('Tablas sincronizadas')
});

const Dish = require('./models/dishes');
const Order = require('./models/orders');
const User = require('./models/users');
const Role = require('./models/roles');
const Ordersndish = require('./models/ordersndishes');

// #########################################################################
//                               MIDDLEWARES
// #########################################################################

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const verificame = express.Router();

verificame.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, key, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: "invalid token" });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: "missing token." 
      });
    }
 });

 const whatrole = express.Router();
 whatrole.use((req, res, next)=>{
    return User.searchNickname(req.body.userNickname)
    .then(function (users) {
        if (users){
            if(users.toJSON().role==1){
                next();
            } else {
                console.log("not enough privileges");
                res.send("Access denied")
            }
        } else {
            console.log('No such user exists');
            res.send("Access denied");
        }
    })
})

// #########################################################################
//                               MIDDLEWARES
// #########################################################################

// #########################################################################
//                                  USERS
// #########################################################################

app.post('/register', async (req, res)=>{
    const user = await User.newUser(req.body);
    res.json(user);
});

app.post('/login', (req, res)=>{
    return User.searchNickname(req.body.userNickname)
    .then(function (users) {
        if (users){
            if (users.toJSON().password==req.body.password){
                const payload = {
                check:  true
                };
                const token = jwt.sign(payload, key);
                res.json({
                mensaje: "Correct authentication"
                ,token: token
                });
            } else {
                res.json({ mensaje: "Wrong password"})
            }
        }else{
            res.json({ mensaje: "User doesn't exist"})
        }
    })
});

app.get('/users', verificame, whatrole, async(req, res)=>{
    const user = await User.getUsers();
    res.json(user);
})

app.get('/users/:id', verificame, async(req, res)=>{
    const user = await User.userById(req.params.id);
    res.json(user);
});

app.post('/users', async(req, res)=>{
    const user = await User.newUser(req);
    res.json(user);
});

app.put('/users/:userNickname', verificame, async(req, res)=>{
    if (req.body.requestedBy == req.params.userNickname){
        return User.updateUser(req)
        .then((User)=>{
            if (User){
                res.send('user has been successfully updated')
            } else {
                res.send('Oops something went wrong when updating the user')
            }
        })
        .catch(err=>res.send(err));
    } else {
        res.send("You rogue, what are you trying to do? it ain't you!");
    }
});

// #########################################################################
//                      ^^^^^^^^^ USERS ^^^^^^^^^
// #########################################################################

// #########################################################################
//                                  ROLES
// #########################################################################

app.post('/roles', verificame, async (req, res)=>{
    const roles = await Role.newRole(req);
    res.json(roles);
});

app.get('/roles', verificame, whatrole, async (req, res)=>{
    const roles = await Role.getRoles();
    res.json(roles);   
});

// #########################################################################
//                      ^^^^^^^^^ ROLES ^^^^^^^^^
// #########################################################################

// #########################################################################
//                                  DISHES
// #########################################################################

app.get('/dishes', async (req, res)=>{
    const dishes = await Dish.getDishes();
    res.json(dishes);   
});

app.get('/dishes/:id', verificame, async(req, res)=>{
    const dishes = await Dish.dishById(req.params.id);
    res.json(dishes);
});

app.post('/dishes', verificame, whatrole, async (req, res)=>{
    const dishes = await Dish.newDish(req);
    res.json(dishes);
});

app.put('/dishes/:id', verificame, whatrole, async (req, res)=>{
    return Dish.updateDish(req)
    .then(function (Dish){
        if (Dish) {
            res.sendStatus(200).res.send('Success updating dish ' + req.params.id);
        } else {
            res.sendStatus(404).res.send('Oops! Something went wrong when updating that dish');
        }
    })
    .catch(err=>res.send(err + ' - No such dish available'))
})

app.delete('/dishes/:id', verificame, whatrole, async(req, res)=>{
    return Dish.destroyDish(req)
    .then(function(Dish){
        if (Dish) {
            res.send('Dish ' +req.params.id + ' successfully removed from the database')
        } else {
            res.send('Oops! Something went wrong when removing that dish from the database')
        }
    })
    .catch(err=>res.send(err + ' - No such dish available'))
})

// #########################################################################
//                                  DISHES
// #########################################################################

// #########################################################################
//                                  ORDERS
// #########################################################################

app.get('/orders', verificame, whatrole, async(req,res)=>{
    const orders = await Order.getOrders(req);
    res.json(orders);
})

app.get('/orders/:id', verificame, whatrole, async (req, res)=>{
    const orders = await Order.orderById(req.params.id);
    res.json(orders);
})

app.post('/orders', verificame, (req,res)=>{
    return Order.newOrder(req)
    .then(function (orders) {
        if (orders) {
            req.body.Dish.forEach(element => {
                return Dish.dishById(element.id)  
                .then(function(dishes){
                    if (dishes){                  
                        return Ordersndish.addOrderDish(element, orders.toJSON().id)
                        .then(function(Ordersndish){
                            res.send(Ordersndish);
                            res.send(orders);
                        })                                                          
                    }else{
                        res.status(400).send('No such dish id ' + element.id_dish);
                    }
                    
                });   
            });
        
        } else {
            res.status(400).send('Error in insert new record');
        }
    })
    .catch(err=>res.status(400).send(err));      
        
});

app.put('/orders/:id', verificame, whatrole, async (req, res)=>{
    return Order.updateOrder(req)
    .then(function (Order){
        if (Order) {
            res.sendStatus(200).res.send('Success updating order ' + req.params.id);
        } else {
            res.sendStatus(404).send('Oops! Something went wrong when updating that order')
        }
    })
    .catch(err=>res.send(err + ' - No such order'))
})

app.delete('/orders/:id', verificame, whatrole, async (req, res)=>{
    return Order.cancelOrder(req)
    .then(function (Order){
        if (Order) {
            res.sendStatus(200).res.send('Success updating order ' + req.params.id);
        } else {
            res.sendStatus(404).send('Oops! Something went wrong when updating that order')
        }
    })
    .catch(err=>res.send(err + ' - No such order'))
})

// #########################################################################
//                                  ORDERS
// #########################################################################

// errores genéricos

app.use((err, req, res, next)=> {
    if(!err) return next();
    console.log('Error, something went wrong ', err);
    res.status(500).send('Error');
});

// iniciar servidor

app.listen(port, ()=>{
    console.log('Server started on port '+ port)
})
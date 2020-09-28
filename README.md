# Delilah Resto API

## Requesites

To test this API, you'll need to have NodeJS installed on your local machine as well as a text editor (SublimeText, VSCode, Atom...), Postman (or Insomnia) and a way viewing the database, either via CLI or PHPMyAdmin (Xampp, Wampp...)

Open up a Terminal and `cd` into the folder where the repository is hosted. Run this command:

```js
npm i mysql2 express body-parser sequelize jsonwebtoken

node index.js
```

Using your preferred method of interacting with MySQL, create a new user using the information under `db > db.js`. For instance, if you are using CLI, run the following:

```sql
CREATE USER 'dbadmin' IDENTIFIED BY 'dbadmin';

GRANT ALL PRIVILEGES ON * . * TO 'dbadmin';

FLUSH PRIVILEGES;

CREATE DATABASE delidbs;
```

That would create a user with all privileges and a database called 'delidbs'.

## Actions

To test the API, you can import the Postman collection on this [repository](tp3_Delilah_resto_Aliaga_FINAL.postman_collection.json) or make your own collection.

### Create User

Use the POST method and the endpoint <http:127.0.0.1/users/>. Input the required information under `Body > x-www-form-urlencoded` with at least these values:

```md
> userNickname
> userName
> userLastname
> userEmail
> userPhone
> address
> password
```

By default the role will be 'user', rather than admin. The database already has an user loaded:

- userNickname: dbadmin
- userPassword: dbadmin

### Login

Use the POST method and the endpoint <http:127.0.0.1/login/>. Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> userNickname
> password
```

You will receive a token if the information is correct. Copy it.

### Create Order

Use the POST method and the endpoint <http:127.0.0.1/orders/>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> userId
> date
> payMethod
> status
> price
> userAddress
> userPhone
```

### Create Dish - Only Admins

Use the POST method and the endpoint <http:127.0.0.1/dishes/>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> dishName
> description
> price
> requestedBy
> userNickname
```

ONLY **userNickname** THAT ARE ADMINS WILL BE ABLE TO CREATE DISHES.

### Update User

Use the PUT method and the endpoint <http:127.0.0.1/users/:userNickname>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> :values_to_be_updated
> requestedBy
```

### Update Order - Only Admins

Use the PUT method and the endpoint <http:127.0.0.1/orders/:orderId>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> status
> userNickname
```

ONLY **userNickname** THAT ARE ADMINS WILL BE ABLE TO UPDATE ORDERS.

### Update Dish - Only Admins

Use the PUT method and the endpoint <http:127.0.0.1/dishes/:dishId>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> :values_to_be_updated
> userNickname
```

ONLY **userNickname** THAT ARE ADMINS WILL BE ABLE TO UPDATE DISHES.

### Get All Users - Only Admins

Use the GET method and the endpoint <http:127.0.0.1/users>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> userNickname
```

ONLY **userNickname** THAT ARE ADMINS WILL BE ABLE TO SEE ALL USERS.

### Get All Orders - Only Admins

Use the GET method and the endpoint <http:127.0.0.1/orders>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> userNickname
```

ONLY **userNickname** THAT ARE ADMINS WILL BE ABLE TO SEE ALL USERS.

### Get All Dishes

Use the GET method and the endpoint <http:127.0.0.1/dishes>.

### Delete Dish - Only Admins

Use the DELETE method and the endpoint <http:127.0.0.1/dishes/:id>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> userNickname
```

ONLY **userNickname** THAT ARE ADMINS WILL BE ABLE TO SEE ALL USERS.

### Delete Order - Only Admins

Use the DELETE method and the endpoint <http:127.0.0.1/orders/:id>.

- Under Headers, input as **KEY** `access-token` and as **VALUE** the token generated when using the **Login** endpoint
- Input the required information under `Body > x-www-form-urlencoded` with these values:

```md
> userNickname
```

ONLY **userNickname** THAT ARE ADMINS WILL BE ABLE TO SEE ALL USERS.

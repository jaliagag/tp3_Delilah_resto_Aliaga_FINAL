module.exports = {
    CREATE USER 'dbadmin' IDENTIFIED BY 'dbadmin';
    GRANT ALL PRIVILEGES ON * . * TO 'dbadmin';
    FLUSH PRIVILEGES;
    CREATE DATABASE delidbs;
}
-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS users;
CREATE TABLE users 
(
	id serial PRIMARY KEY,
	firstname varchar(20),
	lastname varchar(20),
	email varchar(30)
);

INSERT INTO users (firstname, lastname, email) 
values
( 'John', 'Smith', 'John@Smith.com'),
( 'Dave', 'Davis', 'Dave@Davis.com'),
( 'Jane', 'Janis', 'Jane@Janis.com');

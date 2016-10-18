INSERT INTO users
(firstname, lastname, email)
VALUES ($1, $2, $3)
RETURNING id, firstname, lastname, email;
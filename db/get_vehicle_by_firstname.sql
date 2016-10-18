SELECT * FROM vehicles
JOIN users ON ownerId = users.id
WHERE users.firstname like $1;
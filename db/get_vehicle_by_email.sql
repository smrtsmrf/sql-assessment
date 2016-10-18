SELECT * FROM vehicles
JOIN users ON ownerId = users.id
WHERE users.email = $1;
SELECT make, model, year, users.firstname, users.lastname FROM vehicles
JOIN users ON ownerId = users.id
WHERE vehicles.year > $1
ORDER BY year desc;
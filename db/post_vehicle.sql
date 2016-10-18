INSERT INTO vehicles
(make, model, year, ownerId)
VALUES ($1, $2, $3, $4)
RETURNING id, make, model, year, ownerId;
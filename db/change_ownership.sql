UPDATE vehicles
SET ownerId = $2
WHERE id= $1;
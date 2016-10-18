UPDATE vehicles
SET ownerId = null
WHERE id= $1;
# Rückenprobleme (🪙Shop API) Docs

Shop backend (Project for SII Apprenticeships)

## API

http://localhost:80/products → GET → List all products

http://localhost:80/products?q=[name] → GET → Search product by name

http://localhost:80/products/[_id] → GET → Show one product with matching \_id

http://localhost:80/products/add → POST → Insert new product (from given data) to collection

http://localhost:80/products/[_id] → PUT/PATCH → Update a product (with given data; don't work on \_id)

http://localhost:80/products/[_id] → DELETE → Delete a product from collection

## Error Message Example

{"error":"Not found"}

# Rückenprobleme (🪙Shop API) Docs
Shop backend (Project for SII Apprenticeships)

## API
http://localhost:80/products → GET → List all products

http://localhost:80/products?q=[name] → GET → Search product by name

http://localhost:80/products/[_id] → GET → Show one product with matching _id

http://localhost:80/products/insert → POST → Insert new product to collection

## Error Message Example
{"error":"Not found"}
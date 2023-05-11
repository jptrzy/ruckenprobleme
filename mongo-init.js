db = db.getSiblingDB('shop');

db.createCollection('products');

db.products.insertMany([
  {
    "name": "Book of Infinite Knowledge",
    "description": "Small booklet",
    "price": 2,
    "rating": 3.4,
    "stock": 2
  },
  {
    "name": "Bible",
    "description": "Collection of multiple books",
    "price": 99,
    "rating": 5,
    "stock": 10
  }
]);
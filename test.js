fetch('http://api/products/insert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    _id: "s2",
    name: "test",
    _name: "test",
    description: "test",
    price: 1,
    rating: 2.5,
    stock: 2
  })
})
.then(req => req.json())
.then(console.log);

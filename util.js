const { setTokenSourceMapRange } = require("typescript");

// ✅ Add Product
// fetch('http://localhost/products/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     name: "Book of Knowledge",
//     description: "Small booklet",
//     price: 2,
//     rating: 3.4,
//     stock: 2,
//   })
// })
// .then(res => res.json())
// .then(console.log);

// ❌ Add Product
// fetch('http://localhost/products/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     name: "Book of Knowledge",
//     description: "Small booklet",
//     price: 2,
//     rating: 3.4,
//     stock: "2",
//   })
// })
// .then(res => res.json())
// .then(console.log);

// Delete product
// fetch('http://localhost/products/645b5222bdd0f459832e1e3c', {
//   method: 'DELETE',
//   headers: { 'Content-Type': 'application/json' },
// })
// .then(res => res.json())
// .then(console.log);

// Update product
fetch("http://localhost:8080/products/645b51dba233a29dd0f18b09", {
  method: "put",
})
  .then((res) => res.text())
  .then(console.log);

// _id?: ObjectId;
// name: string = "";
// description: string = "";
// price: number = 0;
// rating: number = 0;
// stock: number = 0;

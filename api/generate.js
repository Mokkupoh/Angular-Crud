const fs = require("fs");

const names = [
  "Laptop", "Smartphone", "Headphones", "Keyboard", "Mouse", "Monitor",
  "USB Cable", "Smartwatch", "Speaker", "Webcam", "Printer", "Microphone",
  "Tablet", "Router", "SSD Drive", "GPU", "CPU", "RAM Module", "Power Bank",
  "Gamepad"
];

const categories = [
  "Electronics", "Accessories", "Computers", "Gadgets", "Office", "Teste"
];

function randomDescription(name) {
  return `A high-quality ${name.toLowerCase()} with excellent performance and durability.`;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProduct(id) {
  const name = randomItem(names);
  return {
    id: String(id),
    name,
    description: randomDescription(name),
    price: Number((Math.random() * 2000 + 10).toFixed(2)), // 10–2000
    category: randomItem(categories),
    stock: Math.floor(Math.random() * 500), // 0–499
  };
}

const products = [];

for (let i = 1; i <= 100; i++) {
  products.push(generateProduct(i));
}

const json = {
  products
};

fs.writeFileSync("products.json", JSON.stringify(json, null, 2));

console.log("products.json gerado com sucesso!");
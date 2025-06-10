// src/data/products.js
import nautilus from "../assets/products/nautilus.png";
import daytona from "../assets/products/daytona.png";
import royaloak from "../assets/products/royaloak.png";

import nautilusThumbnail1 from "../assets/products/daytona.png";
import nautilusThumbnail2 from "../assets/products/nautilus-2.png";
import nautilusThumbnail3 from "../assets/products/nautilus-3.png";
// and so on for other watches


const products = [
  {
    id: 1,
    brand: "Patek Philippe",
    model: "Nautilus",
    price: 140000,
    images: [
      nautilus,                 // main
      nautilusThumbnail1,
      nautilusThumbnail2,
      nautilusThumbnail3
    ],
    description:
      "A luxury steel sports watch, the Nautilus by Patek Philippe is famous for its elegant case and horizontal embossed dial."
  },
  {
    id: 2,
    brand: "Audemars Piguet",
    model: "Royal Oak",
    price: 150000,
    images: [royaloak, royaloak, royaloak, royaloak],
    description:
      "The Royal Oak by Audemars Piguet is the original luxury sports watch with a distinct octagonal bezel."
  },
  {
    id: 3,
    brand: "Rolex",
    model: "Daytona",
    price: 120000,
    images: [daytona, daytona, daytona, daytona],
    description:
      "The Rolex Daytona is designed for professional racing drivers, featuring a high-performance chronograph."
  }
];


export default products;

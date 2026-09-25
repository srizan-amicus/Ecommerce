import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Microsoft Surface Laptop 4",
    price: 79999,
    imageUrl:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 4299,
    originalPrice: 4999,
    imageUrl:
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhZHBob25lfGVufDB8fDB8fHww",
    category: "Audio",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 799,
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Wearables",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Iphone 17 Pro",
    price: 99999,
    imageUrl:
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fElwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 2999,
    imageUrl:
      "https://images.unsplash.com/photo-1655976796910-b239b1a1a41c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHNwZWFrZXIlMjBibHVldG9vdGh8ZW58MHx8MHx8fDA%3D",
    category: "Audio",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Fitness Band",
    price: 1999,
    imageUrl:
      "https://images.unsplash.com/photo-1572008470047-07990888f81b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHNtYXJ0JTIwYmFORHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Wearables",
    rating: 4.2,
  },
  {
    id: 7,
    name: "Portable Charger",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Accessories",
    rating: 4.2,
  },
  {
    id: 8,
    name: "LED Desk Lamp",
    price: 1449.99,
    imageUrl: "https://images.unsplash.com/photo-1753932847231-7949af383b98?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D",
    category: "Home & Garden",
    rating: 4.1,
  },
];

export default products;
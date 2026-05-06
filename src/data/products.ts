export type Product = {
  id: string
  title: string
  price: number
  imageUrl: string
  images?: string[]
  description: string
  category: 'console' | 'cartridge' | 'gamepad'
}

export const products: Product[] = [
  {
    id: 'dendy-001',
    title: 'Dendy Classic (8-bit) — Console',
    price: 3990,
    category: 'console',
    imageUrl:'./assets/1.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/0/0d/NES-Console-Set.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7f/NES-Console-Top.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/NES-Console-Ports.jpg',
    ],
    description:
      'Классическая 8-bit консоль в духе Dendy. Подключение по AV, простое управление, максимум ностальгии.',
  },
  {
    id: 'dendy-002',
    title: 'Dendy-style Gamepad — Classic',
    price: 990,
    category: 'gamepad',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/NES-Controller.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/NES-Controller.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/8d/NES-Controller-Back.jpg',
    ],
    description:
      'Классический геймпад с крестовиной и двумя кнопками. Удобный хват, лёгкий ход, ретро-ощущения.',
  },
  {
    id: 'dendy-003',
    title: 'Gamepad (Turbo) — Dual Button',
    price: 1190,
    category: 'gamepad',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/Nintendo-Entertainment-System-NES-Advantage-Controller.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/Nintendo-Entertainment-System-NES-Advantage-Controller.jpg',
    ],
    description:
      'Усиленный контроллер в стиле аркадного. Для тех, кто хочет максимально “железные” ощущения от игры.',
  },
  {
    id: 'dendy-004',
    title: 'Cartridge: Super Mario Bros (8-bit)',
    price: 590,
    category: 'cartridge',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/52/NES-Cartridge.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/52/NES-Cartridge.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9b/NES-Cartridge-Back.jpg',
    ],
    description:
      'Картридж в стиле 8-bit эпохи. Простая классика для вечеров “как раньше”.',
  },
  {
    id: 'dendy-005',
    title: 'Cartridge: Contra (8-bit)',
    price: 690,
    category: 'cartridge',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/52/NES-Cartridge.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/52/NES-Cartridge.jpg',
    ],
    description:
      'Легендарный экшен на двоих. Идеально, чтобы проверить турбо-кнопки и выдержку.',
  },
  {
    id: 'dendy-006',
    title: 'Cartridge: Battle City (8-bit)',
    price: 490,
    category: 'cartridge',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/52/NES-Cartridge.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/52/NES-Cartridge.jpg',
    ],
    description:
      'Танчики, кирпичи и базовый адреналин. Отлично подходит для коротких сессий.',
  },
]

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}


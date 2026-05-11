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
    imageUrl:'https://avatars.mds.yandex.net/get-mpic/13666838/2a0000019625adfb2f33a6449a6c9243c2db/orig',
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
      'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-19/288/731/813/141/651/600016381582b0.jpg',
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
      'https://i.ebayimg.com/images/g/kh8AAOSw5yhdgjrc/s-l640.jpg',
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
      'https://st.aestatic.net/items-img/R/7/9/3/U2d8ee7fd199342e18d17272d87f44690x.jpg_480x480.jpg',
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
      'https://avatars.mds.yandex.net/get-mpic/6219218/img_id5250561217845393121.jpeg/orig',
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
      'https://avatars.mds.yandex.net/get-mpic/17919307/2a0000019c7a80bf09cec9760e3a8f29a0bc/orig',
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


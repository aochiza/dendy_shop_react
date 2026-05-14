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
    title: 'Игровая приставка Dendy Junior',
    price: 1890,
    category: 'console',
    imageUrl:'https://pokupaylegko.ru/upload/shop_1/1/8/3/item_18370/shop_items_catalog_image18370.jpg',
    images: [
      'https://pokupaylegko.ru/upload/shop_1/1/8/3/item_18370/shop_items_catalog_image18370.jpg',
      'https://pokupaylegko.ru/upload/shop_1/1/8/3/item_18370/shop_property_file_18370_17476.jpg',
      'https://pokupaylegko.ru/upload/shop_1/1/8/3/item_18370/shop_property_file_18370_17477.jpg',
    ],
    description:
      'Dendy Junior 300 игр является продолжением линейки 8-битных приставок, выпускаемых Зеленоградским заводом.',
  },
  {
    id: 'dendy-002',
    title: 'Джойстик Dendy Controller 15 pin',
    price: 990,
    category: 'gamepad',
    imageUrl:
      'https://tehnoopt.net/upload/iblock/e17/kc0rh4bdrhmmmrdlkdj84habxtimxgka/0e4628b6-4563-47df-ae01-2230e244c883_9e4bb7aa-2d00-11e9-811f-107b444a7ed4.jpeg',
    images: [
      'https://tehnoopt.net/upload/iblock/e17/kc0rh4bdrhmmmrdlkdj84habxtimxgka/0e4628b6-4563-47df-ae01-2230e244c883_9e4bb7aa-2d00-11e9-811f-107b444a7ed4.jpeg',
      'https://tehnoopt.net/upload/iblock/9e6/xzl610m91krqu1vq8y3qmqnzb4momvau/0e4628b6-4563-47df-ae01-2230e244c883_9e4bb7ab-2d00-11e9-811f-107b444a7ed4.jpeg',
    ],
    description:
      'Классический квадратный джойстик Dendy с широким разъёмом подходит только для приставки Dendy. Имеет прямоугольный пластиковый корпус с кнопками управления. Подключение осуществляется при помощи кабеля.',
  },
  {
    id: 'dendy-003',
    title: 'Джойстик (Turbo) — Dual Button',
    price: 1190,
    category: 'gamepad',
    imageUrl:
      'https://tambov.diamondelectric.ru/images/1543/1542842/8bitdo_snes30_1.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/Nintendo-Entertainment-System-NES-Advantage-Controller.jpg',
    ],
    description:
      'Усиленный контроллер в стиле аркадного. Для тех, кто хочет максимально “железные” ощущения от игры.',
  },
  {
    id: 'dendy-004',
    title: 'Картридж: Super Mario Bros (8-bit)',
    price: 590,
    category: 'cartridge',
    imageUrl:
      'https://st.aestatic.net/items-img/R/7/9/3/U2d8ee7fd199342e18d17272d87f44690x.jpg_480x480.jpg',
    images: [
      'https://st.aestatic.net/items-img/R/7/9/3/U2d8ee7fd199342e18d17272d87f44690x.jpg_480x480.jpg'  ,
      'https://upload.wikimedia.org/wikipedia/commons/9/9b/NES-Cartridge-Back.jpg',
    ],
    description:
      'Картридж в стиле 8-bit эпохи. Простая классика для вечеров “как раньше”.',
  },
  {
    id: 'dendy-005',
    title: 'Картридж: Contra (8-bit)',
    price: 690,
    category: 'cartridge',
    imageUrl:
      'https://avatars.mds.yandex.net/i?id=6e6359cedb7af0fa3cacef98021be1aa_l-6493270-images-thumbs&n=13',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/52/NES-Cartridge.jpg',
    ],
    description:
      'Легендарный экшен на двоих. Идеально, чтобы проверить турбо-кнопки и выдержку.',
  },
  {
    id: 'dendy-006',
    title: 'Картридж: Battle City (8-bit)',
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


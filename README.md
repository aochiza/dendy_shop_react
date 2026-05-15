# Dendy Shop(React+Vite)

## Домен
https://dendyshop.vercel.app/

Интернет-магазин ретро-консолей, игр и аксессуаров. Проект выполнен в стилистике 8-битной эстетики с пиксельной графикой и неоновыми акцентами.
<img width="3160" height="1716" alt="image" src="https://github.com/user-attachments/assets/976729a7-cb93-4faf-b79b-5c8c3f30b0e1" />

<img width="3151" height="1728" alt="image" src="https://github.com/user-attachments/assets/2d7d8c23-caa6-4344-96d1-06aba48c46f9" />

<img width="3153" height="1742" alt="image" src="https://github.com/user-attachments/assets/fbc2c312-8c1b-4779-8173-3e3a3afdd4db" />


## Технологии

- React 18
- TypeScript
- Framer Motion (анимации)
- React Router DOM (маршрутизация)
- Zustand (управление состоянием)
- Vite (сборка)

## Функциональность

- Каталог товаров с фильтрацией по категориям и поиску
- Слайдер новинок с автоматическим и ручным переключением
- Корзина с изменением количества товаров
- Избранное
- Страница товара с галереей изображений
- Оформление заказа с формой


## Установка и запуск

Клонирование репозитория:
git clone https://github.com/aochiza/dendy_shop_react
cd dendy-shop


Установка зависимостей:
npm install

Запуск в режиме разработки:
npm run dev

Сборка проекта:
npm run build


## Основные компоненты

- `Layout` – обёртка с хедером, категориями и футером
- `Header` – навигация, логотип, поиск
- `Categories` – фильтрация по категориям
- `ProductCard` – карточка товара
- `NewArrivalsCarousel` – карусель новинок
- `CartPage` – страница корзины
- `FavoritesPage` – страница избранного
- `CheckoutPage` – оформление заказа

## Состояние приложения

Управление состоянием реализовано через Zustand:

- `cartStore` – корзина, количество, итоговая сумма
- `favoritesStore` – избранные товары
- `catalogStore` – активная категория, поисковый запрос


## Стилизация

- CSS-переменные для темизации
- Пиксельные шрифты Google Fonts
- Эффекты свечения и неона
- Spring-анимации на Framer Motion

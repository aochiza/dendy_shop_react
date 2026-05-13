import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.id);

  return (
    <motion.div
      className="card productCard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Кнопка избранного */}
      <motion.button
        onClick={() => toggleFavorite(product)}
        className="favorite-btn"
        whileTap={{ scale: 0.85 }}
        aria-label={favorite ? "Удалить из избранного" : "Добавить в избранное"}
      >
        <motion.span
          initial={false}
          animate={{ scale: favorite ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.2 }}
        >
          {favorite ? "❤️" : "🤍"}
        </motion.span>
      </motion.button>

      <Link to={`/product/${product.id}`} className="productCard-link">
        {/* Изображение */}
        <div className="productCard-image">
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
          />
        </div>

        {/* Название */}
        <h3 className="productCard-title">{product.title}</h3>

        {/* Цена */}
        <div className="productCard-price">
          {product.price.toLocaleString("ru-RU")} ₽
        </div>
      </Link>

      {/* Кнопка корзины */}
      <motion.button
        onClick={() => addToCart(product)}
        className="productCard-cart-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="cart-icon">🛒</span>
        <span>В корзину</span>
      </motion.button>
    </motion.div>
  );
}
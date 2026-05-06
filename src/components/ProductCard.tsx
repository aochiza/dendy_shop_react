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
      whileHover={{ scale: 1.03 }}
      style={{ position: "relative" }}
    >
      <button
        onClick={() => toggleFavorite(product)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: "18px",
          background: "rgba(0,0,0,0.4)",
          border: "1px solid #39ff14",
          borderRadius: "6px",
          cursor: "pointer",
          color: favorite ? "#39ff14" : "#888",
        }}
      >
        {favorite ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "contain",
          }}
        />
        <h3>{product.title}</h3>
      </Link>

      <p>{product.price.toLocaleString("ru-RU")} ₽</p>

      <button onClick={() => addToCart(product)}>
        В корзину
      </button>
    </motion.div>
  );
}
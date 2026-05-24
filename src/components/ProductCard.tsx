import { motion } from 'motion/react';
import { Plus, Eye, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-200/80 transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#FCFAF7] overflow-hidden border-b border-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-104"
        />

        {/* Action Overlays visible on hover */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            id={`view-details-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white text-stone-900 shadow-lg hover:bg-stone-950 hover:text-white transition-colors duration-300"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            id={`quick-add-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white text-stone-900 shadow-lg hover:bg-stone-950 hover:text-white transition-colors duration-300"
            title="Añadir al carrito"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Tiny Category Tag */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[8px] tracking-widest font-mono text-stone-500 uppercase rounded-sm border border-stone-100">
          {product.category}
        </span>

        {/* Special 'Featured' Tag */}
        {product.featured && (
          <span className="absolute top-4 right-4 bg-amber-500/10 text-amber-800 text-[8px] tracking-widest font-mono px-2.5 py-1 uppercase rounded-sm border border-amber-500/20">
            Destacado
          </span>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-amber-500">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="font-mono text-[10px] text-stone-400 mt-[1px]">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          <h3
            id={`prod-title-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="font-sans font-medium text-stone-900 text-sm tracking-tight hover:text-stone-600 cursor-pointer transition-colors duration-200"
          >
            {product.name}
          </h3>
          <p className="font-sans text-stone-500 text-xs mt-1.5 leading-relaxed font-light line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* Pricing / Quick Add Trigger */}
        <div className="mt-5 pt-4 border-t border-stone-50 flex items-center justify-between">
          <span className="font-mono text-sm text-stone-950 font-normal">
            €{product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="font-mono text-[10px] tracking-wider text-stone-900 hover:text-stone-500 transition-colors uppercase font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

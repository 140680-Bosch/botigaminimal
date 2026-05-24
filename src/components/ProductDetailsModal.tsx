import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShoppingBag, Minimize2, Tag, Layers } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor: string) => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailsModalProps) {
  const [selectedColor, setSelectedColor] = useState('Porcelana');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddWithDetails = () => {
    onAddToCart(product, quantity, selectedColor);
    onClose();
    // Reset local options
    setQuantity(1);
  };

  const colors = ['Porcelana', 'Grafito Mate', 'Arena Orgánica'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs"
          />

          {/* Modal Card content wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close trigger button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 border border-gray-100 text-stone-700 transition-colors"
              title="Cerrar detalles"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left Column: Big Product Image view */}
              <div className="md:col-span-6 relative aspect-square bg-[#FCFAF7] md:h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full scale-101"
                />
              </div>

              {/* Right Column: Detailed parameters */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[9px] tracking-widest text-[#bf8f30] uppercase">
                      {product.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-250" />
                    <span className="font-mono text-[9px] tracking-widest text-emerald-600 uppercase">
                      Disponible
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-stone-950 font-normal tracking-tight leading-sm mb-2">
                    {product.name}
                  </h2>
                  <p className="font-serif italic text-stone-500 text-sm mb-4">
                    {product.tagline}
                  </p>

                  <div className="font-mono text-xl text-stone-950 font-normal mb-6">
                    €{product.price.toFixed(2)}
                  </div>

                  <hr className="border-gray-100 mb-5" />

                  {/* Editorial Description block */}
                  <h4 className="font-mono text-[10px] tracking-wider text-gray-400 uppercase mb-2">
                    Concepto & Detalles
                  </h4>
                  <p className="font-sans text-gray-500 text-xs leading-relaxed font-light mb-6">
                    {product.description}
                  </p>

                  {/* Technical specifics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#FCFAF7] p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span className="font-mono text-[9px] uppercase tracking-wider">Dimensiones</span>
                      </div>
                      <p className="font-sans text-[11px] text-stone-700 font-light">{product.dimensions}</p>
                    </div>

                    <div className="bg-[#FCFAF7] p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span className="font-mono text-[9px] uppercase tracking-wider">Composición</span>
                      </div>
                      <p className="font-sans text-[11px] text-stone-700 font-light">{product.material}</p>
                    </div>
                  </div>

                  {/* Features Bullets list */}
                  <div className="mb-6">
                    <h5 className="font-mono text-[10px] tracking-wider text-gray-400 uppercase mb-2">Especificaciones</h5>
                    <ul className="space-y-1.5">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-stone-600 font-light text-[11px]">
                          <Check className="w-3.5 h-3.5 text-[#bf8f30] shrink-0 mt-[2px]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Custom color selector simulating premium finishes */}
                  <div className="mb-6">
                    <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase block mb-2.5">
                      Acabado: <span className="text-stone-700 font-medium">{selectedColor}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-[10px] font-mono tracking-widest border transition-all rounded-xs ${
                            selectedColor === color
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 bg-white hover:border-black text-stone-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Adding action line */}
                <div className="mt-4 pt-6 border-t border-gray-100 flex flex-wrap sm:flex-nowrap items-center gap-4">
                  {/* Selector de cantidad */}
                  <div className="flex items-center border border-gray-250 bg-white">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono text-xs text-stone-900 font-medium select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Agregar botón */}
                  <button
                    onClick={handleAddWithDetails}
                    className="flex-1 flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white font-mono text-xs uppercase tracking-widest py-3 px-6 h-10 transition-colors shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Agregar al pedido (€{(product.price * quantity).toFixed(2)})
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

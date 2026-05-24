import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, Check, Heart, Mail, Sparkles, AlertCircle } from 'lucide-react';
import { Product, CartItem, CategoryFilter } from './types';
import { PRODUCTS } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';

export default function App() {
  // Local storage cache initialization
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('esencial_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Interactive additions: Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  
  // Toast notifications for instant feedback during additions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart state with localStorage
  useEffect(() => {
    localStorage.setItem('esencial_cart', JSON.stringify(cart));
  }, [cart]);

  // Show brief toast
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filter and search computation
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeFilter === 'todos' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1, selectedColor: string = 'Porcelana') => {
    setCart((currentCart) => {
      const existingIdx = currentCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        // Increment quantity
        const updated = [...currentCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        // Add new item
        return [...currentCart, { product, quantity, selectedColor }];
      }
    });

    triggerToast(`Agregado: ${product.name} (${selectedColor}) x${quantity}`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, selectedColor);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, selectedColor?: string) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
    triggerToast('Artículo removido de la cesta.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollIntoCatalog = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans antialiased text-stone-900 pb-1">
      
      {/* Header element */}
      <Header
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onCartToggle={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Toast Notification HUD */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white font-mono text-[11px] tracking-widest uppercase px-6 py-3 px-5 py-3 shadow-xl rounded-md border border-gray-800 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-400 rotate-12" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro hero banner */}
      <Hero onExploreClick={scrollIntoCatalog} />

      {/* Main product catalog display */}
      <main id="catalogo" className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Section Title details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#bf8f30] uppercase block mb-2">
              Estética & Rigor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-light tracking-tight">
              Objetos Singulares
            </h2>
          </div>

          {/* Quick interactive category triggers */}
          <div className="flex flex-wrap items-center gap-2">
            {(['todos', 'hogar', 'iluminación', 'accesorios'] as CategoryFilter[]).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  scrollIntoCatalog();
                }}
                className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase border transition-all rounded-md ${
                  activeFilter === category
                    ? 'bg-black text-white border-black'
                    : 'bg-white hover:border-black text-gray-500 border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Searching Status indicator inside frame block */}
        {searchQuery && (
          <div className="mb-6 font-mono text-xs text-stone-500 flex items-center gap-2 bg-[#FCFAF7] border border-gray-100 rounded-xl p-4">
            <AlertCircle className="w-4 h-4 text-stone-400" />
            <span>
              Filtrando resultados por "<strong className="text-stone-900 font-medium">{searchQuery}</strong>" (Categoría: {activeFilter.toUpperCase()})
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="ml-auto underline text-stone-900 hover:text-stone-600 font-medium cursor-pointer"
            >
              Restablecer
            </button>
          </div>
        )}

        {/* Dynamic products list grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-gray-100 bg-[#FCFAF7] rounded-xl">
            <p className="font-serif italic text-lg text-stone-400">Ningún objeto coincide con la búsqueda</p>
            <p className="font-sans text-xs text-stone-400 mt-2 max-w-sm mx-auto font-light">
              Prueba a filtrar por otra clasificación o despeja el campo de texto de búsqueda para redescubrir la colección completa.
            </p>
            <button
              onClick={() => {
                setActiveFilter('todos');
                setSearchQuery('');
              }}
              className="mt-6 bg-black text-white hover:bg-gray-800 font-mono text-[10px] uppercase tracking-widest px-6 py-3 rounded-md transition duration-300"
            >
              Mostrar Todos los Objetos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(prod) => {
                    setSelectedProduct(prod);
                    setIsDetailsOpen(true);
                  }}
                  onAddToCart={(prod) => handleAddToCart(prod, 1, 'Porcelana')}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Philosophy section (Nuestra Filosofía) */}
      <section id="filosofia" className="bg-stone-950 text-[#fafafa] py-24 relative overflow-hidden">
        <div className="absolute inset-y-0 left-12 w-px bg-stone-900/40 z-0 hidden lg:block" />
        <div className="absolute inset-y-0 right-1/2 w-px bg-stone-900/40 z-0 hidden lg:block" />
        <div className="absolute inset-y-0 right-12 w-px bg-stone-900/40 z-0 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] tracking-widest text-stone-500 uppercase block mb-2">
              Manifiesto Lento
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-tight font-light">
              Hecho para <br />
              <span className="italic text-stone-400 font-normal">perdurar</span>
            </h2>
            <div className="mt-8 h-px bg-stone-800 w-24" />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 font-light text-stone-300">
            <div>
              <h4 className="font-serif text-stone-100 text-lg mb-4">La pureza de la materia</h4>
              <p className="font-sans text-xs leading-relaxed text-stone-400">
                Seleccionamos exclusivamente arcilla local del norte de Portugal, madera cosechada ecológicamente de cultivos certificados y acero de alta pureza. No añadimos pigmentaciones sintéticas de alta toxicidad ni tratamos la piel para ocultar cicatrices de crecimiento.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-stone-100 text-lg mb-4">El valor del reposo</h4>
              <p className="font-sans text-xs leading-relaxed text-stone-400">
                Frente a la inmediatez masiva de la industria contemporánea, abogamos por la producción de baja densidad. Cada pieza toma semanas en secar, moldear y enfriar de manera natural, reduciendo microfisuras internas para asegurar una durabilidad intergeneracional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty / Seals of quality service list */}
      <section id="garantia" className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
              <ShieldCheck className="w-6 h-6 text-stone-800 stroke-[1.25]" />
            </div>
            <div>
              <h3 className="font-serif text-base text-stone-900 mb-2 font-medium">Garantía de Reparación</h3>
              <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                Cada elemento de la colección estructural dispone de 5 años de garantía sobre fallos de material. Repondremos o sanearemos cualquier pieza dañada.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
              <Heart className="w-6 h-6 text-stone-800 stroke-[1.25]" />
            </div>
            <div>
              <h3 className="font-serif text-base text-stone-900 mb-2 font-medium">Embalaje Consciente</h3>
              <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                Utilizamos papel de nido de abeja 100% biodegradable y cartón reciclado prensado. Tus paquetes viajan protegidos sin un solo gramo de polímeros.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
              <Sparkles className="w-6 h-6 text-stone-800 stroke-[1.25]" />
            </div>
            <div>
              <h3 className="font-serif text-base text-stone-900 mb-2 font-medium">Comisariado Limitado</h3>
              <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                No producimos excedentes para almacenar en masa. Al agotar una referencia, estudiamos el ciclo de vida ambiental antes de re-lanzar ediciones.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Editorial Subscription Section */}
      <section className="bg-[#FCFAF7] border-t border-b border-gray-100 py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <span className="font-mono text-[9px] font-semibold tracking-[0.3em] uppercase text-stone-500 block mb-3">
            Gaceta Esencial
          </span>
          <h2 className="font-serif text-2xl text-stone-900 mb-4 font-light">Crónicas sobre diseño y sosiego</h2>
          <p className="font-sans text-xs text-stone-400 font-light mb-8 leading-relaxed">
            Suscríbete para recibir notificaciones sobre nuevos artesanos colaboradores, ediciones muy limitadas y colecciones cápsula de temporada.
          </p>

          <AnimatePresence mode="wait">
            {newsletterSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center shadow-lg"
              >
                <Check className="w-8 h-8 text-[#bf8f30] mb-2 stroke-1" />
                <p className="font-serif italic text-sm text-stone-900">Gracias por unirte</p>
                <p className="font-sans text-[11px] text-stone-400 mt-1 font-light">Has sido incorporado a nuestra correspondencia selecta.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 justify-center">
                <input
                  required
                  type="email"
                  placeholder="Escribe tu correo..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white border border-gray-200 py-3.5 px-4 text-xs font-sans w-full focus:outline-none focus:border-black transition-colors rounded-md"
                />
                <button
                  type="submit"
                  className="bg-black text-white font-mono text-[10px] uppercase tracking-widest px-6 hover:bg-gray-800 transition-colors rounded-md shadow-md"
                >
                  Unirse
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Clean minimalist footer */}
      <footer className="bg-white border-t border-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-serif text-sm tracking-widest text-[#bf8f30] uppercase font-bold">ESSENTIAL.</h3>
            <p className="font-sans text-[11px] text-gray-400 font-light mt-2 max-w-xs leading-relaxed">
              Comercio curado de objetos singulares para la búsqueda del bienestar espacial cotidiano.
            </p>
          </div>

          <div className="flex gap-8 font-mono text-[9px] tracking-widest text-gray-400 uppercase">
            <a href="#" className="hover:text-black transition-colors">Inicio</a>
            <a href="#catalogo" className="hover:text-black transition-colors">Colección</a>
            <a href="#filosofia" className="hover:text-black transition-colors">Manifiesto</a>
            <a href="#garantia" className="hover:text-black transition-colors">Soporte</a>
          </div>

          <div className="font-mono text-[9px] text-gray-400 text-center md:text-right">
            <p>© {new Date().getFullYear()} ESSENTIAL. Todos los derechos reservados.</p>
            <p className="mt-1 text-gray-300">Confeccionado artesanalmente para aficionados del bienestar de la forma.</p>
          </div>

        </div>
      </footer>

      {/* Render Product Details slide/drawer overlay */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          // delay slight state resetting to avoid visual flicker during collapse animation
          setTimeout(() => {
            if (!isDetailsOpen) setSelectedProduct(null);
          }, 350);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Render Shopping Cart list overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

import { ShoppingBag, Search, HelpCircle, FileText, Menu } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (category: any) => void;
}

export default function Header({
  cartCount,
  onCartToggle,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: HeaderProps) {
  // Navigation categories supporting both scrolling or simple filtering hooks
  const navCategories = [
    { label: 'Todos', category: 'todos' },
    { label: 'Hogar', category: 'hogar' },
    { label: 'Iluminación', category: 'iluminación' },
    { label: 'Accesorios', category: 'accesorios' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-10">
          <a
            href="#"
            className="text-2xl font-bold tracking-tighter text-stone-950 hover:text-stone-700 transition-colors uppercase"
          >
            ESSENTIAL.
          </a>
          
          {/* Main Desktop Filters as Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navCategories.map((item) => (
              <button
                key={item.category}
                id={`nav-${item.category}`}
                onClick={() => onFilterChange(item.category)}
                className={`font-mono text-xs font-semibold tracking-widest uppercase transition-colors py-1 px-0.5 border-b-2 ${
                  activeFilter === item.category
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center/Right Side Search Area */}
        <div className="flex-1 max-w-xs mx-6 hidden sm:block relative">
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Buscar objetos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 focus:outline-none focus:bg-white text-xs py-2 pl-9 pr-4 rounded-xs font-mono transition-all text-stone-800"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Right Side: Utility Widgets */}
        <div className="flex items-center gap-5">
          {/* Customer Service info */}
          <a
            href="#filosofia"
            className="font-mono text-[9px] tracking-widest text-stone-400 hover:text-stone-950 transition-colors uppercase hidden lg:flex items-center gap-1"
          >
            Filosofía
          </a>

          <a
            href="#garantia"
            className="font-mono text-[9px] tracking-widest text-stone-400 hover:text-stone-950 transition-colors uppercase hidden lg:flex items-center gap-1"
          >
            Garantía
          </a>

          <div className="w-px h-4 bg-stone-200 hidden lg:block" />

          {/* Cart Icon Toggle inside action frame */}
          <button
            id="cart-toggle-btn"
            onClick={onCartToggle}
            className="group relative flex items-center justify-center p-2.5 bg-stone-50 hover:bg-stone-950 hover:text-white transition-colors duration-300 rounded-sm border border-stone-100"
            title="Ver Cesta"
          >
            <ShoppingBag className="w-4 h-4 text-stone-800 group-hover:text-white transition-colors duration-200" />
            
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-stone-950 text-white font-mono text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white group-hover:bg-white group-hover:text-stone-950 transition-colors">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile search bar (only visible on small screens) */}
      <div className="px-6 pb-3 pt-1 sm:hidden border-t border-stone-50 bg-white/90">
        <div className="relative">
          <input
            id="search-input-mobile"
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 text-xs py-1.5 pl-8 pr-4 rounded-xs font-mono"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </div>
      </div>
    </header>
  );
}

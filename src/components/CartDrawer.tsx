import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Truck, Gift, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import React, { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, color?: string) => void;
  onRemoveItem: (productId: string, color?: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 150 ? 0 : shippingMethod === 'standard' ? 9.5 : 19.0;
  const total = subtotal + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;
    setIsCheckoutSuccess(true);
  };

  const handleResetCheckout = () => {
    onClearCart();
    setIsCheckoutSuccess(false);
    setShowCheckoutForm(false);
    setCustomerName('');
    setCustomerEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/30 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#FAF9F6] border-l border-gray-100"
            >
              <div className="h-full flex flex-col justify-between shadow-2xl relative">
                
                {/* Header view */}
                <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-stone-900" />
                    <h2 className="font-serif text-lg text-stone-900">Tu Cesta</h2>
                    <span className="font-mono text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      {cartItems.reduce((count, item) => count + item.quantity, 0)}
                    </span>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-stone-50 hover:bg-stone-100 text-stone-500 transition-colors flex items-center justify-center border border-gray-100"
                    title="Cerrar bolsa"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Normal / Success views conditional switcher */}
                {isCheckoutSuccess ? (
                  /* Success checkout screen */
                  <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-white">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="text-stone-900 mb-6"
                    >
                      <CheckCircle className="w-16 h-16 text-black stroke-[1.2] mx-auto" />
                    </motion.div>
                    
                    <h3 className="font-serif text-2xl text-stone-950 mb-3">¡Pedido Recibido!</h3>
                    <p className="font-mono text-[11px] text-stone-500 tracking-wider uppercase mb-5">
                      ORDEN #NN-{Math.floor(1000 + Math.random() * 9000)}-2026
                    </p>

                    <div className="bg-[#FCFAF7] border border-gray-100 p-5 rounded-xl w-full mb-8 text-left">
                      <p className="font-sans text-xs text-stone-600 font-light mb-2">
                        Gracias por tu confianza, <strong className="text-stone-950 font-medium">{customerName}</strong>.
                      </p>
                      <p className="font-sans text-xs text-stone-550 font-light leading-relaxed">
                        Hemos enviado el desglose del pedido y los detalles de seguimiento a <span className="text-stone-900 underline">{customerEmail}</span>. Tu paquete se preparará con esmero artesanal.
                      </p>
                    </div>

                    <button
                      onClick={handleResetCheckout}
                      className="w-full bg-black hover:bg-gray-800 text-white font-mono text-xs tracking-widest uppercase py-4 transition-colors shadow-lg"
                    >
                      Volver a la Tienda
                    </button>
                  </div>
                ) : (
                  /* Standard Items scroll grid view */
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                      /* Empty state */
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <ShoppingBag className="w-10 h-10 text-stone-200 mb-4 stroke-1" />
                        <p className="font-serif italic text-base text-stone-500">Tu cesta está vacía</p>
                        <p className="font-sans text-xs text-stone-400 mt-2 max-w-xs leading-relaxed font-light">
                          Explora nuestra cuidada selección e incorpora objetos singulares para decorar tu día a día.
                        </p>
                        <button
                          onClick={onClose}
                          className="mt-6 bg-black text-[#fafafa] font-mono text-[10px] uppercase tracking-widest px-6 py-3 transition-colors hover:bg-gray-800"
                        >
                          Seguir Explorando
                        </button>
                      </div>
                    ) : (
                      /* List of Items */
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-stone-400 font-mono text-[10px] uppercase tracking-wider pb-2 border-b border-gray-100">
                          <span>Artículo</span>
                          <span>Importe</span>
                        </div>
                        
                        {cartItems.map((item, idx) => (
                          <div
                            key={`${item.product.id}-${item.selectedColor || 'default'}-${idx}`}
                            className="bg-white border border-gray-100 p-4 flex gap-4 rounded-xl items-center justify-between"
                          >
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 object-cover rounded-md shrink-0 bg-stone-50"
                            />
                            
                            <div className="flex-1 min-w-0 pr-2">
                              <h4 className="font-sans font-medium text-xs text-stone-950 truncate">
                                {item.product.name}
                              </h4>
                              {item.selectedColor && (
                                <p className="font-mono text-[9px] text-[#bf8f30]">
                                  {item.selectedColor}
                                </p>
                              )}
                              
                              {/* Quantity triggers & line remover */}
                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                                    className="px-2 py-0.5 text-stone-400 hover:text-stone-950 bg-stone-50/50 hover:bg-[#FCFAF7] text-[10px]"
                                  >
                                    -
                                  </button>
                                  <span className="w-6 text-center font-mono text-[10px] text-stone-900">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                                    className="px-2 py-0.5 text-stone-400 hover:text-stone-950 bg-stone-50/50 hover:bg-[#FCFAF7] text-[10px]"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                                  className="text-stone-400 hover:text-red-500 transition-colors"
                                  title="Eliminar artículo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="font-mono text-xs text-stone-950 text-right shrink-0">
                              €{(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}

                        {/* Order conditions options */}
                        {subtotal > 150 ? (
                          <div className="p-3.5 bg-emerald-50/35 border border-emerald-100 text-emerald-800 text-[11px] font-sans font-light rounded-xl flex gap-2 items-center">
                            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>¡Enhorabuena! Has superado los 150€. Tu envío estándar es <strong>gratuito</strong>.</span>
                          </div>
                        ) : (
                          <div className="p-3.5 bg-stone-100/50 border border-gray-150 text-stone-500 text-[10px] font-sans font-light rounded-xl flex gap-2 items-center">
                            <Gift className="w-4 h-4 text-stone-400 shrink-0" />
                            <span>Envío gratuito estándar superando compras de 150€.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Footer calculations & checkout actions */}
                {!isCheckoutSuccess && cartItems.length > 0 && (
                  <div className="bg-white border-t border-gray-100 p-6">
                    {/* Shipping toggle */}
                    <div className="mb-4">
                      <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase block mb-2">
                        Modalidad de Envío
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setShippingMethod('standard')}
                          className={`p-2.5 text-left border rounded-xl transition-colors ${
                            shippingMethod === 'standard'
                              ? 'border-black bg-[#FCFAF7]'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="font-sans text-[11px] font-medium text-stone-900">Estándar (3-5 días)</div>
                          <div className="font-mono text-[10px] text-stone-500 mt-1">
                            {subtotal > 150 ? 'Gratis' : '€9.50'}
                          </div>
                        </button>

                        <button
                          onClick={() => setShippingMethod('express')}
                          className={`p-2.5 text-left border rounded-xl transition-colors ${
                            shippingMethod === 'express'
                              ? 'border-black bg-[#FCFAF7]'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="font-sans text-[11px] font-medium text-stone-900">Urgente (24h)</div>
                          <div className="font-mono text-[10px] text-stone-500 mt-1">
                            €19.00
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Breakdown totals */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-gray-100">
                      <div className="flex justify-between font-sans text-xs text-stone-600">
                        <span>Subtotal de artículos</span>
                        <span className="font-mono">€{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-sans text-xs text-stone-600">
                        <span>Costes de transporte</span>
                        <span className="font-mono">
                          {shippingCost === 0 ? 'Gratis' : `€${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between font-sans text-sm text-stone-950 pt-2 border-t border-gray-200 font-medium">
                        <span>Total del pedido</span>
                        <span className="font-mono">€{total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Simulating checkout flow panel */}
                    {showCheckoutForm ? (
                      <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-3 border-t border-gray-100">
                        <div>
                          <input
                            required
                            type="text"
                            placeholder="Nombre Completo"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-sans border border-gray-200 bg-[#FCFAF7] focus:bg-white focus:outline-none focus:border-stone-950 transition-colors rounded-md"
                          />
                        </div>
                        <div>
                          <input
                            required
                            type="email"
                            placeholder="Correo electrónico"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-sans border border-gray-200 bg-[#FCFAF7] focus:bg-white focus:outline-none focus:border-stone-950 transition-colors rounded-md"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setShowCheckoutForm(false)}
                            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-stone-700 font-mono text-[10px] uppercase tracking-wider py-3.5 transition-colors rounded-md"
                          >
                            Atrás
                          </button>
                          
                          <button
                            type="submit"
                            className="flex-1 bg-black hover:bg-gray-800 text-[#fafafa] font-mono text-xs uppercase tracking-widest py-3.5 transition-colors rounded-md shadow-lg"
                          >
                            Confirmar Compra
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowCheckoutForm(true)}
                        className="w-full bg-black hover:bg-gray-800 text-[#fafafa] font-mono text-xs uppercase tracking-widest py-4 transition-colors rounded-md shadow-lg"
                      >
                        Iniciar Pago Simulado
                      </button>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

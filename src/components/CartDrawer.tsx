import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Order } from '../types';
import { X, Trash2, ShieldCheck, Mail, Phone, MapPin, Truck, HelpCircle, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  language?: 'en' | 'ru';
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCreateOrder: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCreateOrder,
}) => {
  // Checkout form configurations
  const [customerName, setCustomerName] = useState('');
  const [vin, setVin] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'shipping'>('pickup');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const totalPriceEur = cart.reduce((acc, item) => acc + item.priceEur * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !vin || !contactValue || (deliveryMethod === 'shipping' && !address)) {
      return;
    }

    const orderNumber = `DE-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      orderNumber,
      customerName,
      vin: vin.toUpperCase(),
      contactMethod,
      contactValue,
      deliveryMethod,
      address: deliveryMethod === 'shipping' ? address : undefined,
      notes: notes || undefined,
      items: cart,
      totalPriceEur,
      shippingCostEur: deliveryMethod === 'shipping' ? 150 : 0,
      status: 'pending_verification',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };

    onCreateOrder(newOrder);

    // Clean local form settings
    setCustomerName('');
    setVin('');
    setContactValue('');
    setAddress('');
    setNotes('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            {/* Drawer Container Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col justify-between"
            >
              {/* Header section of Drawer */}
              <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black uppercase text-zinc-950 tracking-tight font-sans flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-zinc-900" />
                    <span>Order Specification Panel</span>
                  </h3>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                    Original Mercedes Retrofits Queue
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer border border-zinc-200 bg-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable list/Form content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-2">
                    <div className="text-zinc-300 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 stroke-1" />
                    </div>
                    <p className="font-mono text-xs uppercase text-zinc-500 tracking-widest font-black">
                      Cart Empty
                    </p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-tight">
                      Add Mercedes detailing parts to begin fitment mapping.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Item lines list */}
                    <div className="space-y-3.5">
                      <span className="block text-[9px] font-mono font-black uppercase tracking-widest text-zinc-400">
                        Part Nominations ({cart.length})
                      </span>
                      {cart.map((item) => (
                        <div
                          key={item.productId}
                          className="p-3 bg-zinc-50 rounded border border-zinc-200 flex gap-3.5 relative"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-14 h-14 object-cover rounded border border-zinc-200 bg-white shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-grow space-y-1">
                            <h4 className="text-xs font-bold text-zinc-900 truncate uppercase tracking-tight pr-5">
                              {item.productName}
                            </h4>
                            <p className="text-[10px] text-zinc-400 font-mono">
                              OEM: {item.oemNumber} {item.modelFit ? `| Fit: ${item.modelFit}` : ''}
                            </p>
                            
                            {/* Quantity controller */}
                            <div className="flex items-center gap-1.5 pt-1">
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                                className="w-5 h-5 rounded bg-white hover:bg-zinc-250 border border-zinc-250 text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-xs font-mono font-black text-zinc-800 w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                                className="w-5 h-5 rounded bg-white hover:bg-zinc-250 border border-zinc-250 text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer"
                              >
                                +
                              </button>
                              
                              <span className="text-xs font-mono font-bold text-zinc-900 ml-auto italic">
                                €{(item.priceEur * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.productId)}
                            className="absolute top-2.5 right-2.5 p-1 hover:bg-white text-zinc-400 hover:text-red-500 rounded transition-colors cursor-pointer border border-transparent hover:border-zinc-200"
                            title="Remove OEM Code line"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Checkout Form Container */}
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-4 border-t border-zinc-200">
                      <span className="block text-[9px] font-mono font-black uppercase tracking-widest text-zinc-400">
                        EPC Verified Deployment Contact
                      </span>

                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                          Client Signature Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., David Miller"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-sans"
                        />
                      </div>

                      {/* VIN input */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                            Chassis VIN Number (17-chars)
                          </label>
                          <span className="text-[9px] text-zinc-400 font-mono uppercase font-bold">EPC Guaranteed Fit</span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="WDB205042..."
                          value={vin}
                          onChange={(e) => setVin(e.target.value)}
                          maxLength={17}
                          className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-mono tracking-widest uppercase"
                        />
                      </div>

                      {/* Contact Way select */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setContactMethod('whatsapp')}
                          className={`p-2.5 rounded border text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
                            contactMethod === 'whatsapp'
                              ? 'bg-zinc-900 text-white border-zinc-950'
                              : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp Direct</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod('email')}
                          className={`p-2.5 rounded border text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
                            contactMethod === 'email'
                              ? 'bg-zinc-900 text-white border-zinc-950'
                              : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email Dispatch</span>
                        </button>
                      </div>

                      {/* Contact value coordinate */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                          {contactMethod === 'whatsapp' ? 'Phone Number with Country Code' : 'Email Address'}
                        </label>
                        <input
                          type={contactMethod === 'whatsapp' ? 'tel' : 'email'}
                          required
                          placeholder={contactMethod === 'whatsapp' ? 'E.g., +491701234567' : 'E.g., client@mercedes.com'}
                          value={contactValue}
                          onChange={(e) => setContactValue(e.target.value)}
                          className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-mono"
                        />
                      </div>

                      {/* Logistics selection */}
                      <div className="space-y-1.5 pt-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                          Global Logistics Method
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('pickup')}
                            className={`p-2 rounded border text-xs font-mono font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer ${
                              deliveryMethod === 'pickup'
                                ? 'bg-zinc-900 text-white border-zinc-950'
                                : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300'
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Milan Depot</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('shipping')}
                            className={`p-2 rounded border text-xs font-mono font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer ${
                              deliveryMethod === 'shipping'
                                ? 'bg-zinc-900 text-white border-zinc-950'
                                : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300'
                            }`}
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>DHL Freight</span>
                          </button>
                        </div>
                      </div>

                      {/* Shipping address info */}
                      {deliveryMethod === 'shipping' && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                            DHL Full Delivery Address
                          </label>
                          <textarea
                            required
                            rows={2}
                            placeholder="Street, Postal Code, City, Country"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-sans"
                          />
                        </div>
                      )}

                      {/* Optional Notes */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                          Optional Custom Notes (SCN updates, etc.)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Special retrofitting instructions..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-sans"
                        />
                      </div>

                      {/* Dynamic notice */}
                      <p className="text-[9px] text-zinc-400 leading-normal bg-zinc-50 p-2.5 rounded border border-zinc-150 font-mono">
                        Our OEM Engineer will immediately verify compatibility on standard EPC platforms and send authentic high-resolution pictures to your requested coordinate.
                      </p>
                    </form>
                  </div>
                )}
              </div>

              {/* Grand Total panel & Trigger action */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-xs font-bold uppercase text-zinc-500">
                      Total Allocation Code
                    </span>
                    <span className="text-2xl font-mono font-black text-zinc-950 italic">
                      €{totalPriceEur.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={!customerName || !vin || !contactValue || (deliveryMethod === 'shipping' && !address)}
                    className="w-full py-4 rounded bg-zinc-950 hover:bg-zinc-850 disabled:bg-zinc-100 disabled:text-zinc-300 disabled:border-zinc-200 text-white font-mono font-extrabold text-xs uppercase tracking-widest transition-transform active:scale-95 flex items-center justify-center gap-2 border border-transparent shadow-md cursor-pointer"
                  >
                    <span>Complete Specification Order</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

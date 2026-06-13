import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { CheckCircle, Phone, Mail, X, ArrowUpRight, Printer } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  language?: 'en' | 'ru';
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  order,
  onClose,
}) => {
  if (!order) return null;

  // Generate pre-filled WhatsApp link with professional structured message
  const getWhatsAppLink = () => {
    const phone = '393780061374'; // WhatsApp phone number from bio
    let text = `Hello Mercedes_Car_Parts! 🚨\n\nI have generated a parts order specification on your website.\n\n📄 *Order ID:* ${order.orderNumber}\n👤 *Customer:* ${order.customerName}\n🔧 *Vehicle VIN:* ${order.vin}\n🚚 *Delivery:* ${order.deliveryMethod === 'shipping' ? `Shipping to: ${order.address || ''}` : 'Depot pickup'}\n📞 *Contact:* ${order.contactValue}\n\n*Mercedes Components List:*\n`;
    order.items.forEach((item) => {
      text += `- ${item.productName} (${item.oemNumber}) x${item.quantity} — €${(item.priceEur * item.quantity).toLocaleString()}\n`;
    });
    text += `\n💶 *Grand Total:* €${order.totalPriceEur.toLocaleString()}\n`;
    if (order.notes) {
      text += `📝 *Notes:* ${order.notes}\n`;
    }
    text += `\nPlease verify original fitment in EPC/SCN and share availability and pictures!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Generate Email mailto link
  const getMailtoLink = () => {
    const email = 'mercedes.car.parts.de@gmail.com';
    const subject = `Mercedes Premium Parts Order Specification ${order.orderNumber}`;
    let body = `Hello Mercedes Car Parts,\n\nA new parts specification order ${order.orderNumber} has been finalized.\n\nCustomer Details:\nName: ${order.customerName}\nPrefer Contact: ${order.contactMethod} (${order.contactValue})\nVIN: ${order.vin}\nDelivery: ${order.deliveryMethod === 'shipping' ? order.address : 'Depot pickup'}\n\nOrders List:\n`;
    order.items.forEach((item) => {
      body += `- ${item.productName} [OEM: ${item.oemNumber}] x${item.quantity} — €${item.priceEur * item.quantity}\n`;
    });
    body += `\nGrand Total: €${order.totalPriceEur}\n\nPlease reach out to me with availability feedback!`;

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Dialog container box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-2xl flex flex-col z-10 max-h-[92vh] print:border-none print:shadow-none bg-white text-zinc-900"
          >
            {/* Close trigger button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-650 hover:text-zinc-950 transition-colors duration-150 border border-zinc-200 print:hidden cursor-pointer z-30"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content holder area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              
              {/* Success Badge */}
              <div className="text-center space-y-2 print:hidden pt-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-50 border border-zinc-350 text-zinc-900">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 uppercase tracking-tight">
                  Specification order created
                </h2>
                <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider font-bold">
                  Reserved in parts database. Select communication channel below to finalize parts allocation:
                </p>
              </div>

              {/* Direct Communication Channels (CRITICAL FOR BUSINESS FLOW) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 print:hidden">
                {/* Send via WhatsApp */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-zinc-950 hover:bg-zinc-850 text-white font-mono font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-sm group cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Send via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Send via Email */}
                <a
                  href={getMailtoLink()}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 font-mono font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95 group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-zinc-900" />
                  <span>Submit via Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Premium Printable/Digital Invoice Sheet */}
              <div className="p-6 rounded bg-zinc-50 border border-zinc-200 space-y-4 print:bg-white print:text-black print:border-none print:p-0">
                <div className="flex justify-between items-start pb-4 border-b border-zinc-200">
                  <div>
                    <h3 className="text-xs font-black tracking-widest uppercase text-zinc-900 font-sans">
                      MERCEDES CAR PARTS
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Original Spare Parts & Detailing Stuttgart</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-500 block">Invoice Number</span>
                    <span className="text-xs font-mono font-black text-zinc-950 select-all">{order.orderNumber}</span>
                  </div>
                </div>

                {/* Basic client stats */}
                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Client Name</span>
                    <span className="font-bold text-zinc-900 block">{order.customerName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Chassis VIN</span>
                    <span className="font-mono text-zinc-900 font-bold block uppercase select-all">{order.vin}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Contact Coordinate</span>
                    <span className="font-mono text-zinc-900 block">{order.contactValue} ({order.contactMethod.toUpperCase()})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Logistics Setup</span>
                    <span className="text-zinc-900 block font-bold uppercase tracking-tight text-[11px]">
                      {order.deliveryMethod === 'shipping' 
                        ? 'DHL Freight Delivery' 
                        : 'Warehouse Depot pickup'}
                    </span>
                  </div>
                </div>

                {/* Order inventory table mapping */}
                <div className="space-y-2 pt-2 border-t border-zinc-200">
                  <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Components list</span>
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center py-1.5 text-xs font-sans border-b border-zinc-150">
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-zinc-900 line-clamp-1 uppercase tracking-tight text-[11px]">
                          {item.productName}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-mono">OEM Reference: {item.oemNumber} x{item.quantity}</p>
                      </div>
                      <span className="font-mono font-black text-zinc-900 italic shrink-0">
                        €{(item.priceEur * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price final overview */}
                <div className="pt-4 border-t border-zinc-200 flex justify-between items-baseline">
                  <span className="font-black text-xs text-zinc-500 uppercase tracking-widest font-sans">Grand Total Allocation</span>
                  <span className="text-2xl font-mono font-black text-zinc-950 italic">
                    €{order.totalPriceEur.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Utility actions inside success modal */}
              <div className="flex items-center justify-between pt-2 text-xs print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-3.5 py-2 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 text-zinc-650 hover:text-zinc-950 font-mono font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-zinc-500" />
                  <span>Print Invoice Statement</span>
                </button>

                <p className="text-[9px] text-zinc-400 font-mono text-right italic leading-tight uppercase tracking-wider font-semibold max-w-xs">
                  Click 'Send via WhatsApp' to transmit your unique chassis SCN allocation code to our lead programmer.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

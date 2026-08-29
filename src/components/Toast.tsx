import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="pointer-events-auto p-4 rounded-2xl bg-[#141414] border border-[#C5A059]/40 shadow-2xl flex items-start space-x-3 text-[#F9F9F7]"
          >
            {t.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-[#F9F9F7] leading-tight">{t.title}</h5>
              {t.description && (
                <p className="text-[11px] text-[#A8A69E] mt-0.5 line-clamp-2">{t.description}</p>
              )}
            </div>

            <button
              onClick={() => onDismiss(t.id)}
              className="text-[#A8A69E] hover:text-[#F9F9F7] p-0.5 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

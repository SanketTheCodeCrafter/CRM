import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Drawer({ isOpen, onClose, title, children }) {
  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out opacity-100"
          aria-hidden="true"
        ></div>

        {/* Panel Container */}
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform bg-white dark:bg-slate-900 shadow-2xl transition duration-300 ease-in-out">
            <div className="flex h-full flex-col divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-md text-slate-400 hover:text-slate-500 dark:hover:text-slate-350 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-1"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Close panel</span>
                </button>
              </div>

              {/* Body */}
              <div className="relative flex-1 overflow-y-auto px-6 py-6">
                {children}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

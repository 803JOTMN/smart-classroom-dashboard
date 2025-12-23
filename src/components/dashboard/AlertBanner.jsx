import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/button.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlertBanner({ show, temperature, triggeredTime, roomId, onAcknowledge }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">High Temperature Alert</h3>
                <p className="text-slate-600 text-sm mt-0.5">
                  Classroom temperature has exceeded safe threshold (28°C)
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Triggered: {triggeredTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {roomId}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              onClick={onAcknowledge}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              Acknowledge
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React from 'react';
import { Clock, MapPin, Wifi } from 'lucide-react';

export default function DashboardHeader({ roomId, building, lastUpdated }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          Smart Classroom Dashboard
        </h1>
        <div className="flex items-center gap-2 mt-1 text-slate-500">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{roomId} - {building}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50">
          <Wifi className="w-4 h-4 text-green-600" />
          <span className="text-xs font-medium text-green-700">MQTT Connected</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Last Updated: {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
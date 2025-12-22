import React from 'react';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Progress } from '../ui/progress.jsx';

export default function EnvironmentalCard({ temperature, humidity, pm25 }) {
  const tempStatus = temperature > 28 ? 'High' : temperature < 20 ? 'Low' : 'Normal';
  const tempProgress = (temperature / 40) * 100;
  
  const humidityStatus = humidity > 70 ? 'High' : humidity < 30 ? 'Low' : 'Normal';
  const humidityProgress = humidity;
  
  const pm25Status = pm25 > 50 ? 'Poor' : pm25 > 25 ? 'Moderate' : 'Good';
  const pm25Progress = (pm25 / 100) * 100;

  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Environment</CardTitle>
          <div className="p-2 bg-slate-100 rounded-xl">
            <Thermometer className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Temperature</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{temperature}°C</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all ${temperature > 28 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ transform: `translateX(-${100 - tempProgress}%)` }}
            />
          </div>
          <p className="text-xs text-slate-500">Status: {tempStatus}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Humidity</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{humidity}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all ${humidity > 70 ? 'bg-yellow-500' : humidity < 30 ? 'bg-orange-500' : 'bg-green-500'}`}
              style={{ transform: `translateX(-${100 - humidityProgress}%)` }}
            />
          </div>
          <p className="text-xs text-slate-500">Status: {humidityStatus}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Air Quality (PM2.5)</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{pm25} μg/m³</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all ${pm25 > 50 ? 'bg-red-500' : pm25 > 25 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ transform: `translateX(-${100 - pm25Progress}%)` }}
            />
          </div>
          <p className="text-xs text-slate-500">Status: {pm25Status}</p>
        </div>
      </CardContent>
    </Card>
  );
}
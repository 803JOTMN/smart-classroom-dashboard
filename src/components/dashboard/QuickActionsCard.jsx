import React from 'react';
import { Zap, Power, Camera, Bell, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';

export default function QuickActionsCard({ systemOnline }) {
  const actions = [
    { icon: Camera, label: 'Start Recording', description: 'Begin video recording' },
    { icon: Bell, label: 'Test Alarm', description: 'Sound test alarm' },
    { icon: Lock, label: 'Lock Doors', description: 'Secure all entrances' },
  ];

  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
          <div className="p-2 bg-slate-100 rounded-xl">
            <Zap className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4"
              >
                <Icon className="w-4 h-4 mr-3 text-slate-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Power className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">System Status</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${systemOnline ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${systemOnline ? 'text-emerald-600' : 'text-red-600'}`}>
              {systemOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
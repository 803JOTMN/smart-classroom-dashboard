import React from 'react';
import { Clock, AlertTriangle, UserCheck, Shield, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';


const iconMap = {
  alert: { icon: AlertTriangle, bg: 'bg-amber-100', color: 'text-amber-600' },
  checkin: { icon: UserCheck, bg: 'bg-emerald-100', color: 'text-emerald-600' },
  security: { icon: Shield, bg: 'bg-blue-100', color: 'text-blue-600' },
  attendance: { icon: Users, bg: 'bg-purple-100', color: 'text-purple-600' },
  system: { icon: Activity, bg: 'bg-slate-100', color: 'text-slate-600' },
};

export default function RecentActivityCard({ activities }) {
  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
          <div className="p-2 bg-slate-100 rounded-xl">
            <Clock className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto space-y-3 pr-2">
        {activities.map((activity, index) => {
          const IconConfig = iconMap[activity.event_type] || iconMap.alert;
          const Icon = IconConfig.icon;
          
          return (
            <div key={index} className="flex items-start gap-3 py-2">
              <div className={`p-2 ${IconConfig.bg} rounded-lg`}>
                <Icon className={`w-4 h-4 ${IconConfig.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{activity.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
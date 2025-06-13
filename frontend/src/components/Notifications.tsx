import React, { useEffect, useState } from 'react';
import { initWebSocket } from '../services/websocket';

interface Notification {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ws = initWebSocket((data: unknown) => {
      // Option 1: Type assertion (if you are sure the data matches Notification)
      setNotifications(prev => [data as Notification, ...prev]);

      // Option 2: Type guard (safer, if you want to validate)
      // if (typeof data === 'object' && data !== null && 'id' in data && 'title' in data && 'description' in data && 'created_at' in data) {
      //   setNotifications(prev => [{ ...(data as Notification) }, ...prev]);
      // }
    });
    return () => ws.close();
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="relative">
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-1 text-xs">
            {notifications.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded">
          {notifications.length === 0 ? (
            <div className="p-2 text-gray-500">No new notifications</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className="border-b p-2 hover:bg-gray-50">
                <div className="font-semibold">{n.title}</div>
                <div className="text-sm text-gray-600">{n.description}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
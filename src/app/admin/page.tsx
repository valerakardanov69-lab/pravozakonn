"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FileText, Users, Clock, TrendingUp, Inbox } from "lucide-react";

import type { Application } from "@/lib/db";

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/applications")
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { icon: FileText, label: "Всего заявок", value: applications.length.toString(), color: "bg-blue-500" },
    { icon: Clock, label: "В обработке", value: applications.filter(a => a.status === "processing").length.toString(), color: "bg-yellow-500" },
    { icon: Users, label: "Новые", value: applications.filter(a => a.status === "new").length.toString(), color: "bg-green-500" },
    { icon: TrendingUp, label: "Завершено", value: applications.filter(a => a.status === "completed").length.toString(), color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!loading && applications.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Заявок пока нет</h3>
            <p className="text-gray-500">
              Когда клиенты оставят заявки через форму на сайте, они появятся здесь
            </p>
          </div>
        </Card>
      )}

      {!loading && applications.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Последние заявки: {applications.length}
          </h2>
          <p className="text-gray-500">
            Перейдите в раздел <a href="/admin/applications" className="text-primary-600 hover:underline">Заявки</a> для просмотра и управления
          </p>
        </Card>
      )}
    </div>
  );
}

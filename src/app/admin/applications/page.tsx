"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Phone, Mail, Download, Trash2, RefreshCw } from "lucide-react";

import type { Application } from "@/lib/db";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
};

const statusLabels: Record<string, string> = {
  new: "Новая",
  processing: "В обработке",
  completed: "Завершена",
};

export default function ApplicationsAdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Ошибка при загрузке заявок:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchApplications();
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const deleteApplication = async (id: number) => {
    if (!confirm("Удалить заявку?")) return;
    try {
      await fetch(`/api/applications/${id}`, { method: "DELETE" });
      setSelectedApp(null);
      fetchApplications();
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const filteredApps = filter === "all" 
    ? applications 
    : applications.filter(app => app.status === filter);

  const selected = applications.find(app => app.id === selectedApp);

  const handleExport = () => {
    const headers = ["Имя", "Телефон", "Email", "Услуга", "Сообщение", "Статус", "Дата"];
    const rows = filteredApps.map(app => [
      app.name,
      app.phone,
      app.email || "",
      app.service || "",
      app.message || "",
      statusLabels[app.status],
      new Date(app.createdAt).toLocaleDateString("ru-RU"),
    ]);
    let csv = headers.join(";") + "\n";
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(";") + "\n";
    });
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Заявки клиентов</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchApplications} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Обновить
          </Button>
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Экспорт в Excel
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Button 
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          Все ({applications.length})
        </Button>
        <Button 
          variant={filter === "new" ? "default" : "outline"}
          onClick={() => setFilter("new")}
        >
          Новые ({applications.filter(a => a.status === "new").length})
        </Button>
        <Button 
          variant={filter === "processing" ? "default" : "outline"}
          onClick={() => setFilter("processing")}
        >
          В обработке
        </Button>
        <Button 
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
        >
          Завершенные
        </Button>
      </div>

      {loading ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">Загрузка...</div>
        </Card>
      ) : applications.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Заявок пока нет</h3>
            <p className="text-gray-500">
              Когда клиенты оставят заявки через форму на сайте, они появятся здесь
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Клиент</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Телефон</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Статус</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr 
                      key={app.id} 
                      className={`border-b last:border-0 hover:bg-gray-50 cursor-pointer ${selectedApp === app.id ? 'bg-primary-50' : ''}`}
                      onClick={() => setSelectedApp(app.id)}
                    >
                      <td className="py-3 px-2 font-medium text-gray-900">{app.name}</td>
                      <td className="py-3 px-2 text-gray-600 text-sm">{app.phone}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                          {statusLabels[app.status]}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-500 text-sm">
                        {new Date(app.createdAt).toLocaleDateString("ru-RU")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <div>
            {selected ? (
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900">Детали заявки</h3>
                  <button
                    onClick={() => deleteApplication(selected.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Клиент</p>
                    <p className="font-medium text-gray-900">{selected.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Контакты</p>
                    <div className="space-y-1">
                      <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                        <Phone className="w-4 h-4" />
                        {selected.phone}
                      </a>
                      {selected.email && (
                        <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                          <Mail className="w-4 h-4" />
                          {selected.email}
                        </a>
                      )}
                    </div>
                  </div>

                  {selected.message && (
                    <div>
                      <p className="text-sm text-gray-500">Сообщение</p>
                      <p className="text-gray-700">{selected.message}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-500">Дата</p>
                    <p className="text-gray-900">{new Date(selected.createdAt).toLocaleString("ru-RU")}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-2">Изменить статус</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={selected.status === "processing" ? "default" : "outline"}
                        onClick={() => updateStatus(selected.id, "processing")}
                      >
                        В обработку
                      </Button>
                      <Button 
                        size="sm"
                        variant={selected.status === "completed" ? "default" : "outline"}
                        onClick={() => updateStatus(selected.id, "completed")}
                      >
                        Завершить
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center text-gray-500">
                <p>Выберите заявку для просмотра деталей</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

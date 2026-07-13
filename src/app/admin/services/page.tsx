"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X, RefreshCw } from "lucide-react";
import type { Service } from "@/lib/db";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке услуг:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    
    try {
      if (isAdding) {
        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          fetchServices();
          setIsAdding(false);
        }
      } else if (isEditing !== null) {
        const response = await fetch(`/api/services/${isEditing}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          fetchServices();
          setIsEditing(null);
        }
      }
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({ title: service.title, description: service.description });
    setIsEditing(service.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить услугу?")) return;
    try {
      const response = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (response.ok) {
        setServices(services.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({ title: "", description: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Управление услугами</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchServices} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Обновить
          </Button>
          <Button onClick={() => { setIsAdding(true); setIsEditing(null); }} className="gap-2">
            <Plus className="w-4 h-4" />
            Добавить услугу
          </Button>
        </div>
      </div>

      {(isAdding || isEditing !== null) && (
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isAdding ? "Новая услуга" : "Редактирование услуги"}
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Название услуги"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Описание услуги"
              />
            </div>
            <Button onClick={handleSave}>Сохранить</Button>
          </div>
        </Card>
      )}

      {loading ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">Загрузка...</div>
        </Card>
      ) : services.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">Услуг пока нет</div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

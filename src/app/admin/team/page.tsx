"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, X } from "lucide-react";

const initialTeam = [
  { id: 1, name: "Александр Петров", role: "Управляющий партнер", specialization: "Корпоративное право, M&A", experience: "20 лет опыта", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" },
  { id: 2, name: "Елена Соколова", role: "Старший юрист", specialization: "Судебные споры, арбитраж", experience: "15 лет опыта", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face" },
  { id: 3, name: "Михаил Иванов", role: "Юрист", specialization: "Недвижимость, земельное право", experience: "10 лет опыта", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
  { id: 4, name: "Анна Козлова", role: "Юрист", specialization: "Семейное право, наследство", experience: "8 лет опыта", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face" },
];

export default function TeamAdminPage() {
  const [team, setTeam] = useState(initialTeam);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", specialization: "", experience: "", image: "" });

  const handleSave = () => {
    if (isAdding) {
      setTeam([...team, { id: Date.now(), ...formData }]);
      setIsAdding(false);
    } else if (isEditing) {
      setTeam(team.map(t => t.id === isEditing ? { ...t, ...formData } : t));
      setIsEditing(null);
    }
    setFormData({ name: "", role: "", specialization: "", experience: "", image: "" });
  };

  const handleEdit = (id: number) => {
    const member = team.find(t => t.id === id);
    if (member) {
      setFormData({ 
        name: member.name, 
        role: member.role, 
        specialization: member.specialization, 
        experience: member.experience,
        image: member.image
      });
      setIsEditing(id);
    }
  };

  const handleDelete = (id: number) => {
    setTeam(team.filter(t => t.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Управление командой</h1>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Добавить сотрудника
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isAdding ? "Новый сотрудник" : "Редактирование сотрудника"}
            </h2>
            <button onClick={() => { setIsAdding(false); setIsEditing(null); }} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван Иванов"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Юрист"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Специализация</label>
              <Input
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Корпоративное право"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Опыт работы</label>
              <Input
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="10 лет опыта"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL фото</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleSave}>Сохранить</Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-start gap-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 text-sm">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.specialization}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(member.id)}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

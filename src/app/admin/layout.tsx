import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ-панель | ПравоЗакон",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="font-bold">П</span>
          </div>
          <span className="font-bold">Админ-панель</span>
        </div>
        
        <nav className="space-y-2">
          <a href="/admin" className="block px-4 py-2 rounded-lg bg-gray-800 text-white">
            Dashboard
          </a>
          <a href="/admin/services" className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            Услуги
          </a>
          <a href="/admin/applications" className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            Заявки
          </a>
          <a href="/admin/team" className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            Команда
          </a>
          <a href="/" className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            На сайт
          </a>
        </nav>
      </aside>
      
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

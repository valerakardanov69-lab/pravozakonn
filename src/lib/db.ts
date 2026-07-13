import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const applicationsFile = path.join(dataDir, "applications.json");
const servicesFile = path.join(dataDir, "services.json");

// Ensure data directory exists (lazy initialization)
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export interface Application {
  id: number;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  status: string;
  createdAt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
}

// Helper functions for applications
function getApplications(): Application[] {
  ensureDataDir();
  if (!fs.existsSync(applicationsFile)) {
    return [];
  }
  try {
    const data = fs.readFileSync(applicationsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveApplications(applications: Application[]): void {
  ensureDataDir();
  fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));
}

// Helper functions for services
function getServices(): Service[] {
  ensureDataDir();
  if (!fs.existsSync(servicesFile)) {
    const defaultServices: Service[] = [
      { id: 1, title: "Банкротство физ.лиц", description: "Профессиональная помощь в процедуре банкротства физических лиц", updatedAt: new Date().toISOString() },
      { id: 2, title: "Работа с судебными приставами", description: "Представление интересов при взаимодействии с ФССП", updatedAt: new Date().toISOString() },
      { id: 3, title: "Отмена судебных приказов", description: "Отмена судебных приказов и заочных решений", updatedAt: new Date().toISOString() },
      { id: 4, title: "Составление документов", description: "Составление исковых заявлений, жалоб, претензий", updatedAt: new Date().toISOString() },
      { id: 5, title: "Представление в судах", description: "Представление интересов клиента в судах всех инстанций", updatedAt: new Date().toISOString() },
      { id: 6, title: "Дистанционная работа", description: "Работа с клиентами дистанционно по всей России", updatedAt: new Date().toISOString() },
    ];
    saveServices(defaultServices);
    return defaultServices;
  }
  try {
    const data = fs.readFileSync(servicesFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveServices(services: Service[]): void {
  ensureDataDir();
  fs.writeFileSync(servicesFile, JSON.stringify(services, null, 2));
}

// Export functions
export const db = {
  application: {
    findMany: async (): Promise<Application[]> => getApplications(),
    create: async ({ data }: { data: Omit<Application, "id" | "createdAt" | "status"> & { status?: string } }) => {
      const applications = getApplications();
      const newApp: Application = {
        ...data,
        id: applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1,
        createdAt: new Date().toISOString(),
        status: data.status || "new",
      };
      applications.push(newApp);
      saveApplications(applications);
      return newApp;
    },
    update: async ({ where, data }: { where: { id: number }; data: Partial<Application> }) => {
      const applications = getApplications();
      const index = applications.findIndex(a => a.id === where.id);
      if (index === -1) throw new Error("Application not found");
      applications[index] = { ...applications[index], ...data };
      saveApplications(applications);
      return applications[index];
    },
    delete: async ({ where }: { where: { id: number } }) => {
      const applications = getApplications();
      const index = applications.findIndex(a => a.id === where.id);
      if (index === -1) throw new Error("Application not found");
      const deleted = applications.splice(index, 1);
      saveApplications(applications);
      return deleted[0];
    },
  },
  service: {
    findMany: async (): Promise<Service[]> => getServices(),
    update: async ({ where, data }: { where: { id: number }; data: Partial<Service> }) => {
      const services = getServices();
      const index = services.findIndex(s => s.id === where.id);
      if (index === -1) throw new Error("Service not found");
      services[index] = { ...services[index], ...data, updatedAt: new Date().toISOString() };
      saveServices(services);
      return services[index];
    },
    create: async ({ data }: { data: Omit<Service, "id" | "updatedAt"> }) => {
      const services = getServices();
      const newService: Service = {
        ...data,
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        updatedAt: new Date().toISOString(),
      };
      services.push(newService);
      saveServices(services);
      return newService;
    },
    delete: async ({ where }: { where: { id: number } }) => {
      const services = getServices();
      const index = services.findIndex(s => s.id === where.id);
      if (index === -1) throw new Error("Service not found");
      const deleted = services.splice(index, 1);
      saveServices(services);
      return deleted[0];
    },
  },
};

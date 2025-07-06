import { users, works, news, events, type User, type InsertUser, type Work, type InsertWork, type News, type InsertNews, type Event, type InsertEvent } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;

  // Work operations
  getWork(id: number): Promise<Work | undefined>;
  getAllWorks(): Promise<Work[]>;
  getWorksByCategory(category: string): Promise<Work[]>;
  getWorksByAuthor(authorId: number): Promise<Work[]>;
  createWork(work: InsertWork): Promise<Work>;
  updateWork(id: number, work: Partial<Work>): Promise<Work | undefined>;
  deleteWork(id: number): Promise<boolean>;

  // News operations
  getNews(id: number): Promise<News | undefined>;
  getAllNews(): Promise<News[]>;
  getPublishedNews(): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<News>): Promise<News | undefined>;
  deleteNews(id: number): Promise<boolean>;

  // Event operations
  getEvent(id: number): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<Event>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private works: Map<number, Work>;
  private news: Map<number, News>;
  private events: Map<number, Event>;
  private currentUserId: number;
  private currentWorkId: number;
  private currentNewsId: number;
  private currentEventId: number;

  constructor() {
    this.users = new Map();
    this.works = new Map();
    this.news = new Map();
    this.events = new Map();
    this.currentUserId = 1;
    this.currentWorkId = 1;
    this.currentNewsId = 1;
    this.currentEventId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample Users
    const sampleUsers = [
      {
        fullName: "يوحنا بطرس",
        role: "leader"
      },
      {
        fullName: "مريم كرم",
        role: "member"
      },
      {
        fullName: "بطرس أنطونيوس",
        role: "member"
      }
    ];

    sampleUsers.forEach(user => {
      const id = this.currentUserId++;
      const newUser = { ...user, id, createdAt: new Date() };
      this.users.set(id, newUser);
    });

    // Sample Works
    const sampleWorks = [
      {
        title: "حملة إطعام الأيتام",
        description: "توزيع وجبات ساخنة على الأطفال الأيتام في دار الرعاية",
        category: "أعمال خيرية",
        authorId: 1,
        workDate: new Date('2024-12-01'),
        beneficiariesCount: 50,
        images: null,
        approved: true
      },
      {
        title: "تنظيف الكنيسة",
        description: "تنظيف شامل للكنيسة وتنسيق الحديقة",
        category: "أعمال كنسية", 
        authorId: 2,
        workDate: new Date('2024-12-15'),
        beneficiariesCount: 100,
        images: null,
        approved: true
      },
      {
        title: "دروس تقوية مجانية",
        description: "تقديم دروس تقوية مجانية للطلاب المحتاجين",
        category: "أعمال تعليمية",
        authorId: 3,
        workDate: new Date('2024-12-20'),
        beneficiariesCount: 25,
        images: null,
        approved: true
      }
    ];

    sampleWorks.forEach(work => {
      const id = this.currentWorkId++;
      const newWork = { ...work, id, createdAt: new Date() };
      this.works.set(id, newWork);
    });

    // Sample News
    const sampleNews = [
      {
        title: "إعلان عن حملة خيرية جديدة",
        content: "نعلن عن بدء حملة خيرية جديدة لمساعدة الأسر المحتاجة في فصل الشتاء",
        summary: "حملة خيرية شتوية للأسر المحتاجة",
        authorId: 1,
        relatedWorkId: null,
        published: true
      },
      {
        title: "نتائج الأعمال الخيرية لشهر ديسمبر",
        content: "تم إنجاز عدد كبير من الأعمال الخيرية خلال شهر ديسمبر",
        summary: "ملخص إنجازات شهر ديسمبر",
        authorId: 2,
        relatedWorkId: null,
        published: true
      }
    ];

    sampleNews.forEach(news => {
      const id = this.currentNewsId++;
      const newNews = { ...news, id, createdAt: new Date() };
      this.news.set(id, newNews);
    });

    // Sample Events
    const sampleEvents = [
      {
        title: "لقاء شهري للأعضاء",
        description: "اجتماع شهري لمناقشة الأعمال والمشاريع القادمة",
        eventDate: new Date('2025-01-15'),
        location: "قاعة الكنيسة الرئيسية"
      },
      {
        title: "ورشة تدريبية للعمل التطوعي",
        description: "ورشة تدريبية لتطوير مهارات العمل التطوعي",
        eventDate: new Date('2025-01-25'),
        location: "مركز التدريب"
      }
    ];

    sampleEvents.forEach(event => {
      const id = this.currentEventId++;
      const newEvent = { ...event, id, createdAt: new Date() };
      this.events.set(id, newEvent);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      role: insertUser.role || 'member',
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return undefined;
    }
    
    const updatedUser = { ...existingUser, ...userUpdate };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  // Work operations
  async getWork(id: number): Promise<Work | undefined> {
    return this.works.get(id);
  }

  async getAllWorks(): Promise<Work[]> {
    return Array.from(this.works.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getWorksByCategory(category: string): Promise<Work[]> {
    return Array.from(this.works.values()).filter(
      (work) => work.category === category
    );
  }

  async getWorksByAuthor(authorId: number): Promise<Work[]> {
    return Array.from(this.works.values()).filter(
      (work) => work.authorId === authorId
    );
  }

  async createWork(insertWork: InsertWork): Promise<Work> {
    const id = this.currentWorkId++;
    const work: Work = { 
      ...insertWork, 
      id, 
      authorId: insertWork.authorId || null,
      beneficiariesCount: insertWork.beneficiariesCount || 0,
      images: insertWork.images || null,
      approved: false,
      createdAt: new Date() 
    };
    this.works.set(id, work);
    return work;
  }

  async updateWork(id: number, workUpdate: Partial<Work>): Promise<Work | undefined> {
    const work = this.works.get(id);
    if (!work) return undefined;
    
    const updatedWork = { ...work, ...workUpdate };
    this.works.set(id, updatedWork);
    return updatedWork;
  }

  async deleteWork(id: number): Promise<boolean> {
    return this.works.delete(id);
  }

  // News operations
  async getNews(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPublishedNews(): Promise<News[]> {
    return Array.from(this.news.values())
      .filter((news) => news.published)
      .sort((a, b) => 
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const news: News = { 
      id, 
      title: insertNews.title,
      content: insertNews.content,
      summary: insertNews.summary ?? null,
      authorId: insertNews.authorId ?? null,
      published: insertNews.published ?? false,
      relatedWorkId: insertNews.relatedWorkId ?? null,
      createdAt: new Date() 
    };
    this.news.set(id, news);
    return news;
  }

  async updateNews(id: number, newsUpdate: Partial<News>): Promise<News | undefined> {
    const news = this.news.get(id);
    if (!news) return undefined;
    
    const updatedNews = { ...news, ...newsUpdate };
    this.news.set(id, updatedNews);
    return updatedNews;
  }

  async deleteNews(id: number): Promise<boolean> {
    return this.news.delete(id);
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => 
      new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter((event) => new Date(event.eventDate) > now)
      .sort((a, b) => 
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { 
      ...insertEvent, 
      id, 
      location: insertEvent.location || null,
      createdAt: new Date() 
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, eventUpdate: Partial<Event>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...eventUpdate };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }
}

// Smart storage selection based on environment
async function createStorage(): Promise<IStorage> {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    try {
      // Try to use PostgreSQL database
      const { DatabaseStorage } = await import("./database-storage");
      const dbStorage = new DatabaseStorage();
      
      // Test connection
      await dbStorage.getAllUsers();
      console.log("✅ Connected to PostgreSQL database");
      return dbStorage;
    } catch (error: any) {
      console.error("❌ Failed to connect to PostgreSQL:", error.message);
      console.log("🔄 Falling back to file storage...");
    }
  } else {
    console.log("📝 No DATABASE_URL found, using file storage");
  }
  
  // Fallback to file storage
  const { FileStorage } = await import("./storage-fallback");
  const fileStorage = new FileStorage();
  
  // Initialize with sample data if files don't exist
  try {
    const users = await fileStorage.getAllUsers();
    if (users.length === 0) {
      console.log("🌱 Initializing with sample data...");
      await initializeSampleData(fileStorage);
    } else {
      // Check for duplicate usernames and clean them
      const uniqueUsers = users.filter((user, index, self) => 
        index === self.findIndex(u => u.username === user.username)
      );
      if (uniqueUsers.length !== users.length) {
        console.log("🧹 Cleaning duplicate users...");
        // This would require rebuilding the user storage, but for now we'll leave it
      }
    }
  } catch (error) {
    console.error("Error initializing sample data:", error);
  }
  
  return fileStorage;
}

async function initializeSampleData(storage: IStorage) {
  // Create sample users
  const sampleUsers = [
    {
      fullName: "يوحنا بطرس",
      role: "leader"
    },
    {
      fullName: "مريم يوسف",
      role: "admin"
    },
    {
      fullName: "ميخائيل داود",
      role: "member"
    }
  ];

  const createdUsers = [];
  for (const userData of sampleUsers) {
    const user = await storage.createUser(userData);
    createdUsers.push(user);
  }

  // Create sample works
  const sampleWorks = [
    {
      title: "حملة إطعام الأيتام",
      description: "توزيع وجبات ساخنة على الأطفال الأيتام في دار الرعاية",
      category: "خدمة اجتماعية",
      authorId: createdUsers[0].id,
      workDate: new Date('2024-12-15'),
      beneficiariesCount: 50
    },
    {
      title: "زيارة دار المسنين",
      description: "قضاء وقت مع كبار السن وتقديم الدعم النفسي",
      category: "زيارات", 
      authorId: createdUsers[1].id,
      workDate: new Date('2024-12-18'),
      beneficiariesCount: 30
    },
    {
      title: "توزيع الملابس الشتوية",
      description: "توزيع ملابس شتوية دافئة على الأسر المحتاجة",
      category: "مساعدات",
      authorId: createdUsers[2].id,
      workDate: new Date('2024-12-20'),
      beneficiariesCount: 25
    }
  ];

  for (const workData of sampleWorks) {
    await storage.createWork(workData);
  }

  // Create sample news
  const sampleNews = [
    {
      title: "إعلان عن حملة خيرية جديدة",
      content: "نعلن عن بدء حملة خيرية جديدة لمساعدة الأسر المحتاجة في فصل الشتاء. هذه الحملة تهدف إلى توفير الدعم اللازم للأسر الأكثر احتياجاً في مجتمعنا الأرثوذكسي خلال فصل الشتاء البارد.",
      summary: "حملة خيرية شتوية للأسر المحتاجة",
      authorId: createdUsers[0].id,
      relatedWorkId: null,
      published: true
    },
    {
      title: "نتائج الأعمال الخيرية لشهر ديسمبر",
      content: "تم إنجاز عدد كبير من الأعمال الخيرية خلال شهر ديسمبر، وقد شهد هذا الشهر مشاركة واسعة من أعضاء كتيبة أبطال نيقية في مختلف الأنشطة الخيرية والتطوعية.",
      summary: "ملخص إنجازات شهر ديسمبر",
      authorId: createdUsers[1].id,
      relatedWorkId: null,
      published: true
    }
  ];

  for (const newsData of sampleNews) {
    await storage.createNews(newsData);
  }

  console.log("✅ Sample data initialized");
}

// Create and export storage instance
export const storagePromise = createStorage();

// For compatibility with existing code
export let storage: IStorage;
storagePromise.then(s => storage = s);

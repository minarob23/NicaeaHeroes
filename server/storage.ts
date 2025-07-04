import { users, works, news, events, type User, type InsertUser, type Work, type InsertWork, type News, type InsertNews, type Event, type InsertEvent } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
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
        username: "john_doe",
        password: "password123",
        fullName: "يوحنا بطرس",
        email: "john@nicaea.org",
        role: "leader"
      },
      {
        username: "mary_k",
        password: "password123", 
        fullName: "مريم كرم",
        email: "mary@nicaea.org",
        role: "member"
      },
      {
        username: "peter_a",
        password: "password123",
        fullName: "بطرس أنطونيوس", 
        email: "peter@nicaea.org",
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
        excerpt: "حملة خيرية شتوية للأسر المحتاجة",
        category: "إعلان مهم",
        authorId: 1,
        published: true
      },
      {
        title: "نتائج الأعمال الخيرية لشهر ديسمبر",
        content: "تم إنجاز عدد كبير من الأعمال الخيرية خلال شهر ديسمبر",
        excerpt: "ملخص إنجازات شهر ديسمبر",
        category: "أخبار",
        authorId: 2,
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

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
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
      ...insertNews, 
      id, 
      published: false,
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

export const storage = new MemStorage();

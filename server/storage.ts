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

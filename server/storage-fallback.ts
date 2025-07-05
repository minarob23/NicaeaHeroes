// Fallback storage for local development without PostgreSQL
// يستخدم هذا التخزين عندما لا تتوفر قاعدة بيانات PostgreSQL

import { users, works, news, events, type User, type InsertUser, type Work, type InsertWork, type News, type InsertNews, type Event, type InsertEvent } from "@shared/schema";
import { IStorage } from "./storage";
import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const WORKS_FILE = path.join(DATA_DIR, 'works.json');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

export class FileStorage implements IStorage {
  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private readFile<T>(filePath: string, defaultValue: T[]): T[] {
    this.ensureDataDir();
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
    }
    return defaultValue;
  }

  private writeFile<T>(filePath: string, data: T[]): void {
    this.ensureDataDir();
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
    }
  }

  private getNextId<T extends { id: number }>(items: T[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const users = this.readFile<User>(USERS_FILE, []);
    return users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = this.readFile<User>(USERS_FILE, []);
    return users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = this.readFile<User>(USERS_FILE, []);

    // Check for existing username or email
    const existingUser = users.find(u => 
      u.username === insertUser.username || u.email === insertUser.email
    );

    if (existingUser) {
      throw new Error(`User with username '${insertUser.username}' or email '${insertUser.email}' already exists`);
    }

    const newUser: User = {
      ...insertUser,
      id: this.getNextId(users),
      role: insertUser.role || 'member',
      createdAt: new Date()
    };
    users.push(newUser);
    this.writeFile(USERS_FILE, users);
    return newUser;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const users = this.readFile<User>(USERS_FILE, []);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return undefined;

    users[index] = { ...users[index], ...userUpdate };
    this.writeFile(USERS_FILE, users);
    return users[index];
  }

  async deleteUser(id: number): Promise<boolean> {
    const users = this.readFile<User>(USERS_FILE, []);
    const filteredUsers = users.filter(user => user.id !== id);
    if (filteredUsers.length === users.length) return false;

    this.writeFile(USERS_FILE, filteredUsers);
    return true;
  }

  async getAllUsers(): Promise<User[]> {
    return this.readFile<User>(USERS_FILE, []);
  }

  // Work operations
  async getWork(id: number): Promise<Work | undefined> {
    const works = this.readFile<Work>(WORKS_FILE, []);
    return works.find(work => work.id === id);
  }

  async getAllWorks(): Promise<Work[]> {
    return this.readFile<Work>(WORKS_FILE, []);
  }

  async getWorksByCategory(category: string): Promise<Work[]> {
    const works = this.readFile<Work>(WORKS_FILE, []);
    return works.filter(work => work.category === category);
  }

  async getWorksByAuthor(authorId: number): Promise<Work[]> {
    const works = this.readFile<Work>(WORKS_FILE, []);
    return works.filter(work => work.authorId === authorId);
  }

  async createWork(insertWork: InsertWork): Promise<Work> {
    const works = this.readFile<Work>(WORKS_FILE, []);
    const newWork: Work = {
      ...insertWork,
      id: this.getNextId(works),
      authorId: insertWork.authorId || null,
      beneficiariesCount: insertWork.beneficiariesCount || 0,
      images: insertWork.images || null,
      approved: false,
      createdAt: new Date()
    };
    works.push(newWork);
    this.writeFile(WORKS_FILE, works);
    return newWork;
  }

  async updateWork(id: number, workUpdate: Partial<Work>): Promise<Work | undefined> {
    const works = this.readFile<Work>(WORKS_FILE, []);
    const index = works.findIndex(work => work.id === id);
    if (index === -1) return undefined;

    works[index] = { ...works[index], ...workUpdate };
    this.writeFile(WORKS_FILE, works);
    return works[index];
  }

  async deleteWork(id: number): Promise<boolean> {
    const works = this.readFile<Work>(WORKS_FILE, []);
    const filteredWorks = works.filter(work => work.id !== id);
    if (filteredWorks.length === works.length) return false;

    this.writeFile(WORKS_FILE, filteredWorks);
    return true;
  }

  // News operations
  async getNews(id: number): Promise<News | undefined> {
    const news = this.readFile<News>(NEWS_FILE, []);
    return news.find(item => item.id === id);
  }

  async getAllNews(): Promise<News[]> {
    return this.readFile<News>(NEWS_FILE, []);
  }

  async getPublishedNews(): Promise<News[]> {
    const news = this.readFile<News>(NEWS_FILE, []);
    return news.filter(item => item.published);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const news = this.readFile<News>(NEWS_FILE, []);
    const newNews: News = {
      id: this.getNextId(news),
      title: insertNews.title,
      content: insertNews.content,
      summary: insertNews.summary ?? null,
      authorId: insertNews.authorId ?? null,
      published: insertNews.published ?? false,
      relatedWorkId: insertNews.relatedWorkId ?? null,
      createdAt: new Date()
    };
    news.push(newNews);
    this.writeFile(NEWS_FILE, news);
    return newNews;
  }

  async updateNews(id: number, newsUpdate: Partial<News>): Promise<News | undefined> {
    const news = this.readFile<News>(NEWS_FILE, []);
    const index = news.findIndex(item => item.id === id);
    if (index === -1) return undefined;

    news[index] = { ...news[index], ...newsUpdate };
    this.writeFile(NEWS_FILE, news);
    return news[index];
  }

  async deleteNews(id: number): Promise<boolean> {
    const news = this.readFile<News>(NEWS_FILE, []);
    const filteredNews = news.filter(item => item.id !== id);
    if (filteredNews.length === news.length) return false;

    this.writeFile(NEWS_FILE, filteredNews);
    return true;
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    const events = this.readFile<Event>(EVENTS_FILE, []);
    return events.find(event => event.id === id);
  }

  async getAllEvents(): Promise<Event[]> {
    return this.readFile<Event>(EVENTS_FILE, []);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const events = this.readFile<Event>(EVENTS_FILE, []);
    const now = new Date();
    return events.filter(event => new Date(event.eventDate) > now);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const events = this.readFile<Event>(EVENTS_FILE, []);
    const newEvent: Event = {
      ...insertEvent,
      id: this.getNextId(events),
      location: insertEvent.location || null,
      createdAt: new Date()
    };
    events.push(newEvent);
    this.writeFile(EVENTS_FILE, events);
    return newEvent;
  }

  async updateEvent(id: number, eventUpdate: Partial<Event>): Promise<Event | undefined> {
    const events = this.readFile<Event>(EVENTS_FILE, []);
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return undefined;

    events[index] = { ...events[index], ...eventUpdate };
    this.writeFile(EVENTS_FILE, events);
    return events[index];
  }

  async deleteEvent(id: number): Promise<boolean> {
    const events = this.readFile<Event>(EVENTS_FILE, []);
    const filteredEvents = events.filter(event => event.id !== id);
    if (filteredEvents.length === events.length) return false;

    this.writeFile(EVENTS_FILE, filteredEvents);
    return true;
  }
}
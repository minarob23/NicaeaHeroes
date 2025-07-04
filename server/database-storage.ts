import { users, works, news, events, type User, type InsertUser, type Work, type InsertWork, type News, type InsertNews, type Event, type InsertEvent } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        role: insertUser.role || 'member'
      })
      .returning();
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userUpdate)
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  // Work operations
  async getWork(id: number): Promise<Work | undefined> {
    const [work] = await db.select().from(works).where(eq(works.id, id));
    return work || undefined;
  }

  async getAllWorks(): Promise<Work[]> {
    return await db.select().from(works).orderBy(works.createdAt);
  }

  async getWorksByCategory(category: string): Promise<Work[]> {
    return await db.select().from(works).where(eq(works.category, category));
  }

  async getWorksByAuthor(authorId: number): Promise<Work[]> {
    return await db.select().from(works).where(eq(works.authorId, authorId));
  }

  async createWork(insertWork: InsertWork): Promise<Work> {
    const [work] = await db
      .insert(works)
      .values({
        ...insertWork,
        authorId: insertWork.authorId || null,
        beneficiariesCount: insertWork.beneficiariesCount || 0,
        images: insertWork.images || null,
        approved: false
      })
      .returning();
    return work;
  }

  async updateWork(id: number, workUpdate: Partial<Work>): Promise<Work | undefined> {
    const [updatedWork] = await db
      .update(works)
      .set(workUpdate)
      .where(eq(works.id, id))
      .returning();
    return updatedWork || undefined;
  }

  async deleteWork(id: number): Promise<boolean> {
    const result = await db.delete(works).where(eq(works.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // News operations
  async getNews(id: number): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.id, id));
    return newsItem || undefined;
  }

  async getAllNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(news.createdAt);
  }

  async getPublishedNews(): Promise<News[]> {
    return await db.select().from(news).where(eq(news.published, true)).orderBy(news.createdAt);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const [newsItem] = await db
      .insert(news)
      .values({
        ...insertNews,
        authorId: insertNews.authorId || null,
        published: false,
        relatedWorkIds: insertNews.relatedWorkIds || null
      })
      .returning();
    return newsItem;
  }

  async updateNews(id: number, newsUpdate: Partial<News>): Promise<News | undefined> {
    const [updatedNews] = await db
      .update(news)
      .set(newsUpdate)
      .where(eq(news.id, id))
      .returning();
    return updatedNews || undefined;
  }

  async deleteNews(id: number): Promise<boolean> {
    const result = await db.delete(news).where(eq(news.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(events.eventDate);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return await db.select().from(events).where(gte(events.eventDate, now)).orderBy(events.eventDate);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values({
        ...insertEvent,
        location: insertEvent.location || null
      })
      .returning();
    return event;
  }

  async updateEvent(id: number, eventUpdate: Partial<Event>): Promise<Event | undefined> {
    const [updatedEvent] = await db
      .update(events)
      .set(eventUpdate)
      .where(eq(events.id, id))
      .returning();
    return updatedEvent || undefined;
  }

  async deleteEvent(id: number): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
}
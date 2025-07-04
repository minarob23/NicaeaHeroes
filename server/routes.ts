import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkSchema, insertNewsSchema, insertEventSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Works routes
  app.get("/api/works", async (req, res) => {
    try {
      const category = req.query.category as string;
      const works = category 
        ? await storage.getWorksByCategory(category)
        : await storage.getAllWorks();
      
      // Include author information
      const worksWithAuthors = await Promise.all(
        works.map(async (work) => {
          const author = work.authorId ? await storage.getUser(work.authorId) : null;
          return {
            ...work,
            author: author ? { id: author.id, fullName: author.fullName } : null
          };
        })
      );
      
      res.json(worksWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب الأعمال" });
    }
  });

  app.post("/api/works", async (req, res) => {
    try {
      const validatedWork = insertWorkSchema.parse(req.body);
      const work = await storage.createWork(validatedWork);
      res.status(201).json(work);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في إنشاء العمل" });
      }
    }
  });

  app.get("/api/works/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const work = await storage.getWork(id);
      if (!work) {
        return res.status(404).json({ message: "العمل غير موجود" });
      }
      
      const author = work.authorId ? await storage.getUser(work.authorId) : null;
      res.json({
        ...work,
        author: author ? { id: author.id, fullName: author.fullName } : null
      });
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب العمل" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getPublishedNews();
      const newsWithAuthors = await Promise.all(
        news.map(async (article) => {
          const author = article.authorId ? await storage.getUser(article.authorId) : null;
          return {
            ...article,
            author: author ? { id: author.id, fullName: author.fullName } : null
          };
        })
      );
      res.json(newsWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب الأخبار" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const validatedNews = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(validatedNews);
      res.status(201).json(news);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في إنشاء الخبر" });
      }
    }
  });

  // Events routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب الفعاليات" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedEvent = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedEvent);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في إنشاء الفعالية" });
      }
    }
  });

  // Members routes
  app.get("/api/members", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const membersWithStats = await Promise.all(
        users.map(async (user) => {
          const works = await storage.getWorksByAuthor(user.id);
          const totalBeneficiaries = works.reduce((sum, work) => sum + work.beneficiariesCount, 0);
          return {
            id: user.id,
            fullName: user.fullName,
            role: user.role,
            worksCount: works.length,
            totalBeneficiaries
          };
        })
      );
      res.json(membersWithStats);
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب الأعضاء" });
    }
  });

  app.post("/api/members", async (req, res) => {
    try {
      const validatedUser = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedUser);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في إنشاء العضو" });
      }
    }
  });

  // Statistics route
  app.get("/api/stats", async (req, res) => {
    try {
      const works = await storage.getAllWorks();
      const users = await storage.getAllUsers();
      const totalBeneficiaries = works.reduce((sum, work) => sum + work.beneficiariesCount, 0);
      const volunteerHours = works.length * 4; // Assuming 4 hours per work on average
      
      res.json({
        totalWorks: works.length,
        totalBeneficiaries,
        totalMembers: users.length,
        volunteerHours
      });
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب الإحصائيات" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      // In a real application, this would send an email or store the message
      console.log("Contact form submission:", { name, email, subject, message });
      res.json({ message: "تم إرسال الرسالة بنجاح" });
    } catch (error) {
      res.status(500).json({ message: "فشل في إرسال الرسالة" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

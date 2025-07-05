import type { Express } from "express";
import { createServer, type Server } from "http";
import { storagePromise } from "./storage";
import { insertWorkSchema, insertNewsSchema, insertEventSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize storage
  const storage = await storagePromise;
  
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

  app.put("/api/works/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      // Validate the update data
      const validatedData = insertWorkSchema.partial().parse(updateData);
      
      const updatedWork = await storage.updateWork(id, validatedData);
      if (!updatedWork) {
        return res.status(404).json({ message: "العمل غير موجود" });
      }
      
      res.json(updatedWork);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في تحديث العمل" });
      }
    }
  });

  app.delete("/api/works/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteWork(id);
      if (!deleted) {
        return res.status(404).json({ message: "العمل غير موجود" });
      }
      
      res.json({ message: "تم حذف العمل بنجاح" });
    } catch (error) {
      res.status(500).json({ message: "فشل في حذف العمل" });
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

  app.put("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      // Validate the update data
      const validatedData = insertNewsSchema.partial().parse(updateData);
      
      const updatedNews = await storage.updateNews(id, validatedData);
      if (!updatedNews) {
        return res.status(404).json({ message: "الخبر غير موجود" });
      }
      
      res.json(updatedNews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في تحديث الخبر" });
      }
    }
  });

  app.delete("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteNews(id);
      if (!deleted) {
        return res.status(404).json({ message: "الخبر غير موجود" });
      }
      
      res.json({ message: "تم حذف الخبر بنجاح" });
    } catch (error) {
      res.status(500).json({ message: "فشل في حذف الخبر" });
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

  app.put("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      // Validate the update data
      const validatedData = insertEventSchema.partial().parse(updateData);
      
      const updatedEvent = await storage.updateEvent(id, validatedData);
      if (!updatedEvent) {
        return res.status(404).json({ message: "الفعالية غير موجودة" });
      }
      
      res.json(updatedEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في تحديث الفعالية" });
      }
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteEvent(id);
      if (!deleted) {
        return res.status(404).json({ message: "الفعالية غير موجودة" });
      }
      
      res.json({ message: "تم حذف الفعالية بنجاح" });
    } catch (error) {
      res.status(500).json({ message: "فشل في حذف الفعالية" });
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
            username: user.username,
            email: user.email,
            role: user.role,
            worksCount: works.length,
            totalBeneficiaries,
            createdAt: user.createdAt
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

  app.get("/api/members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "العضو غير موجود" });
      }
      
      const works = await storage.getWorksByAuthor(user.id);
      const totalBeneficiaries = works.reduce((sum, work) => sum + work.beneficiariesCount, 0);
      
      res.json({
        ...user,
        worksCount: works.length,
        totalBeneficiaries
      });
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب العضو" });
    }
  });

  app.put("/api/members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      console.log(`Updating member ${id} with data:`, updateData);
      
      // Validate the update data
      const validatedData = insertUserSchema.partial().parse(updateData);
      
      const updatedUser = await storage.updateUser(id, validatedData);
      if (!updatedUser) {
        console.log(`Member ${id} not found for update`);
        return res.status(404).json({ message: "العضو غير موجود" });
      }
      
      console.log(`Member ${id} updated successfully:`, updatedUser);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating member:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        res.status(500).json({ message: "فشل في تحديث العضو" });
      }
    }
  });

  app.delete("/api/members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log(`Attempting to delete member with ID: ${id}`);
      
      const deleted = await storage.deleteUser(id);
      if (!deleted) {
        console.log(`Member ${id} not found for deletion`);
        return res.status(404).json({ message: "العضو غير موجود" });
      }
      
      console.log(`Member ${id} deleted successfully`);
      res.json({ message: "تم حذف العضو بنجاح" });
    } catch (error) {
      console.error("Error deleting member:", error);
      res.status(500).json({ message: "فشل في حذف العضو" });
    }
  });

  // Statistics route
  app.get("/api/stats", async (req, res) => {
    try {
      const works = await storage.getAllWorks();
      const users = await storage.getAllUsers();
      const totalBeneficiaries = works.reduce((sum, work) => sum + work.beneficiariesCount, 0);
      
      res.json({
        totalWorks: works.length,
        totalBeneficiaries,
        totalMembers: users.length
      });
    } catch (error) {
      res.status(500).json({ message: "فشل في جلب الإحصائيات" });
    }
  });

  

  const httpServer = createServer(app);
  return httpServer;
}

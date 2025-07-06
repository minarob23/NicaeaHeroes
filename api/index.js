
import express from "express";
import cors from "cors";
import { insertWorkSchema, insertNewsSchema, insertEventSchema, insertUserSchema } from "../shared/schema.js";
import { z } from "zod";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory storage for Vercel
let users = [
  {
    id: 1,
    fullName: "المدير العام",
    role: "admin",
    createdAt: new Date()
  },
  {
    id: 2,
    fullName: "القائد الأول", 
    role: "leader",
    createdAt: new Date()
  }
];

let works = [
  {
    id: 1,
    title: "حملة إطعام الأيتام",
    description: "توزيع وجبات ساخنة على الأطفال الأيتام",
    category: "خدمة اجتماعية",
    authorId: 1,
    workDate: new Date('2024-12-15'),
    beneficiariesCount: 50,
    approved: true,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "زيارة دار المسنين",
    description: "قضاء وقت مع كبار السن",
    category: "زيارات",
    authorId: 2,
    workDate: new Date('2024-12-18'),
    beneficiariesCount: 30,
    approved: true,
    createdAt: new Date()
  }
];

let news = [
  {
    id: 1,
    title: "إعلان عن حملة خيرية جديدة",
    content: "نعلن عن بدء حملة خيرية جديدة لمساعدة الأسر المحتاجة",
    summary: "حملة خيرية شتوية",
    authorId: 1,
    published: true,
    createdAt: new Date()
  }
];

let events = [
  {
    id: 1,
    title: "لقاء شهري للأعضاء",
    description: "اجتماع شهري لمناقشة الأعمال",
    eventDate: new Date('2025-01-15'),
    location: "قاعة الكنيسة",
    createdAt: new Date()
  }
];

let currentUserId = 3;
let currentWorkId = 3;
let currentNewsId = 2;
let currentEventId = 2;

// Helper functions
function getNextId(items) {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}

// Members routes
app.get("/api/members", (req, res) => {
  try {
    const membersWithStats = users.map(user => {
      const userWorks = works.filter(work => work.authorId === user.id);
      const totalBeneficiaries = userWorks.reduce((sum, work) => sum + work.beneficiariesCount, 0);
      return {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        worksCount: userWorks.length,
        totalBeneficiaries,
        createdAt: user.createdAt
      };
    });
    res.json(membersWithStats);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "فشل في جلب الأعضاء" });
  }
});

app.post("/api/members", (req, res) => {
  try {
    console.log("Creating member with data:", req.body);
    const validatedUser = insertUserSchema.parse(req.body);
    
    const newUser = {
      id: getNextId(users),
      fullName: validatedUser.fullName,
      role: validatedUser.role || 'member',
      createdAt: new Date()
    };
    
    users.push(newUser);
    console.log("Member created successfully:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating member:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
    } else {
      res.status(500).json({ message: "فشل في إنشاء العضو" });
    }
  }
});

app.get("/api/members/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ message: "العضو غير موجود" });
    }
    
    const userWorks = works.filter(work => work.authorId === user.id);
    const totalBeneficiaries = userWorks.reduce((sum, work) => sum + work.beneficiariesCount, 0);
    
    res.json({
      ...user,
      worksCount: userWorks.length,
      totalBeneficiaries
    });
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب العضو" });
  }
});

app.put("/api/members/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateData = req.body;
    
    console.log(`Updating member ${id} with data:`, updateData);
    
    const validatedData = insertUserSchema.partial().parse(updateData);
    
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      console.log(`Member ${id} not found for update`);
      return res.status(404).json({ message: "العضو غير موجود" });
    }
    
    // Update user with only valid fields
    if (validatedData.fullName !== undefined) users[userIndex].fullName = validatedData.fullName;
    if (validatedData.role !== undefined) users[userIndex].role = validatedData.role;
    
    console.log(`Member ${id} updated successfully:`, users[userIndex]);
    res.json(users[userIndex]);
  } catch (error) {
    console.error("Error updating member:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
    } else {
      res.status(500).json({ message: "فشل في تحديث العضو" });
    }
  }
});

app.delete("/api/members/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`Attempting to delete member with ID: ${id}`);
    
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    
    if (users.length === initialLength) {
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

// Works routes
app.get("/api/works", (req, res) => {
  try {
    const category = req.query.category;
    let filteredWorks = category ? works.filter(work => work.category === category) : works;
    
    const worksWithAuthors = filteredWorks.map(work => {
      const author = work.authorId ? users.find(u => u.id === work.authorId) : null;
      return {
        ...work,
        author: author ? { id: author.id, fullName: author.fullName } : null
      };
    });
    
    res.json(worksWithAuthors);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب الأعمال" });
  }
});

app.post("/api/works", (req, res) => {
  try {
    const validatedWork = insertWorkSchema.parse(req.body);
    const newWork = {
      ...validatedWork,
      id: getNextId(works),
      authorId: validatedWork.authorId || null,
      beneficiariesCount: validatedWork.beneficiariesCount || 0,
      images: validatedWork.images || null,
      approved: false,
      createdAt: new Date()
    };
    works.push(newWork);
    res.status(201).json(newWork);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
    } else {
      res.status(500).json({ message: "فشل في إنشاء العمل" });
    }
  }
});

// News routes
app.get("/api/news", (req, res) => {
  try {
    const publishedNews = news.filter(item => item.published);
    const newsWithAuthors = publishedNews.map(article => {
      const author = article.authorId ? users.find(u => u.id === article.authorId) : null;
      return {
        ...article,
        author: author ? { id: author.id, fullName: author.fullName } : null
      };
    });
    res.json(newsWithAuthors);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب الأخبار" });
  }
});

// Events routes
app.get("/api/events", (req, res) => {
  try {
    const now = new Date();
    const upcomingEvents = events.filter(event => new Date(event.eventDate) > now);
    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب الفعاليات" });
  }
});

// Statistics route - Fixed to count actual users consistently
app.get("/api/stats", (req, res) => {
  try {
    const totalBeneficiaries = works.reduce((sum, work) => sum + work.beneficiariesCount, 0);
    
    res.json({
      totalWorks: works.length,
      totalBeneficiaries,
      totalMembers: users.length // Always use users.length for consistency
    });
  } catch (error) {
    res.status(500).json({ message: "فشل في جلب الإحصائيات" });
  }
});

// Export for Vercel
export default app;

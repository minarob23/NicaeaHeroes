// Initialize storage once
let storage = null;

// Dynamic imports for Vercel compatibility
async function getStorage() {
  if (!storage) {
    const { storagePromise } = await import('./server/storage.js');
    storage = await storagePromise;
  }
  return storage;
}

async function getSchemas() {
  const schemas = await import('./shared/schema.js');
  return {
    insertWorkSchema: schemas.insertWorkSchema,
    insertNewsSchema: schemas.insertNewsSchema,
    insertEventSchema: schemas.insertEventSchema,
    insertUserSchema: schemas.insertUserSchema
  };
}

// Main API handler
export default async function handler(req, res) {
  const { method, url } = req;
  const storage = await getStorage();
  const { insertWorkSchema, insertNewsSchema, insertEventSchema, insertUserSchema } = await getSchemas();
  const { z } = await import('zod');
  
  // Parse URL path
  const urlPath = url.replace('/api', '');
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Works routes
    if (urlPath === '/works' && method === 'GET') {
      const category = req.query.category;
      const works = category 
        ? await storage.getWorksByCategory(category)
        : await storage.getAllWorks();
      
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
      return;
    }

    if (urlPath === '/works' && method === 'POST') {
      const validatedWork = insertWorkSchema.parse(req.body);
      const work = await storage.createWork(validatedWork);
      res.status(201).json(work);
      return;
    }

    // Stats route
    if (urlPath === '/stats' && method === 'GET') {
      const users = await storage.getAllUsers();
      const works = await storage.getAllWorks();
      
      const stats = {
        totalMembers: users.length,
        totalWorks: works.length,
        totalBeneficiaries: works.reduce((sum, work) => sum + (work.beneficiariesCount || 0), 0),
        volunteerHours: works.length * 2 // Estimate 2 hours per work
      };
      
      res.json(stats);
      return;
    }

    // Members routes
    if (urlPath === '/members' && method === 'GET') {
      const users = await storage.getAllUsers();
      const works = await storage.getAllWorks();
      
      const membersWithStats = users.map(user => {
        const userWorks = works.filter(work => work.authorId === user.id);
        return {
          ...user,
          worksCount: userWorks.length,
          totalBeneficiaries: userWorks.reduce((sum, work) => sum + (work.beneficiariesCount || 0), 0)
        };
      });
      
      res.json(membersWithStats);
      return;
    }

    if (urlPath === '/members' && method === 'POST') {
      const validatedUser = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedUser);
      res.status(201).json(user);
      return;
    }

    // News routes
    if (urlPath === '/news' && method === 'GET') {
      const news = await storage.getPublishedNews();
      res.json(news);
      return;
    }

    if (urlPath === '/news' && method === 'POST') {
      const validatedNews = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(validatedNews);
      res.status(201).json(newsItem);
      return;
    }

    // Events routes
    if (urlPath === '/events' && method === 'GET') {
      const events = await storage.getUpcomingEvents();
      res.json(events);
      return;
    }

    if (urlPath === '/events' && method === 'POST') {
      const validatedEvent = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedEvent);
      res.status(201).json(event);
      return;
    }

    // Contact route
    if (urlPath === '/contact' && method === 'POST') {
      // For now, just return success - in production you'd send email
      res.json({ message: "تم إرسال رسالتك بنجاح" });
      return;
    }

    // Default response for unmatched routes
    res.status(404).json({ message: 'Route not found' });

  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
    } else {
      res.status(500).json({ message: "حدث خطأ في الخادم" });
    }
  }
}
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
  try {
    const { method, url } = req;
    
    // Add debugging
    console.log('API Request:', method, url);
    
    const storage = await getStorage();
    const { insertWorkSchema, insertNewsSchema, insertEventSchema, insertUserSchema } = await getSchemas();
    const { z } = await import('zod');
    
    // Parse URL path - handle Vercel routing
    let urlPath = url;
    if (url.startsWith('/api')) {
      urlPath = url.replace('/api', '');
    }
    
    // If path is empty, default to root
    if (!urlPath || urlPath === '/') {
      urlPath = '/';
    }
    
    console.log('Parsed URL path:', urlPath);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
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

    // Add a test route for debugging
    if (urlPath === '/test' && method === 'GET') {
      res.json({ 
        message: 'API is working!', 
        method,
        url,
        urlPath,
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Default response for unmatched routes
    console.log('Route not found:', method, urlPath);
    res.status(404).json({ 
      message: 'Route not found',
      method,
      requestedPath: urlPath,
      availableRoutes: ['/works', '/stats', '/members', '/news', '/events', '/contact', '/test']
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: "حدث خطأ في الخادم",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
// Simple in-memory storage for Vercel deployment
const data = {
  works: [
    {
      id: 1,
      title: "توزيع الطعام على الفقراء",
      description: "قمنا بتوزيع وجبات طعام على الأسر المحتاجة في المنطقة",
      category: "إغاثة",
      workDate: "2024-01-15",
      beneficiariesCount: 50,
      authorId: 1,
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "زيارة دار المسنين",
      description: "قمنا بزيارة دار المسنين وقضاء وقت ممتع مع كبار السن",
      category: "رعاية اجتماعية",
      workDate: "2024-01-20",
      beneficiariesCount: 25,
      authorId: 2,
      createdAt: "2024-01-20T14:00:00Z"
    },
    {
      id: 3,
      title: "تنظيف الحديقة العامة",
      description: "شاركنا في تنظيف الحديقة العامة وزراعة الأشجار",
      category: "بيئة",
      workDate: "2024-01-25",
      beneficiariesCount: 30,
      authorId: 1,
      createdAt: "2024-01-25T09:00:00Z"
    }
  ],
  users: [
    {
      id: 1,
      fullName: "أحمد محمد",
      username: "ahmed",
      email: "ahmed@example.com",
      role: "متطوع",
      createdAt: "2024-01-01T00:00:00Z"
    },
    {
      id: 2,
      fullName: "فاطمة علي",
      username: "fatima",
      email: "fatima@example.com",
      role: "منسق",
      createdAt: "2024-01-01T00:00:00Z"
    }
  ],
  news: [
    {
      id: 1,
      title: "حملة جديدة لمساعدة الأسر المحتاجة",
      content: "تعلن كتيبة أبطال نيقية عن إطلاق حملة جديدة لمساعدة الأسر المحتاجة في المنطقة",
      publishedAt: "2024-01-10T10:00:00Z",
      isPublished: true,
      createdAt: "2024-01-10T10:00:00Z"
    }
  ],
  events: [
    {
      id: 1,
      title: "فعالية خيرية في الحديقة العامة",
      description: "انضموا إلينا في فعالية خيرية رائعة",
      eventDate: "2024-02-15T15:00:00Z",
      location: "الحديقة العامة المركزية",
      createdAt: "2024-01-30T10:00:00Z"
    }
  ]
};

// Main API handler
export default async function handler(req, res) {
  try {
    const { method, url } = req;
    
    console.log('API Request:', method, url);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // Health check
    if (url === '/api/health' || url === '/health') {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
      return;
    }
    
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
    
    // Handle specific ID routes
    const memberIdMatch = urlPath.match(/^\/members\/(\d+)$/);
    const workIdMatch = urlPath.match(/^\/works\/(\d+)$/);
    const newsIdMatch = urlPath.match(/^\/news\/(\d+)$/);
    const eventIdMatch = urlPath.match(/^\/events\/(\d+)$/);
    
    // Member ID routes (DELETE, PUT)
    if (memberIdMatch) {
      const memberId = parseInt(memberIdMatch[1]);
      
      if (method === 'DELETE') {
        const memberIndex = data.users.findIndex(user => user.id === memberId);
        if (memberIndex !== -1) {
          data.users.splice(memberIndex, 1);
          res.json({ message: "تم حذف العضو بنجاح" });
        } else {
          res.status(404).json({ message: "العضو غير موجود" });
        }
        return;
      }
      
      if (method === 'PUT') {
        const memberIndex = data.users.findIndex(user => user.id === memberId);
        if (memberIndex !== -1) {
          data.users[memberIndex] = { ...data.users[memberIndex], ...req.body };
          res.json(data.users[memberIndex]);
        } else {
          res.status(404).json({ message: "العضو غير موجود" });
        }
        return;
      }
    }
    
    // Work ID routes (DELETE, PUT)
    if (workIdMatch) {
      const workId = parseInt(workIdMatch[1]);
      
      if (method === 'DELETE') {
        const workIndex = data.works.findIndex(work => work.id === workId);
        if (workIndex !== -1) {
          data.works.splice(workIndex, 1);
          res.json({ message: "تم حذف العمل بنجاح" });
        } else {
          res.status(404).json({ message: "العمل غير موجود" });
        }
        return;
      }
      
      if (method === 'PUT') {
        const workIndex = data.works.findIndex(work => work.id === workId);
        if (workIndex !== -1) {
          data.works[workIndex] = { ...data.works[workIndex], ...req.body };
          res.json(data.works[workIndex]);
        } else {
          res.status(404).json({ message: "العمل غير موجود" });
        }
        return;
      }
    }
    
    // Works routes
    if (urlPath === '/works' && method === 'GET') {
      const worksWithAuthors = data.works.map(work => {
        const author = data.users.find(user => user.id === work.authorId);
        return {
          ...work,
          author: author ? { id: author.id, fullName: author.fullName } : null
        };
      });
      res.json(worksWithAuthors);
      return;
    }

    if (urlPath === '/works' && method === 'POST') {
      const newWork = {
        id: data.works.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      data.works.push(newWork);
      res.status(201).json(newWork);
      return;
    }

    // Stats route
    if (urlPath === '/stats' && method === 'GET') {
      const stats = {
        totalMembers: data.users.length,
        totalWorks: data.works.length,
        totalBeneficiaries: data.works.reduce((sum, work) => sum + (work.beneficiariesCount || 0), 0),
        volunteerHours: data.works.length * 2
      };
      res.json(stats);
      return;
    }

    // Members routes
    if (urlPath === '/members' && method === 'GET') {
      const membersWithStats = data.users.map(user => {
        const userWorks = data.works.filter(work => work.authorId === user.id);
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
      const newUser = {
        id: data.users.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      data.users.push(newUser);
      res.status(201).json(newUser);
      return;
    }

    // News routes
    if (urlPath === '/news' && method === 'GET') {
      res.json(data.news.filter(item => item.isPublished));
      return;
    }

    if (urlPath === '/news' && method === 'POST') {
      const newNews = {
        id: data.news.length + 1,
        ...req.body,
        isPublished: true,
        createdAt: new Date().toISOString()
      };
      data.news.push(newNews);
      res.status(201).json(newNews);
      return;
    }

    // Events routes
    if (urlPath === '/events' && method === 'GET') {
      res.json(data.events);
      return;
    }

    if (urlPath === '/events' && method === 'POST') {
      const newEvent = {
        id: data.events.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      data.events.push(newEvent);
      res.status(201).json(newEvent);
      return;
    }

    // Contact route
    if (urlPath === '/contact' && method === 'POST') {
      res.json({ message: "تم إرسال رسالتك بنجاح" });
      return;
    }

    // Health check route
    if (urlPath === '/health' && method === 'GET') {
      res.json({ 
        status: 'healthy',
        message: 'Nicaea Heroes API is working!', 
        method,
        url,
        urlPath,
        timestamp: new Date().toISOString(),
        dataLoaded: {
          users: data.users.length,
          works: data.works.length,
          news: data.news.length,
          events: data.events.length
        }
      });
      return;
    }

    // Test route  
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
      error: error.message
    });
  }
}
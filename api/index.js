
// Complete API handler for Vercel deployment
const data = {
  stats: {
    totalWorks: 3,
    totalBeneficiaries: 105,
    totalMembers: 77
  },
  members: [
    {
      id: 1,
      fullName: "المدير العام",
      role: "admin",
      worksCount: 1,
      totalBeneficiaries: 50,
      createdAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: 2,
      fullName: "القائد الأول",
      role: "leader",
      worksCount: 1,
      totalBeneficiaries: 30,
      createdAt: "2024-01-15T00:00:00.000Z"
    },
    {
      id: 3,
      fullName: "عضو نشط",
      role: "member",
      worksCount: 1,
      totalBeneficiaries: 25,
      createdAt: "2024-02-01T00:00:00.000Z"
    }
  ],
  works: [
    {
      id: 1,
      title: "حملة إطعام الأيتام",
      description: "توزيع وجبات ساخنة على الأطفال الأيتام في دار الرعاية",
      category: "خدمة اجتماعية",
      authorId: 1,
      workDate: "2024-12-15T00:00:00Z",
      beneficiariesCount: 50,
      approved: true,
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "زيارة دار المسنين",
      description: "قضاء وقت مع كبار السن وتقديم الدعم النفسي",
      category: "زيارات",
      authorId: 2,
      workDate: "2024-12-18T00:00:00Z",
      beneficiariesCount: 30,
      approved: true,
      createdAt: "2024-01-18T10:00:00Z"
    },
    {
      id: 3,
      title: "توزيع الملابس الشتوية",
      description: "توزيع ملابس شتوية دافئة على الأسر المحتاجة",
      category: "مساعدات",
      authorId: 3,
      workDate: "2024-12-20T00:00:00Z",
      beneficiariesCount: 25,
      approved: true,
      createdAt: "2024-01-20T10:00:00Z"
    }
  ],
  news: [
    {
      id: 1,
      title: "إعلان عن حملة خيرية جديدة",
      content: "نعلن عن بدء حملة خيرية جديدة لمساعدة الأسر المحتاجة في فصل الشتاء",
      summary: "حملة خيرية شتوية للأسر المحتاجة",
      published: true,
      authorId: 1,
      createdAt: "2024-01-10T10:00:00Z"
    },
    {
      id: 2,
      title: "نتائج الأعمال الخيرية لشهر ديسمبر",
      content: "تم إنجاز عدد كبير من الأعمال الخيرية خلال شهر ديسمبر",
      summary: "ملخص إنجازات شهر ديسمبر",
      published: true,
      authorId: 2,
      createdAt: "2024-01-12T10:00:00Z"
    }
  ],
  events: [
    {
      id: 1,
      title: "فعالية خيرية في الحديقة العامة",
      description: "انضموا إلينا في فعالية خيرية رائعة",
      eventDate: "2025-02-15T15:00:00Z",
      location: "الحديقة العامة المركزية",
      createdAt: "2024-01-30T10:00:00Z"
    },
    {
      id: 2,
      title: "لقاء شهري للأعضاء",
      description: "اجتماع شهري لمناقشة الأعمال والمشاريع القادمة",
      eventDate: "2025-01-15T18:00:00Z",
      location: "قاعة الكنيسة الرئيسية",
      createdAt: "2024-01-05T10:00:00Z"
    }
  ]
};

// Utility functions
function getNextId(array) {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}

function updateStats() {
  data.stats.totalWorks = data.works.length;
  data.stats.totalBeneficiaries = data.works.reduce((sum, work) => sum + work.beneficiariesCount, 0);
  data.stats.totalMembers = data.members.length;
}

function parseUrl(url) {
  if (url.startsWith('/api')) {
    return url.replace('/api', '');
  }
  return url || '/';
}

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
    
    // Parse URL path
    const urlPath = parseUrl(url);
    console.log('Parsed URL path:', urlPath);
    
    // Route handlers
    if (urlPath === '/stats' && method === 'GET') {
      res.json(data.stats);
      return;
    }

    if (urlPath === '/works' && method === 'GET') {
      res.json(data.works);
      return;
    }

    if (urlPath === '/news' && method === 'GET') {
      res.json(data.news);
      return;
    }

    if (urlPath === '/events' && method === 'GET') {
      res.json(data.events);
      return;
    }

    if (urlPath === '/members' && method === 'GET') {
      res.json(data.members);
      return;
    }

    // News operations
    if (urlPath === '/news' && method === 'POST') {
      const newsData = req.body;
      const newNews = {
        id: getNextId(data.news),
        ...newsData,
        createdAt: new Date().toISOString()
      };
      data.news.push(newNews);
      res.status(201).json(newNews);
      return;
    }

    const newsIdMatch = urlPath.match(/^\/news\/(\d+)$/);
    if (newsIdMatch) {
      const newsId = parseInt(newsIdMatch[1]);
      const newsIndex = data.news.findIndex(n => n.id === newsId);

      if (method === 'PUT') {
        if (newsIndex === -1) {
          res.status(404).json({ message: "الخبر غير موجود" });
          return;
        }
        
        const updateData = req.body;
        data.news[newsIndex] = { ...data.news[newsIndex], ...updateData };
        res.json(data.news[newsIndex]);
        return;
      }

      if (method === 'DELETE') {
        if (newsIndex === -1) {
          res.status(404).json({ message: "الخبر غير موجود" });
          return;
        }
        
        data.news.splice(newsIndex, 1);
        res.json({ message: "تم حذف الخبر بنجاح" });
        return;
      }

      if (method === 'GET') {
        if (newsIndex === -1) {
          res.status(404).json({ message: "الخبر غير موجود" });
          return;
        }
        res.json(data.news[newsIndex]);
        return;
      }
    }

    // Events operations
    if (urlPath === '/events' && method === 'POST') {
      const eventData = req.body;
      const newEvent = {
        id: getNextId(data.events),
        ...eventData,
        createdAt: new Date().toISOString()
      };
      data.events.push(newEvent);
      res.status(201).json(newEvent);
      return;
    }

    const eventIdMatch = urlPath.match(/^\/events\/(\d+)$/);
    if (eventIdMatch) {
      const eventId = parseInt(eventIdMatch[1]);
      const eventIndex = data.events.findIndex(e => e.id === eventId);

      if (method === 'PUT') {
        if (eventIndex === -1) {
          res.status(404).json({ message: "الفعالية غير موجودة" });
          return;
        }
        
        const updateData = req.body;
        data.events[eventIndex] = { ...data.events[eventIndex], ...updateData };
        res.json(data.events[eventIndex]);
        return;
      }

      if (method === 'DELETE') {
        if (eventIndex === -1) {
          res.status(404).json({ message: "الفعالية غير موجودة" });
          return;
        }
        
        data.events.splice(eventIndex, 1);
        res.json({ message: "تم حذف الفعالية بنجاح" });
        return;
      }

      if (method === 'GET') {
        if (eventIndex === -1) {
          res.status(404).json({ message: "الفعالية غير موجودة" });
          return;
        }
        res.json(data.events[eventIndex]);
        return;
      }
    }

    // Works operations
    if (urlPath === '/works' && method === 'POST') {
      const workData = req.body;
      const newWork = {
        id: getNextId(data.works),
        ...workData,
        createdAt: new Date().toISOString()
      };
      data.works.push(newWork);
      updateStats();
      res.status(201).json(newWork);
      return;
    }

    const workIdMatch = urlPath.match(/^\/works\/(\d+)$/);
    if (workIdMatch) {
      const workId = parseInt(workIdMatch[1]);
      const workIndex = data.works.findIndex(w => w.id === workId);

      if (method === 'PUT') {
        if (workIndex === -1) {
          res.status(404).json({ message: "العمل غير موجود" });
          return;
        }
        
        const updateData = req.body;
        data.works[workIndex] = { ...data.works[workIndex], ...updateData };
        updateStats();
        res.json(data.works[workIndex]);
        return;
      }

      if (method === 'DELETE') {
        if (workIndex === -1) {
          res.status(404).json({ message: "العمل غير موجود" });
          return;
        }
        
        data.works.splice(workIndex, 1);
        updateStats();
        res.json({ message: "تم حذف العمل بنجاح" });
        return;
      }

      if (method === 'GET') {
        if (workIndex === -1) {
          res.status(404).json({ message: "العمل غير موجود" });
          return;
        }
        res.json(data.works[workIndex]);
        return;
      }
    }

    // Members operations
    if (urlPath === '/members' && method === 'POST') {
      const memberData = req.body;
      const newMember = {
        id: getNextId(data.members),
        ...memberData,
        worksCount: memberData.worksCount || 0,
        totalBeneficiaries: memberData.totalBeneficiaries || 0,
        createdAt: new Date().toISOString()
      };
      data.members.push(newMember);
      updateStats();
      res.status(201).json(newMember);
      return;
    }

    const memberIdMatch = urlPath.match(/^\/members\/(\d+)$/);
    if (memberIdMatch) {
      const memberId = parseInt(memberIdMatch[1]);
      const memberIndex = data.members.findIndex(m => m.id === memberId);

      if (method === 'PUT') {
        if (memberIndex === -1) {
          res.status(404).json({ message: "العضو غير موجود" });
          return;
        }
        
        const updateData = req.body;
        data.members[memberIndex] = { ...data.members[memberIndex], ...updateData };
        updateStats();
        res.json(data.members[memberIndex]);
        return;
      }

      if (method === 'DELETE') {
        if (memberIndex === -1) {
          res.status(404).json({ message: "العضو غير موجود" });
          return;
        }
        
        data.members.splice(memberIndex, 1);
        updateStats();
        res.json({ message: "تم حذف العضو بنجاح" });
        return;
      }

      if (method === 'GET') {
        if (memberIndex === -1) {
          res.status(404).json({ message: "العضو غير موجود" });
          return;
        }
        res.json(data.members[memberIndex]);
        return;
      }
    }

    // Contact form
    if (urlPath === '/contact' && method === 'POST') {
      const { name, email, subject, message } = req.body;
      console.log("Contact form submission:", { name, email, subject, message });
      res.json({ message: "تم إرسال الرسالة بنجاح" });
      return;
    }

    // Health check
    if (urlPath === '/health') {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
      return;
    }

    // Not found
    res.status(404).json({ message: "Route not found" });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
}

import { db } from "./db";
import { users, works, news, events } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingUsers = await db.select().from(users);
    if (existingUsers.length > 0) {
      console.log("Database already has data, skipping seed");
      return;
    }

    console.log("Seeding database with initial data...");

    // Seed Users
    const sampleUsers = [
      {
        username: "john_peter",
        password: "password123",
        fullName: "يوحنا بطرس",
        email: "john@nicaea.org",
        role: "leader"
      },
      {
        username: "mary_joseph",
        password: "password123",
        fullName: "مريم يوسف",
        email: "mary@nicaea.org",
        role: "admin"
      },
      {
        username: "michael_david",
        password: "password123",
        fullName: "ميخائيل داود",
        email: "michael@nicaea.org",
        role: "member"
      }
    ];

    const insertedUsers = await db.insert(users).values(sampleUsers).returning();
    console.log(`Inserted ${insertedUsers.length} users`);

    // Seed Works
    const sampleWorks = [
      {
        title: "حملة إطعام الأيتام",
        description: "توزيع وجبات ساخنة على الأطفال الأيتام في دار الرعاية",
        category: "خدمة اجتماعية",
        authorId: insertedUsers[0].id,
        workDate: new Date('2024-12-15'),
        beneficiariesCount: 50,
        images: null,
        approved: true
      },
      {
        title: "زيارة دار المسنين",
        description: "قضاء وقت مع كبار السن وتقديم الدعم النفسي",
        category: "زيارات",
        authorId: insertedUsers[1].id,
        workDate: new Date('2024-12-18'),
        beneficiariesCount: 30,
        images: null,
        approved: true
      },
      {
        title: "توزيع الملابس الشتوية",
        description: "توزيع ملابس شتوية دافئة على الأسر المحتاجة",
        category: "مساعدات",
        authorId: insertedUsers[2].id,
        workDate: new Date('2024-12-20'),
        beneficiariesCount: 25,
        images: null,
        approved: true
      }
    ];

    const insertedWorks = await db.insert(works).values(sampleWorks).returning();
    console.log(`Inserted ${insertedWorks.length} works`);

    // Seed News
    const sampleNews = [
      {
        title: "إعلان عن حملة خيرية جديدة",
        content: "نعلن عن بدء حملة خيرية جديدة لمساعدة الأسر المحتاجة في فصل الشتاء",
        excerpt: "حملة خيرية شتوية للأسر المحتاجة",
        category: "إعلان مهم",
        authorId: insertedUsers[0].id,
        published: true,
        relatedWorkIds: null
      },
      {
        title: "نتائج الأعمال الخيرية لشهر ديسمبر",
        content: "تم إنجاز عدد كبير من الأعمال الخيرية خلال شهر ديسمبر",
        excerpt: "ملخص إنجازات شهر ديسمبر",
        category: "أخبار",
        authorId: insertedUsers[1].id,
        published: true,
        relatedWorkIds: null
      }
    ];

    const insertedNews = await db.insert(news).values(sampleNews).returning();
    console.log(`Inserted ${insertedNews.length} news articles`);

    // Seed Events
    const sampleEvents = [
      {
        title: "لقاء شهري للأعضاء",
        description: "اجتماع شهري لمناقشة الأعمال والمشاريع القادمة",
        eventDate: new Date('2025-01-15'),
        location: "قاعة الكنيسة الرئيسية"
      },
      {
        title: "ورشة تدريبية للعمل التطوعي",
        description: "ورشة تدريبية لتطوير مهارات العمل التطوعي",
        eventDate: new Date('2025-01-25'),
        location: "مركز التدريب"
      }
    ];

    const insertedEvents = await db.insert(events).values(sampleEvents).returning();
    console.log(`Inserted ${insertedEvents.length} events`);

    console.log("Database seeding completed successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
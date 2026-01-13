import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cycle, CycleDocument } from '../schemas/cycle.schema';
import { DailyLog, DailyLogDocument } from '../schemas/daily-log.schema';
import { Article, ArticleDocument } from '../schemas/article.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
    @InjectModel(DailyLog.name) private dailyLogModel: Model<DailyLogDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async seedAll() {
    await this.seedArticles();
    await this.seedCycles();
    await this.seedDailyLogs();

    return {
      message: 'Database seeded successfully',
      cycles: await this.cycleModel.countDocuments(),
      dailyLogs: await this.dailyLogModel.countDocuments(),
      articles: await this.articleModel.countDocuments(),
    };
  }

  async seedArticles() {
    const articles = [
      {
        title: 'Understanding Your Menstrual Cycle',
        description: 'Learn about the phases of your menstrual cycle and how to track them effectively.',
        imageUrl: '/article-1.svg',
        author: 'Dr. Sarah Johnson',
        category: 'Education',
        url: '#',
        content: 'Your menstrual cycle is a complex process...',
        isActive: true,
      },
      {
        title: 'Managing Period Symptoms Naturally',
        description: 'Natural remedies and lifestyle changes to help manage common period symptoms.',
        imageUrl: '/article-2.svg',
        author: 'Dr. Maria Garcia',
        category: 'Health',
        url: '#',
        content: 'Many women experience discomfort during their periods...',
        isActive: true,
      },
      {
        title: 'Nutrition Tips for Hormonal Balance',
        description: 'How diet affects your hormones and what foods can support your cycle health.',
        imageUrl: '/article-3.svg',
        author: 'Dr. Emily Chen',
        category: 'Nutrition',
        url: '#',
        content: 'What you eat can significantly impact your hormonal health...',
        isActive: true,
      },
    ];

    // Clear existing articles and insert new ones
    await this.articleModel.deleteMany({});
    await this.articleModel.insertMany(articles);
  }

  async seedCycles() {
    const now = new Date();
    const cycles = [];

    // Generate cycles for the past 6 months
    for (let i = 5; i >= 0; i--) {
      const cycleStart = new Date(now);
      cycleStart.setMonth(cycleStart.getMonth() - i);
      cycleStart.setDate(1 + (i * 7)); // Vary the start date

      const cycleLength = 26 + Math.floor(Math.random() * 7); // 26-32 days
      const periodLength = 4 + Math.floor(Math.random() * 3); // 4-6 days
      const cycleEnd = new Date(cycleStart);
      cycleEnd.setDate(cycleEnd.getDate() + cycleLength - 1);

      cycles.push({
        startDate: cycleStart,
        endDate: cycleEnd,
        cycleLength,
        periodLength,
        symptoms: this.getRandomSymptoms(),
        averageFlow: ['light', 'medium', 'heavy'][Math.floor(Math.random() * 3)],
      });
    }

    await this.cycleModel.deleteMany({});
    await this.cycleModel.insertMany(cycles);
  }

  async seedDailyLogs() {
    const now = new Date();
    const logs = [];
    const symptomsList = [
      'Mild Bloating',
      'Cravings',
      'Cramps',
      'Headache',
      'Fatigue',
      'Mood Swings',
      'Back Pain',
      'Breast Tenderness',
    ];
    const healthActivities = ['Pilates', 'Yoga', 'Walking', 'Running', 'Swimming', 'Gym'];

    // Generate daily logs for the past 3 months
    for (let i = 90; i >= 0; i--) {
      const logDate = new Date(now);
      logDate.setDate(logDate.getDate() - i);
      logDate.setHours(0, 0, 0, 0);

      // Determine if it's a period day (roughly every 28 days, for 5 days)
      const daysSinceEpoch = Math.floor(logDate.getTime() / (1000 * 60 * 60 * 24));
      const cycleDay = daysSinceEpoch % 28;
      const isPeriodDay = cycleDay < 5;

      // Randomly add symptoms (more likely during period)
      const hasSymptoms = isPeriodDay || Math.random() > 0.7;
      const symptoms = hasSymptoms
        ? [symptomsList[Math.floor(Math.random() * symptomsList.length)]]
        : [];

      // Flow intensity (higher during period days)
      const flowIntensity = isPeriodDay
        ? 3 + Math.floor(Math.random() * 7) // 3-10 during period
        : Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0; // Occasionally light flow

      // Random health activity
      const hasActivity = Math.random() > 0.6;
      const healthActivitiesList = hasActivity
        ? [healthActivities[Math.floor(Math.random() * healthActivities.length)]]
        : [];

      // Notes (occasionally)
      const notes = Math.random() > 0.85 ? 'Feeling good today!' : '';

      logs.push({
        date: logDate,
        symptoms,
        flowIntensity,
        notes,
        healthActivities: healthActivitiesList,
        isPeriodDay,
      });
    }

    await this.dailyLogModel.deleteMany({});
    await this.dailyLogModel.insertMany(logs);
  }

  private getRandomSymptoms(): string[] {
    const symptoms = ['Bloating', 'Cramps', 'Headache', 'Fatigue', 'Mood Swings'];
    const count = Math.floor(Math.random() * 3) + 1; // 1-3 symptoms
    const selected = [];
    const used = new Set<number>();

    while (selected.length < count) {
      const idx = Math.floor(Math.random() * symptoms.length);
      if (!used.has(idx)) {
        used.add(idx);
        selected.push(symptoms[idx]);
      }
    }

    return selected;
  }

  async clearAll() {
    await this.cycleModel.deleteMany({});
    await this.dailyLogModel.deleteMany({});
    await this.articleModel.deleteMany({});

    return {
      message: 'Database cleared successfully',
    };
  }
}

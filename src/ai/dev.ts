import { config } from 'dotenv';
config();

import '@/ai/flows/article-summarization.ts';
import '@/ai/flows/article-scraper.ts';
import '@/ai/flows/submit-news-flow.ts';

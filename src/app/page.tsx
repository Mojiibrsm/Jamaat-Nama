import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { NewsFeed } from "@/components/news-feed";
import { articles } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <NewsFeed articles={articles} />
      </main>
    </div>
  );
}

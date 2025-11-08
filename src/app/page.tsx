import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CrimeCategoryGrid } from "@/components/crime-category-grid";
import { NewsFeed } from "@/components/news-feed";
import { articles } from "@/lib/data";
import { SearchSection } from "@/components/search-section";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <SearchSection />
        <CrimeCategoryGrid />
        <NewsFeed articles={articles} />
      </main>
    </div>
  );
}

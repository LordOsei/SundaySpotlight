import { SiteHeader } from "@/components/site-header";
import { PostEditor } from "@/components/post-editor";
import { PostFeed } from "@/components/post-feed";
import { PostBanner } from "@/components/post-banner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <PostBanner />
      <main className="flex-1 container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Discover Local Spots</h2>
            <p className="text-muted-foreground mt-1">
              Explore Houston's best brunch destinations
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="rounded-full">
                <Plus className="mr-2 h-4 w-4" />
                Share Your Spot
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Share Your Favorite Brunch Spot</h2>
                <PostEditor />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <PostFeed />
      </main>
    </div>
  );
}
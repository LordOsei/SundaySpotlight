import { SiteHeader } from "@/components/site-header";
import { PostEditor } from "@/components/post-editor";
import { PostFeed } from "@/components/post-feed";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Recent Posts</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Create a New Post</h2>
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

import { useQuery } from "@tanstack/react-query";
import { Post, User } from "@shared/schema";
import { PostCard } from "./post-card";
import { Loader2 } from "lucide-react";

export function PostFeed() {
  const { data: posts, isLoading } = useQuery<(Post & { author: User })[]>({
    queryKey: ["/api/posts"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No brunch spots shared yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
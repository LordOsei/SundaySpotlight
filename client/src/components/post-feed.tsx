import { useQuery } from "@tanstack/react-query";
import { Post, User } from "@shared/schema";
import { PostCard } from "./post-card";

export function PostFeed() {
  const { data: posts, isLoading } = useQuery<(Post & { author: User })[]>({
    queryKey: ["/api/posts"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

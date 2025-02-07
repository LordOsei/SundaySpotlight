import { Post, User } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";

interface PostCardProps {
  post: Post & { author: User };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      {post.imageUrl && (
        <div className="aspect-video relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader className="flex flex-row items-center gap-4">
        <div>
          <h3 className="font-semibold text-lg">{post.title}</h3>
          <p className="text-sm text-muted-foreground">
            by {post.author.username} on{" "}
            {format(new Date(post.createdAt), "MMM d, yyyy")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </CardContent>
    </Card>
  );
}

import { Post, User } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface PostCardProps {
  post: Post & { author: User };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-[4/3] relative overflow-hidden">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Shared by {post.author.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(post.createdAt), "MMM d, yyyy")}
          </p>
          <p className="mt-2 text-sm line-clamp-2">{post.content}</p>
        </div>
      </Card>
    </motion.div>
  );
}
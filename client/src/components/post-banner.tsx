import { motion } from "framer-motion";
import { Post, User } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

export function PostBanner() {
  const { data: posts } = useQuery<(Post & { author: User })[]>({
    queryKey: ["/api/posts"],
  });

  const recentPosts = posts?.slice(0, 3) || [];

  return (
    <div className="w-full bg-primary/5 py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">What's your favorite brunch spot in Houston?</h1>
          <p className="text-muted-foreground">Join the conversation and share your Sunday recommendations</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="bg-card rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  by {post.author.username} on {format(new Date(post.createdAt), "MMM d, yyyy")}
                </p>
                <div className="flex items-center text-sm text-primary">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

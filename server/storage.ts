import { User, Post, InsertUser, InsertPost } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";
import { z } from "zod";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPosts(): Promise<(Post & { author: User })[]>;
  createPost(post: InsertPost & { authorId: number }): Promise<Post & { author: User }>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private currentUserId: number;
  private currentPostId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPosts(): Promise<(Post & { author: User })[]> {
    return Array.from(this.posts.values())
      .map((post) => ({
        ...post,
        author: this.users.get(post.authorId)!,
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createPost(data: InsertPost & { authorId: number }): Promise<Post & { author: User }> {
    const id = this.currentPostId++;
    const post: Post = {
      ...data,
      id,
      createdAt: new Date(),
    };
    this.posts.set(id, post);
    return {
      ...post,
      author: this.users.get(post.authorId)!,
    };
  }
}

export const storage = new MemStorage();

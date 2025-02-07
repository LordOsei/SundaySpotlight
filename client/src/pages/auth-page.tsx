import { useAuth } from "@/hooks/use-auth";
import { LoginForm, RegisterForm } from "@/components/auth-forms";
import { Redirect } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";

export default function AuthPage() {
  const { user } = useAuth();

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 container grid lg:grid-cols-2 gap-12 items-center py-8">
        <div className="lg:order-2">
          <div
            className="h-[600px] rounded-lg bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1493770348161-369560ae357d")',
            }}
          />
        </div>
        <div className="space-y-6 lg:order-1">
          <div>
            <h1 className="text-3xl font-bold">Welcome to 4sundaze</h1>
            <p className="text-muted-foreground mt-2">
              Join our community to discover and share your favorite Sunday spots.
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register" className="mt-4">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

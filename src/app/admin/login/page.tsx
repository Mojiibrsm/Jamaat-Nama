
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth as useFirebaseAuth } from '@/firebase/provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { auth, user, loading: authLoading } = useFirebaseAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/admin');
    }
  }, [user, authLoading, router]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'লগইন সফল হয়েছে',
        description: 'আপনাকে অ্যাডমিন ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে।',
      });
      router.push('/admin');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'লগইন ব্যর্থ হয়েছে',
        description: 'আপনার ইমেইল বা পাসওয়ার্ড ভুল। অনুগ্রহ করে আবার চেষ্টা করুন।',
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (authLoading || user) {
    return (
       <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40">
       <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4">
                 <Image 
                    src="https://ik.imagekit.io/uekohag7w/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BE%E0%A7%9F%E0%A6%BE%E0%A6%A4%20%E0%A6%A8%E0%A6%BE%E0%A6%AE%E0%A6%BE_20251108_185925_0000.png"
                    alt="Jamaat Nama Logo"
                    width={180}
                    height={48}
                    className="object-contain"
                />
            </div>
          <CardTitle className="text-2xl">অ্যাডমিন লগইন</CardTitle>
          <CardDescription>
            অ্যাডমিন প্যানেল অ্যাক্সেস করতে আপনার ইমেইল ও পাসওয়ার্ড দিন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'লগইন করুন'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

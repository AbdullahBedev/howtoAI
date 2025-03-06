'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'inline' | 'card';
}

export function NewsletterSignup({ className = '', variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual newsletter service integration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="max-w-xs"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    );
  }

  if (variant === 'card') {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Subscribe to Our Newsletter</CardTitle>
          <CardDescription>Get the latest AI education updates and tutorials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`bg-muted/50 p-8 rounded-lg ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Stay Updated</h3>
      </div>
      <p className="text-muted-foreground mb-6">
        Subscribe to our newsletter for the latest AI education tips, tutorials, and updates.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
} 
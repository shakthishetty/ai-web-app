"use client";

import { authClient } from '@/lib/auth.client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const Logout = () => {
     const router = useRouter();
  
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signIn"); // Redirect to sign-in page after logout
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleLogout}>
      Sign Out
    </Button>
  );
}

export default Logout;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
    setIsLoggedIn(true); // Update login status on submit
  };

  const handleDemoLogin = () => {
    setEmail("demo@wandernest.com");
    setPassword("demo1234");
    // Optionally, auto-submit or show a toast
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] via-[#414345] to-[#0f2027] flex items-center justify-center p-4 relative overflow-hidden text-white font-playfair">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Plane className="h-16 w-16 text-white" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-bounce-subtle">
        <Plane className="h-12 w-12 text-white rotate-45" />
      </div>

      {/* Login Card */}
      <Card className="glassmorphism w-full max-w-md animate-fade-in bg-[#232526]/80 border-none shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 text-primary mr-2" />
            <span className="font-playfair text-2xl font-bold text-foreground">
              WanderNest
            </span>
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-foreground">
            Welcome Back
          </CardTitle>
          <p className="text-muted-foreground">
            Sign in to continue your travel journey
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 glassmorphism border-white/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 glassmorphism border-white/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white font-bold shadow-lg hover:scale-105 transition-transform">
              Sign In
            </Button>
            <Button type="button" onClick={handleDemoLogin} className="w-full mt-2 bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] text-white font-bold shadow-lg hover:scale-105 transition-transform">
              Demo Login
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </form>

          {/* Optionally, show animated welcome (WanderBot handshake or bird flying)
              Example: set a state and show animation component */}
          {isLoggedIn && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-foreground">
                Login Successful! Welcome back to WanderNest.
              </p>
              {/* Add animation component here */}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2"
      >
        <Plane className="h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default Login;
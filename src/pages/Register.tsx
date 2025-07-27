import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import API from '../services/api';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);

    API.post("/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
      .then((res) => {
        console.log("Registered:", res.data);
        setRegistrationSuccess(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDemoRegister = () => {
    setFormData({
      name: "Demo User",
      email: "demo@wandernest.com",
      password: "demo1234",
      confirmPassword: "demo1234"
    });
    // Optionally, auto-submit or show a toast
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] via-[#414345] to-[#0f2027] flex items-center justify-center p-4 relative overflow-hidden text-white font-playfair">
      {/* Animated Background Elements */}
      <div className="absolute top-16 right-20 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <Plane className="h-20 w-20 text-white rotate-12" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-20 animate-bounce-subtle">
        <Plane className="h-14 w-14 text-white -rotate-12" />
      </div>

      {/* Register Card */}
      <Card className="glassmorphism w-full max-w-md animate-fade-in bg-[#232526]/80 border-none shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 text-primary mr-2" />
            <span className="font-playfair text-2xl font-bold text-foreground">
              WanderNest
            </span>
          </div>
          <CardTitle className="text-2xl font-playfair font-bold text-foreground">
            Join WanderNest
          </CardTitle>
          <p className="text-muted-foreground">
            Start your smart travel planning journey
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10 glassmorphism border-white/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 pr-10 glassmorphism border-white/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input type="checkbox" required className="rounded border-gray-300 text-primary focus:ring-primary mt-1" />
              <span className="ml-2 text-sm text-muted-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] text-white font-bold shadow-lg hover:scale-105 transition-transform">
              Create Account
            </Button>
            <Button type="button" onClick={handleDemoRegister} className="w-full mt-2 bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white font-bold shadow-lg hover:scale-105 transition-transform">
              Demo Register
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>

          {/* Success Message / Animation Placeholder */}
          {registrationSuccess && (
            <div className="mt-4 text-center">
              <p className="text-green-400 font-semibold">
                Registration successful! Welcome to WanderNest.
              </p>
              {/* Placeholder for animated welcome (e.g., WanderBot handshake) */}
              {/* <WanderBotAnimation className="mx-auto mt-2" /> */}
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

export default Register;
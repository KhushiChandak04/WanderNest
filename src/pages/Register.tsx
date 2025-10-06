import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Plane, Check, X, ArrowLeft, Globe, Sparkles, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.password || formData.password !== formData.confirmPassword) {
      setError('Please fill all fields and make sure passwords match.');
      setIsLoading(false);
      return;
    }

    try {
      await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Do NOT store token on sign-up; redirect to login for clarity
      setShowSuccess(true);
      setIsLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 900);
    } catch (err: any) {
      const msg = err?.response?.data?.error || 'Registration failed. Please try again.';
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleDemoRegister = () => {
    setFormData({
      name: "Demo User",
      email: "demo@wandernest.com",
      password: "demo1234",
      confirmPassword: "demo1234"
    });
    setTimeout(() => {
      setShowSuccess(true);
      setIsLoading(false);
    }, 500);
  };

  const go = (path: string) => navigate(path);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 pt-24 pb-10 flex items-start justify-center">
        {/* Main Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-soft overflow-hidden">
            {/* Header */}
            <div className="text-center p-8 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 mx-auto flex items-center justify-center shadow-medium mb-4">
                <Plane className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-1">Create Your Account</h1>
              <p className="text-foreground/70">Join WanderNest and start your journey!</p>
            </div>

          {/* Success Animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">Registration successful</h3>
                  <p className="text-foreground/70">Redirecting to login…</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Register Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white border border-blue-200 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-2"
              >
                <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white border border-blue-200 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
                  >
                    <X className="h-4 w-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Register Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Plane className="h-5 w-5" />
                    Create Account
                  </>
                )}
              </motion.button>

              {/* Demo Register Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                type="button"
                onClick={handleDemoRegister}
                disabled={isLoading}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold py-3 px-6 rounded-xl border border-blue-100 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Demo Register
              </motion.button>
            </form>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-8"
            >
              <span className="text-foreground/70">Already have an account? </span>
              <button
                type="button"
                onClick={() => go('/login')}
                className="text-blue-700 hover:underline font-medium"
              >
                Sign in
              </button>
            </motion.div>
          </div>
          {/* Subtle features strip */}
          <div className="grid grid-cols-3 gap-4 text-center mt-6 mb-2">
            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <Globe className="h-5 w-5 text-blue-700 mx-auto mb-1" />
              <p className="text-foreground text-xs">120+ Countries</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <Plane className="h-5 w-5 text-blue-700 mx-auto mb-1" />
              <p className="text-foreground text-xs">AI Planning</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <Sparkles className="h-5 w-5 text-blue-700 mx-auto mb-1" />
              <p className="text-foreground text-xs">Premium Support</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default Register;
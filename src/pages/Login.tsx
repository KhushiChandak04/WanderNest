import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Plane, Check, X, ArrowLeft, Globe, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/bg.jpg";
import API from '../services/api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await API.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);

      // Optionally store session token
      const token = response?.data?.session?.access_token;
      if (token) {
        try { localStorage.setItem('wandernest_token', token); } catch {}
      }
      setShowSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
        try { window.location.href = '/'; } catch {}
      }, 800);
    } catch (err) {
      const msg = (err?.response?.data?.error) || 'Invalid email or password. Please try again.';
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@wandernest.com');
    setPassword('demo1234');
    setTimeout(() => {
      handleSubmit();
    }, 150);
  };

  const handleGoogleLogin = () => {
    console.log('Google OAuth login');
    setShowSuccess(true);
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-background text-foreground" style={{ marginTop: '80px' }}>
      {/* Back to Home Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-foreground hover:opacity-80 transition-all duration-300 flex items-center gap-2 box-lightblue px-4 py-2 rounded-full border z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </motion.button>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
  <div className="bg-white rounded-3xl shadow-soft border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="text-center p-8 pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#e94560] to-[#f8b400] rounded-2xl flex items-center justify-center shadow-lg">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-6 w-6 text-[#f8b400]" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-foreground mb-2"
            >
              Welcome Back
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-foreground/80 text-lg"
            >
              Continue your journey with <span className="text-blue-700 font-semibold">WanderNest</span>
            </motion.p>
          </div>

          {/* Success Animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-white/95 flex items-center justify-center z-20 rounded-3xl border border-blue-100"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <Check className="h-10 w-10 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-foreground mb-2"
                  >
                    Welcome Back!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-foreground/80"
                  >
                    Redirecting to your dashboard...
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <div className="px-8 pb-8">
            <div className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/60" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-blue-100 rounded-xl text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-300"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/60" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white border border-blue-100 rounded-xl text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <X className="h-4 w-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-white border-blue-200 rounded focus:ring-blue-400 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-foreground/80">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-blue-700 hover:opacity-80 transition-colors"
                >
                  Forgot password?
                </button>
              </motion.div>

              {/* Login Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Plane className="h-5 w-5" />
                    Sign In to WanderNest
                  </>
                )}
              </motion.button>

              {/* Demo Login Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Try Demo Account
              </motion.button>
            </div>

            {/* Social login removed as requested */}

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-center mt-8"
            >
              <span className="text-foreground/70">Don't have an account? </span>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-700 hover:opacity-80 font-semibold transition-colors"
              >
                Create Account
              </button>
            </motion.div>
          </div>
        </div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="box-lightblue rounded-2xl p-4">
            <Globe className="h-6 w-6 text-blue-700 mx-auto mb-2" />
            <p className="text-foreground text-xs font-medium">120+ Countries</p>
          </div>
          <div className="box-lightblue rounded-2xl p-4">
            <Plane className="h-6 w-6 text-blue-700 mx-auto mb-2" />
            <p className="text-foreground text-xs font-medium">AI Planning</p>
          </div>
          <div className="box-lightblue rounded-2xl p-4">
            <Sparkles className="h-6 w-6 text-blue-700 mx-auto mb-2" />
            <p className="text-foreground text-xs font-medium">Premium Support</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Login Success Modal */}
      <AnimatePresence>
        {isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl p-8 text-center max-w-md w-full border border-white/20 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Plane className="h-16 w-16 text-[#e94560] mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Login Successful!</h2>
              <p className="text-gray-300 mb-6">
                Welcome back to WanderNest. Get ready for your next adventure!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                Go to Dashboard
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
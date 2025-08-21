import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Plane, Check, X, ArrowLeft, Globe, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/bg.jpg";

// Mock API for demo purposes
const API = {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === 'demo@wandernest.com' && data.password === 'demo1234') {
          resolve({ data: { success: true, user: { name: 'Demo User', email: data.email } } });
        } else if (data.email && data.password) {
          resolve({ data: { success: true, user: { name: 'Travel Explorer', email: data.email } } });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  }
};

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await API.post('/login', { email, password });
      console.log('Login successful:', response.data);
      setShowSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
        // In a real app, you would navigate here: navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
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
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        marginTop: '80px',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(26,26,46,0.85)",
        backgroundBlendMode: "overlay",
        fontFamily: `'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
      }}
    >
      {/* Back to Home Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 z-10"
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
        <div className="bg-gradient-to-br from-[#232526]/90 to-[#414345]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
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
              className="text-3xl font-bold text-white mb-2"
            >
              Welcome Back
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-lg"
            >
              Continue your journey with <span className="text-[#e94560] font-semibold">WanderNest</span>
            </motion.p>
          </div>

          {/* Success Animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/95 to-[#0f3460]/95 flex items-center justify-center z-20 rounded-3xl"
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
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Welcome Back!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-300"
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
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560] focus:border-transparent transition-all duration-300"
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
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560] focus:border-transparent transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                    className="w-4 h-4 text-[#e94560] bg-white/10 border-white/20 rounded focus:ring-[#e94560] focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-[#e94560] hover:text-[#f8b400] transition-colors"
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
                className="w-full bg-gradient-to-r from-[#e94560] to-[#f8b400] hover:from-[#f8b400] hover:to-[#e94560] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
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
                className="w-full bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] hover:from-[#b621fe] hover:to-[#1fd1f9] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Try Demo Account
              </motion.button>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="relative my-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-[#232526] to-[#414345] px-4 text-gray-400">
                  Or continue with
                </span>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="space-y-3"
            >
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs text-black font-bold">G</span>
                </div>
                Continue with Google
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span className="text-blue-400 font-bold">f</span>
                  Facebook
                </button>
                <button 
                  type="button"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span className="text-blue-300 font-bold">𝕏</span>
                  Twitter
                </button>
              </div>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-center mt-8"
            >
              <span className="text-gray-400">Don't have an account? </span>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-[#e94560] hover:text-[#f8b400] font-semibold transition-colors"
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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <Globe className="h-6 w-6 text-[#e94560] mx-auto mb-2" />
            <p className="text-white text-xs font-medium">120+ Countries</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <Plane className="h-6 w-6 text-[#1fd1f9] mx-auto mb-2" />
            <p className="text-white text-xs font-medium">AI Planning</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <Sparkles className="h-6 w-6 text-[#f8b400] mx-auto mb-2" />
            <p className="text-white text-xs font-medium">Premium Support</p>
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
                className="bg-gradient-to-r from-[#e94560] to-[#f8b400] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
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
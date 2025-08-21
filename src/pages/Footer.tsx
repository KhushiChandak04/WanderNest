import bgImage from "../assets/bg.jpg";

const FooterPage = () => (
  <div
    className="min-h-screen flex flex-col justify-end"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      backgroundRepeat: "no-repeat",
      backgroundColor: "rgba(26,26,46,0.92)",
      backgroundBlendMode: "overlay",
      fontFamily: `'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
      color: "#f3f4f6"
    }}
  >
    {/* Footer */}
    <footer className="bg-gradient-to-r from-[#1a1a2e] to-[#232526] py-16 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold mb-4">🌍 WanderNest</div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Transforming the way you travel with intelligent planning, local insights, 
              and seamless experiences. Your journey to extraordinary destinations starts here.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 bg-gradient-to-r from-[#e94560] to-[#f8b400] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-white text-xl">📷</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-white text-xl">🐦</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 bg-gradient-to-r from-[#b621fe] to-[#e94560] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-white text-xl">💼</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-300 hover:text-[#e94560] transition-colors">About Us</a>
              <a href="/destinations" className="block text-gray-300 hover:text-[#e94560] transition-colors">Destinations</a>
              <a href="/blog" className="block text-gray-300 hover:text-[#e94560] transition-colors">Travel Blog</a>
              <a href="/careers" className="block text-gray-300 hover:text-[#e94560] transition-colors">Careers</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Support</h4>
            <div className="space-y-2">
              <a href="/help" className="block text-gray-300 hover:text-[#e94560] transition-colors">Help Center</a>
              <a href="/contact" className="block text-gray-300 hover:text-[#e94560] transition-colors">Contact Us</a>
              <a href="/privacy" className="block text-gray-300 hover:text-[#e94560] transition-colors">Privacy Policy</a>
              <a href="/terms" className="block text-gray-300 hover:text-[#e94560] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WanderNest. All rights reserved. | Made with ❤️ for travelers worldwide
          </div>
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
            </span>
            <span>🌍 Serving 120+ Countries</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default FooterPage;
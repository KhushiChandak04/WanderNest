import bgImage from "../assets/bg.jpg";

const FooterPage = () => (
  <div className="min-h-screen flex flex-col justify-end bg-background text-foreground">
    {/* Footer */}
    <footer className="bg-background py-16 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold mb-4">🌍 WanderNest</div>
            <p className="text-foreground text-lg leading-relaxed mb-6">
              Transforming the way you travel with intelligent planning, local insights, 
              and seamless experiences. Your journey to extraordinary destinations starts here.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 box-lightblue rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-foreground text-xl">📷</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 box-lightblue rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-foreground text-xl">🐦</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 box-lightblue rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-foreground text-xl">💼</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4 text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-foreground hover:text-primary transition-colors">About Us</a>
              <a href="/destinations" className="block text-foreground hover:text-primary transition-colors">Destinations</a>
              <a href="/blog" className="block text-foreground hover:text-primary transition-colors">Travel Blog</a>
              <a href="/careers" className="block text-foreground hover:text-primary transition-colors">Careers</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4 text-foreground">Support</h4>
            <div className="space-y-2">
              <a href="/help" className="block text-foreground hover:text-primary transition-colors">Help Center</a>
              <a href="/contact" className="block text-foreground hover:text-primary transition-colors">Contact Us</a>
              <a href="/privacy" className="block text-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="block text-foreground hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-100 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-foreground/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WanderNest. All rights reserved. | Made with ❤️ for travelers worldwide
          </div>
          <div className="flex items-center space-x-4 text-foreground/70 text-sm">
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
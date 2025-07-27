import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient, delay = '0s' }: FeatureCardProps) => {
  return (
    <Card 
      className="feature-card group cursor-pointer"
      style={{ animationDelay: delay }}
    >
      <div className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
      
      <div className="mt-6">
        <div className="inline-flex items-center text-primary font-medium group-hover:gap-2 gap-1 transition-all duration-300">
          Learn More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;
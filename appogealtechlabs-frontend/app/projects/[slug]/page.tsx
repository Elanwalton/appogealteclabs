
import { 
  Calendar,
  Clock,
  ExternalLink,
  Github,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Users,
  Target,
  Award,
  Code,
  Palette,
  Database,
  Smartphone,
  ChevronRight,
  Quote
} from 'lucide-react';
import Link from 'next/link';

// Interfaces for Type Safety
interface Client {
  name: string;
  industry: string;
  location: string;
  logo: string;
  website: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Phase {
  title: string;
  description: string;
  duration: string;
}

interface Solution {
  title: string;
  description: string;
  approach: Phase[];
  features: Feature[];
  images: string[];
}

interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  client: Client;
  category: string;
  tags: string[];
  duration: string;
  teamSize: number;
  completedDate: string;
  heroImage: string;
  overview: string;
  challenge: {
    title: string;
    description: string;
    problems: string[];
    image: string;
  };
  solution: Solution;
  techStack: {
    frontend: string[];
    backend: string[];
    infrastructure: string[];
    tools: string[];
  };
  results: {
    title: string;
    description: string;
    metrics: { value: string; label: string; description: string }[];
    outcomes: string[];
    image: string;
  };
  testimonial: {
    text: string;
    author: {
      name: string;
      position: string;
      company: string;
      avatar: string;
    };
    rating: number;
  };
  liveUrl: string;
  githubUrl: string | null;
  relatedProjects: {
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    tags: string[];
  }[];
}


// Mock Data Function
const getProjectDetails = (slug: string): Project => {
  // In a real app, verify slug matches content
  return {
    id: 1,
    title: "TechFlow Solutions - Custom ERP System",
    slug: "techflow-erp-system",
    tagline: "Transforming business operations with a comprehensive enterprise resource planning solution",
    client: {
      name: "TechFlow Solutions",
      industry: "Technology Services",
      location: "Nairobi, Kenya",
      logo: "/clients/techflow-logo.svg",
      website: "https://techflowsolutions.co.ke"
    },
    category: "Enterprise Software",
    tags: ["Django", "React", "PostgreSQL", "REST API", "Cloud Infrastructure"],
    duration: "6 months",
    teamSize: 5,
    completedDate: "2025-12-15",
    
    // Hero Section
    heroImage: "/projects/techflow-hero.jpg",
    
    // Project Overview
    overview: "TechFlow Solutions needed a complete digital transformation to streamline their internal operations. We developed a comprehensive ERP system that integrates inventory management, customer relationship management, financial tracking, and automated reporting into one unified platform.",
    
    // Challenge
    challenge: {
      title: "The Challenge",
      description: "TechFlow was struggling with disconnected systems, manual data entry, and lack of real-time visibility into their operations. Their existing infrastructure consisted of multiple standalone tools that didn't communicate with each other, leading to data inconsistencies and operational inefficiencies.",
      problems: [
        "Manual data entry across 5 different systems causing errors and delays",
        "No centralized dashboard for management oversight",
        "Inventory tracking done through spreadsheets leading to stock discrepancies",
        "Customer data scattered across multiple platforms",
        "Financial reporting taking up to 2 weeks to compile",
        "No mobile access for field teams",
        "Scalability issues with growing business needs"
      ],
      image: "/projects/techflow-challenge.jpg"
    },
    
    // Solution
    solution: {
      title: "Our Solution",
      description: "We designed and developed a custom cloud-based ERP system tailored to TechFlow's specific needs, providing a unified platform that automates workflows, centralizes data, and provides real-time insights.",
      approach: [
        {
          title: "Discovery & Planning",
          description: "Conducted extensive workshops with stakeholders to understand workflows, pain points, and requirements. Created detailed user personas and mapped out the entire business process.",
          duration: "3 weeks"
        },
        {
          title: "System Architecture Design",
          description: "Designed a scalable microservices architecture using Django REST Framework for the backend, React for the frontend, and PostgreSQL for data management. Implemented Redis for caching and Celery for background tasks.",
          duration: "2 weeks"
        },
        {
          title: "Agile Development",
          description: "Developed the system in 2-week sprints with continuous client feedback. Prioritized core features first: inventory management, CRM, and financial modules, then expanded to advanced analytics and automation.",
          duration: "16 weeks"
        },
        {
          title: "Testing & Quality Assurance",
          description: "Comprehensive testing including unit tests, integration tests, and user acceptance testing. Performed load testing to ensure the system could handle peak usage.",
          duration: "3 weeks"
        },
        {
          title: "Training & Deployment",
          description: "Provided comprehensive training for all user levels, created detailed documentation, and executed a phased rollout to minimize disruption. Offered 24/7 support during the transition period.",
          duration: "2 weeks"
        }
      ],
      features: [
        {
          icon: <Database />,
          title: "Inventory Management",
          description: "Real-time tracking of stock levels, automated reorder points, barcode scanning, and multi-warehouse support"
        },
        {
          icon: <Users />,
          title: "CRM System",
          description: "Complete customer lifecycle management, sales pipeline tracking, automated follow-ups, and customer portal"
        },
        {
          icon: <TrendingUp />,
          title: "Financial Module",
          description: "Automated invoicing, expense tracking, financial reporting, and integration with accounting software"
        },
        {
          icon: <Target />,
          title: "Analytics Dashboard",
          description: "Real-time KPI tracking, customizable reports, predictive analytics, and data visualization"
        },
        {
          icon: <Smartphone />,
          title: "Mobile Access",
          description: "Responsive design with dedicated mobile app for field teams to access and update data on the go"
        },
        {
          icon: <Code />,
          title: "API Integration",
          description: "RESTful APIs for third-party integrations and future extensibility"
        }
      ],
      images: [
        "/projects/techflow-dashboard.jpg",
        "/projects/techflow-inventory.jpg",
        "/projects/techflow-crm.jpg",
        "/projects/techflow-analytics.jpg"
      ]
    },
    
    // Tech Stack
    techStack: {
      frontend: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Chart.js"],
      backend: ["Django 4.2", "Django REST Framework", "Celery", "Redis", "PostgreSQL"],
      infrastructure: ["AWS EC2", "AWS S3", "AWS RDS", "Nginx", "Docker", "GitHub Actions"],
      tools: ["Figma", "Postman", "Jira", "Slack", "Git"]
    },
    
    // Results
    results: {
      title: "The Results",
      description: "The implementation of the custom ERP system transformed TechFlow's operations, delivering measurable improvements across all key metrics within the first three months of deployment.",
      metrics: [
        {
          value: "87%",
          label: "Reduction in Manual Data Entry",
          description: "Automation eliminated most manual processes"
        },
        {
          value: "2 hrs",
          label: "Real-time Reporting",
          description: "Down from 2 weeks for financial reports"
        },
        {
          value: "99.5%",
          label: "Inventory Accuracy",
          description: "Up from 78% with spreadsheet system"
        },
        {
          value: "3x",
          label: "Faster Order Processing",
          description: "Streamlined workflows and automation"
        },
        {
          value: "45%",
          label: "Increase in Productivity",
          description: "Teams spending more time on value-added tasks"
        },
        {
          value: "$180K",
          label: "Annual Cost Savings",
          description: "Through efficiency gains and reduced errors"
        }
      ],
      outcomes: [
        "Complete visibility into operations with real-time dashboards",
        "Seamless data flow between all departments",
        "Mobile access enabling remote work and field operations",
        "Automated workflows reducing processing time by 70%",
        "Scalable infrastructure supporting 300% business growth",
        "Enhanced customer satisfaction with faster response times"
      ],
      image: "/projects/techflow-results.jpg"
    },
    
    // Client Testimonial
    testimonial: {
      text: "Appogealtechlabs transformed our business. The ERP system they built exceeded our expectations in every way. We've seen dramatic improvements in efficiency, accuracy, and employee satisfaction. The team was professional, responsive, and truly understood our needs. This investment has already paid for itself multiple times over.",
      author: {
        name: "David Kimani",
        position: "CEO",
        company: "TechFlow Solutions",
        avatar: "/testimonials/david-kimani.jpg"
      },
      rating: 5
    },
    
    // Live Demo & Links
    liveUrl: "https://erp.techflowsolutions.co.ke",
    githubUrl: null, // Private project
    
    // Related Projects
    relatedProjects: [
      {
        id: 2,
        title: "Bloom Fashion - E-commerce Platform",
        slug: "bloom-fashion-ecommerce",
        image: "/projects/bloom-thumb.jpg",
        category: "E-commerce",
        tags: ["Next.js", "Stripe", "MongoDB"]
      },
      {
        id: 3,
        title: "FinEdge - Financial Dashboard",
        slug: "finedge-financial-dashboard",
        image: "/projects/finedge-thumb.jpg",
        category: "FinTech",
        tags: ["React", "D3.js", "Django"]
      },
      {
        id: 4,
        title: "Cargo Express - Logistics Platform",
        slug: "cargo-express-logistics",
        image: "/projects/cargo-thumb.jpg",
        category: "Logistics",
        tags: ["React Native", "Node.js", "PostgreSQL"]
      }
    ]
  };
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectDetails(slug);
  
  return (
    <div className="project-detail-page">
      
      {/* Hero Section */}
      <section className="project-hero">
        <div className="project-hero-overlay"></div>
        <div 
          className="project-hero-bg"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        ></div>
        <div className="project-hero-container">
          
          {/* Back Button */}
          <Link href="/projects" className="back-button">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
          
          {/* Hero Content */}
          <div className="project-hero-content">
            <div className="project-client-logo">
              <img src={project.client.logo} alt={project.client.name} />
            </div>
            <span className="project-category-badge">{project.category}</span>
            <h1 className="project-hero-title">{project.title}</h1>
            <p className="project-tagline">{project.tagline}</p>
            
            {/* Project Meta */}
            <div className="project-meta">
              <div className="meta-item">
                <Calendar size={18} />
                <span>Completed: {new Date(project.completedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>Duration: {project.duration}</span>
              </div>
              <div className="meta-item">
                <Users size={18} />
                <span>Team: {project.teamSize} members</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="project-actions">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
                  <ExternalLink size={20} />
                  View Live Site
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                  <Github size={20} />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Overview */}
      <section className="project-overview-section">
        <div className="project-container">
          <div className="section-header">
            <h2 className="section-title">Project Overview</h2>
          </div>
          <div className="overview-content">
            <p className="overview-text">{project.overview}</p>
            
            {/* Client Info */}
            <div className="client-info-card">
              <h3 className="client-info-title">Client Information</h3>
              <div className="client-info-grid">
                <div className="client-info-item">
                  <span className="info-label">Client</span>
                  <span className="info-value">{project.client.name}</span>
                </div>
                <div className="client-info-item">
                  <span className="info-label">Industry</span>
                  <span className="info-value">{project.client.industry}</span>
                </div>
                <div className="client-info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{project.client.location}</span>
                </div>
                <div className="client-info-item">
                  <span className="info-label">Website</span>
                  <a href={project.client.website} target="_blank" rel="noopener noreferrer" className="info-link">
                    Visit Website
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Challenge */}
      <section className="challenge-section">
        <div className="project-container">
          <div className="challenge-layout">
            <div className="challenge-content">
              <span className="section-label">The Challenge</span>
              <h2 className="section-title">{project.challenge.title}</h2>
              <p className="challenge-description">{project.challenge.description}</p>
              
              <div className="problems-list">
                <h3 className="problems-title">Key Problems We Addressed:</h3>
                <ul className="problems-items">
                  {project.challenge.problems.map((problem, index) => (
                    <li key={index} className="problem-item">
                      <div className="problem-icon">
                        <ChevronRight size={20} />
                      </div>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="challenge-image">
              <img src={project.challenge.image} alt="Challenge visualization" />
            </div>
          </div>
        </div>
      </section>
      
      {/* The Solution */}
      <section className="solution-section">
        <div className="project-container">
          <div className="section-header">
            <span className="section-label">Our Solution</span>
            <h2 className="section-title">{project.solution.title}</h2>
            <p className="section-description">{project.solution.description}</p>
          </div>
          
          {/* Development Approach */}
          <div className="approach-timeline">
            <h3 className="approach-title">Development Approach</h3>
            <div className="timeline">
              {project.solution.approach.map((phase, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="timeline-number">{index + 1}</div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="timeline-phase-title">{phase.title}</h4>
                      <span className="timeline-duration">{phase.duration}</span>
                    </div>
                    <p className="timeline-phase-description">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="features-section">
            <h3 className="features-title">Key Features Delivered</h3>
            <div className="features-grid">
              {project.solution.features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Solution Screenshots */}
          <div className="screenshots-section">
            <h3 className="screenshots-title">Screenshots</h3>
            <div className="screenshots-grid">
              {project.solution.images.map((image, index) => (
                <div key={index} className="screenshot-item">
                  <img src={image} alt={`Screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="tech-stack-section">
        <div className="project-container">
          <div className="section-header">
            <span className="section-label">Technology</span>
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-description">
              We carefully selected modern, robust technologies to ensure scalability, 
              performance, and maintainability.
            </p>
          </div>
          
          <div className="tech-stack-grid">
            <div className="tech-stack-category">
              <div className="tech-category-header">
                <Palette size={24} />
                <h3>Frontend</h3>
              </div>
              <div className="tech-tags">
                {project.techStack.frontend.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="tech-stack-category">
              <div className="tech-category-header">
                <Code size={24} />
                <h3>Backend</h3>
              </div>
              <div className="tech-tags">
                {project.techStack.backend.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="tech-stack-category">
              <div className="tech-category-header">
                <Database size={24} />
                <h3>Infrastructure</h3>
              </div>
              <div className="tech-tags">
                {project.techStack.infrastructure.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="tech-stack-category">
              <div className="tech-category-header">
                <Award size={24} />
                <h3>Tools</h3>
              </div>
              <div className="tech-tags">
                {project.techStack.tools.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="results-section">
        <div className="project-container">
          <div className="section-header">
            <span className="section-label">Impact</span>
            <h2 className="section-title">{project.results.title}</h2>
            <p className="section-description">{project.results.description}</p>
          </div>
          
          {/* Metrics Grid */}
          <div className="metrics-grid">
            {project.results.metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <div className="metric-description">{metric.description}</div>
              </div>
            ))}
          </div>
          
          {/* Outcomes */}
          <div className="outcomes-section">
            <div className="outcomes-content">
              <h3 className="outcomes-title">Business Outcomes</h3>
              <ul className="outcomes-list">
                {project.results.outcomes.map((outcome, index) => (
                  <li key={index} className="outcome-item">
                    <CheckCircle size={24} />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="outcomes-image">
              <img src={project.results.image} alt="Results" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Client Testimonial */}
      <section className="testimonial-section">
        <div className="project-container">
          <div className="testimonial-card">
            <Quote className="quote-icon" />
            <div className="testimonial-rating">
              {[...Array(project.testimonial.rating)].map((_, index) => (
                <Award key={index} className="star-icon" />
              ))}
            </div>
            <blockquote className="testimonial-text">
              &quot;{project.testimonial.text}&quot;
            </blockquote>
            <div className="testimonial-author">
              <img 
                src={project.testimonial.author.avatar} 
                alt={project.testimonial.author.name}
                className="testimonial-avatar"
              />
              <div className="testimonial-author-info">
                <div className="testimonial-author-name">
                  {project.testimonial.author.name}
                </div>
                <div className="testimonial-author-position">
                  {project.testimonial.author.position}, {project.testimonial.author.company}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Projects */}
      <section className="related-projects-section">
        <div className="project-container">
          <div className="section-header">
            <h2 className="section-title">More Projects</h2>
            <p className="section-description">
              Explore other successful projects we&apos;ve delivered
            </p>
          </div>
          
          <div className="related-projects-grid">
            {project.relatedProjects.map((relatedProject) => (
              <Link 
                key={relatedProject.id}
                href={`/projects/${relatedProject.slug}`}
                className="related-project-card"
              >
                <div className="related-project-image">
                  <img src={relatedProject.image} alt={relatedProject.title} />
                  <div className="related-project-overlay">
                    <span className="overlay-text">View Project</span>
                  </div>
                </div>
                <div className="related-project-content">
                  <span className="related-project-category">{relatedProject.category}</span>
                  <h3 className="related-project-title">{relatedProject.title}</h3>
                  <div className="related-project-tags">
                    {relatedProject.tags.map((tag, index) => (
                      <span key={index} className="related-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="project-cta-section">
        <div className="project-container">
          <div className="project-cta-content">
            <h2 className="cta-title">Ready to Transform Your Business?</h2>
            <p className="cta-description">
              Let&apos;s discuss how we can help you achieve similar results with a 
              custom solution tailored to your needs.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn-primary btn-lg">
                Start Your Project
              </Link>
              <Link href="/projects" className="btn-secondary btn-lg">
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

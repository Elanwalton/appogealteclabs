'use client';

import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Heart,
  Zap,
  Shield,
  Coffee,
  Code,
  Palette,
  Database,
  Smartphone,
  Mail,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "David Omondi",
    role: "Founder & CEO",
    bio: "Full-stack developer with 8+ years of experience building scalable web applications. Passionate about creating solutions that make a difference.",
    image: "/team/david-omondi.jpg",
    skills: ["Leadership", "Full Stack", "Strategy"],
    social: {
      linkedin: "https://linkedin.com/in/davidomondi",
      twitter: "https://twitter.com/davidomondi",
      github: "https://github.com/davidomondi"
    }
  },
  {
    id: 2,
    name: "Sarah Njeri",
    role: "Lead UI/UX Designer",
    bio: "Award-winning designer specializing in creating intuitive and beautiful user experiences that users love.",
    image: "/team/sarah-njeri.jpg",
    skills: ["UI/UX Design", "Figma", "User Research"],
    social: {
      linkedin: "https://linkedin.com/in/sarahnjeri",
      twitter: "https://twitter.com/sarahnjeri"
    }
  },
  {
    id: 3,
    name: "Michael Kamau",
    role: "Senior Backend Developer",
    bio: "Backend specialist with expertise in building robust APIs and optimizing database performance for high-traffic applications.",
    image: "/team/michael-kamau.jpg",
    skills: ["Django", "PostgreSQL", "API Design"],
    social: {
      linkedin: "https://linkedin.com/in/michaelkamau",
      github: "https://github.com/michaelkamau"
    }
  },
  {
    id: 4,
    name: "Grace Wangari",
    role: "Frontend Developer",
    bio: "React enthusiast focused on building fast, accessible, and delightful user interfaces with modern web technologies.",
    image: "/team/grace-wangari.jpg",
    skills: ["React", "Next.js", "TypeScript"],
    social: {
      linkedin: "https://linkedin.com/in/gracewangari",
      github: "https://github.com/gracewangari"
    }
  },
  {
    id: 5,
    name: "James Mwangi",
    role: "Mobile Developer",
    bio: "Cross-platform mobile developer creating seamless experiences for iOS and Android applications.",
    image: "/team/james-mwangi.jpg",
    skills: ["React Native", "Flutter", "Mobile UX"],
    social: {
      linkedin: "https://linkedin.com/in/jamesmwangi",
      github: "https://github.com/jamesmwangi"
    }
  },
  {
    id: 6,
    name: "Linda Akinyi",
    role: "Project Manager",
    bio: "Experienced project manager ensuring smooth delivery and client satisfaction on every project.",
    image: "/team/linda-akinyi.jpg",
    skills: ["Agile", "Client Relations", "Delivery"],
    social: {
      linkedin: "https://linkedin.com/in/lindaakinyi",
      twitter: "https://twitter.com/lindaakinyi"
    }
  }
];

const values = [
  {
    icon: <Zap />,
    title: "Innovation First",
    description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions."
  },
  {
    icon: <Heart />,
    title: "Client-Centric",
    description: "Your success is our success. We prioritize understanding and exceeding client expectations."
  },
  {
    icon: <Shield />,
    title: "Quality Assurance",
    description: "We maintain the highest standards of code quality, security, and performance in every project."
  },
  {
    icon: <Users />,
    title: "Collaborative Spirit",
    description: "We believe in the power of teamwork and maintain transparent communication throughout projects."
  }
];

const milestones = [
  { year: "2021", title: "Company Founded", description: "Started with a vision to transform businesses through technology" },
  { year: "2022", title: "First Enterprise Client", description: "Secured our first major enterprise contract" },
  { year: "2023", title: "Team Expansion", description: "Grew to a team of 10+ talented professionals" },
  { year: "2024", title: "50+ Projects", description: "Successfully delivered 50+ projects across various industries" },
  { year: "2025", title: "Industry Recognition", description: "Awarded 'Best Tech Startup' by Kenya Tech Awards" },
  { year: "2026", title: "Regional Expansion", description: "Expanding services across East Africa" }
];

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "6", label: "Team Members" },
  { number: "5+", label: "Years Experience" }
];

export default function AboutUsPage() {
  return (
    <div className="about-page">
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <span className="section-label">About Us</span>
          <h1 className="about-hero-title">
            Building Digital Excellence,<br />
            <span className="text-gradient">One Project at a Time</span>
          </h1>
          <p className="about-hero-description">
            We're a team of passionate developers, designers, and strategists 
            dedicated to transforming ideas into powerful digital solutions that 
            drive business growth and create lasting impact.
          </p>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-card">
            <div className="card-icon">
              <Target />
            </div>
            <h2 className="card-title">Our Mission</h2>
            <p className="card-text">
              To empower businesses across Africa with innovative, scalable, 
              and user-centric digital solutions that drive growth, enhance 
              efficiency, and create meaningful impact in their industries.
            </p>
          </div>
          <div className="vision-card">
            <div className="card-icon">
              <TrendingUp />
            </div>
            <h2 className="card-title">Our Vision</h2>
            <p className="card-text">
              To become the leading technology partner in East Africa, known 
              for exceptional quality, innovation, and transformative digital 
              solutions that shape the future of business.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What Drives Us</h2>
            <p className="section-description">
              Our core values guide every decision we make and every project we deliver.
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="section-header">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Meet the Experts</h2>
            <p className="section-description">
              A diverse team of talented individuals passionate about creating 
              exceptional digital experiences.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-card-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    <div className="team-social">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter />
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                          <Github />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="team-card-content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-skills">
                    {member.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-container">
          <div className="section-header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Milestones & Achievements</h2>
            <p className="section-description">
              From humble beginnings to industry recognition, here's our story.
            </p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Work With Us?</h2>
            <p className="cta-description">
              Let's collaborate to turn your vision into reality. Get in touch 
              with our team today.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary btn-lg">
                Get Started
              </a>
              <a href="/projects" className="btn-secondary btn-lg">
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

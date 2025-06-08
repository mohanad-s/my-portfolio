import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, X, FileText, Eye } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);
  const [typedName, setTypedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showResume, setShowResume] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

const [emailCopied, setEmailCopied] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const whatIDoRef = useRef(null);
  const resumeRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const roles = ['Computer Scientist', 'ML Specialist', 'Business Intelligence Specialist'];
  const fullName = 'Mohanad Al Dakheel';

  // Typing animation for name with proper cursor
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullName.length) {
        setTypedName(fullName.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        // Blink cursor for a bit then stop
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // Role rotation with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Scroll handler and intersection observer
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = [aboutRef, whatIDoRef, resumeRef, projectsRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! I will get back to you soon.');
    setShowContactForm(false);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };
const copyEmailToClipboard = async () => {
  try {
    await navigator.clipboard.writeText('mohanadaldakheelbusiness@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy email: ', err);
  }
};

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate profile pic position and size based on scroll - FIXED for seamless transition
  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const profileScale = Math.max(0.3, 1 - scrollY / 600); // Changed from 0.15 to 0.3 for better visibility
  const profileX = Math.min(scrollY / 6, 45); // Adjusted for smoother movement
  const profileY = Math.min(scrollY / 8, 45); // Adjusted for smoother movement
  
  // Header profile should only appear when main profile is small enough - FIXED
  const showHeaderProfile = scrollY > 500; // Only show when main profile is significantly scaled down

  // Fixed orbiting animation - proper circular rotation
  const OrbitingDots = ({ radius = 160 }) => (
    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/60 rounded-full blur-sm"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={contactForm.name}
                    onChange={handleContactInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 hover:transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

{/* Resume Modal */}
{showResume && (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <div className="bg-gray-800 rounded-xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">My Resume</h2>
        <div className="flex items-center space-x-3">
          <a
            href="/Mohanad_Aldakheel_.pdf"
            download
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download PDF
          </a>
          <button
            onClick={() => setShowResume(false)}
            className="bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="h-[calc(95vh-80px)]">
        <iframe
          src="/Mohanad_Aldakheel_.pdf"
          className="w-full h-full border-0"
          title="Mohanad Al Dakheel Resume"
        />
      </div>
    </div>
  </div>
)}

      {/* Dynamic Header - FIXED profile appearance timing */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Profile Picture - only shows when main one is scaled down significantly */}
          <div 
            className="flex items-center space-x-3 transition-all duration-500"
            style={{
              transform: showHeaderProfile ? 'scale(1)' : 'scale(0)',
              opacity: showHeaderProfile ? 1 : 0
            }}
          >
            <img 
              src="/Portrait (1).png" 
              alt="Mohanad Al Dakheel" 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
            />
            <span className="font-semibold text-white">Mohanad Al Dakheel</span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex space-x-8">
            {[
              { label: 'Home', ref: heroRef },
              { label: 'About', ref: aboutRef },
              { label: 'What I Do', ref: whatIDoRef },
              { label: 'Resume', ref: resumeRef },
              { label: 'Projects', ref: projectsRef },
              { label: 'Contact', ref: contactRef },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        
        {/* Profile Picture with Fixed Orbiting Animation and Seamless Transition */}
        <div
          className="relative z-10 transition-all duration-300 ease-out"
          style={{
            transform: scrollY > 400 ? `translate(-${profileX}vw, -${profileY}vh) scale(${profileScale})` : 'translate(0, 0) scale(1)',
            opacity: scrollY > 700 ? 0 : heroOpacity, // Only fade when very far scrolled
          }}
        >
          <div className="relative w-64 h-64">
            <OrbitingDots />
            <img 
              src="/Portrait (1).png" 
              alt="Mohanad Al Dakheel" 
              className="relative z-10 w-full h-full rounded-full object-cover border-4 border-blue-400/30 shadow-2xl"
            />
          </div>
        </div>

{/* Enhanced Name and Title */}
<div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 text-center z-20">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
    {typedName}
    {showCursor && <span className="text-blue-400">_</span>}
  </h1>
  <div className="text-xl md:text-2xl text-gray-300 h-9 flex items-center justify-center">
    <div className="overflow-hidden">
      <span
        key={currentRole}
        className="block animate-pulse"
      >
        {roles[currentRole]}
      </span>
    </div>
  </div>
</div>


      </section>

      {/* About Section */}
      <section 
        ref={aboutRef} 
        id="about" 
        className={`py-20 transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
            <p className="text-gray-300">
              I'm a passionate Computer Scientist specializing in Machine Learning and Business Intelligence. 
              With a strong foundation in data science and software development, I transform complex data into 
              actionable insights and build intelligent systems that solve real-world problems.
            </p>
            <p className="text-gray-300">
              Currently working at Procter & Gamble as an IT & Digital Transformation Intern, I'm dedicated to 
              bridging the gap between cutting-edge AI research and practical business applications. My experience 
              spans from autonomous underwater vehicles to federated learning systems, always with a focus on 
              innovation and impact.
            </p>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section 
        ref={whatIDoRef} 
        id="whatido" 
        className={`py-20 bg-gray-800/50 transition-all duration-1000 ${visibleSections.has('whatido') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            What I Do?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Science and Machine Learning',
                desc: 'Extracting insights from complex datasets using statistical analysis and visualization, as well as building intelligent systems with neural networks, deep learning, and AI algorithms.',
                icon: '/DataAnalysis.svg'
              },
              {
                title: 'Web/Software Development',
                desc: 'Creating scalable applications using development frameworks, providing an environment that makes AI solutions usable',
                icon: '/WebDev.svg'
              },
              {
                title: 'Tutoring',
                desc: 'Experience in tutoring students on a variety of topics in machine learning and robotics, exam preparations, mentoring, and evaluating students.',
                icon: '/Tutoring.svg'
              }
            ].map((service, i) => (
              <div key={i} className="bg-gray-900/50 p-8 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <img src={service.icon} alt={service.title} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section 
        ref={resumeRef} 
        id="resume" 
        className={`py-20 transition-all duration-1000 ${visibleSections.has('resume') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Resume
          </h2>
          
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-blue-400">Experience</h3>
              <div className="space-y-8">
                {[
                  {
                    title: 'IT & Digital Transformation Intern',
                    company: 'Procter & Gamble',
                    period: 'May 2025 - Present',
                    desc: ' • Developing real-time automated interactive business analytics Power BI dashboards, as well as transforming all the data to medallion architecture. \n • Frequently receiving on-the-job training on corporate functions and departments, including Supply Network Operations, Finance & Marketing, Sales, Brand Management, IT & Business Intelligence.'
                  },
                  {
                    title: 'Robotics Unit Executive',
                    company: 'Drones and Robotics Aziz Group',
                    period: 'Sep 2023 - May 2025',
                    desc: '• Worked with AquaDRAG team as a computer vision specialist, and participated at Singapore\'s Autonomous Underwater Vehicle Challenge (SAUVC), achieving top 25 globally and being the first middle eastern team to ever participate. \n • Achieved 2nd Place at Engineeringthon Sustainability challenge, sponsored by Saudia Group and KAU.'
                  },
                  {
                    title: 'Teaching Assistant',
                    company: 'King Abdullah University of Science and Technology',
                    period: 'Jan 2025 - Jan 2025',
                    desc: '• Gave hands-on sessions at the "Introduction to Artificial Intelligence" course by KAUST Academy, including Linear Regression, Logistic Regression and Neural Networks. \n • Contributed in students examination process and graded the practical exam submissions.'
                  },
                  {
                    title: 'Artificial Intelligence Intern',
                    company: 'King Abdullah University of Science and Technology',
                    period: 'June 2024 - June 2024',
                    desc: '• Received intensive workshops and hands-on sessions from world-class professors on advanced AI topics, including Advanced Computer Vision, Generative Adversarial Networks, Reinforcement Learning, and Natural Language Processing. \n • Built a RAG-based project that was recognized as one of the top 15 projects across all KAUST Academy Programs.'
                  }
                ].map((job, i) => (
                  <div key={i} className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-xl font-semibold text-white">{job.title}</h4>
                    <p className="text-blue-400 mb-3">{job.company} • {job.period}</p>
                    <div className="text-gray-300 whitespace-pre-line leading-relaxed">{job.desc.split('\n').map((line, lineIndex) => (
                      <div key={lineIndex}>
                        {line}
                        {lineIndex < job.desc.split('\n').length - 1 && <br/>}
                      </div>
                    ))}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-blue-400">Education</h3>
              <div className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-purple-500">
                <h4 className="text-xl font-semibold text-white">Bachelor's in Computer Science</h4>
                <p className="text-purple-400">King Abdulaziz University • 2021 - 2025</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-blue-400">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['Python', 'Java','C++','JavaScript','MATLAB','PHP','TensorFlow', 'React', 'SQL', 'Visual Basic', 'Django', 'Git', 'Flask','Jupyter'].map((skill, i) => (
                  <span 
                    key={i} 
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-medium hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* View Resume Button */}
            <div className="text-center pt-8">
              <button 
                onClick={() => setShowResume(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 shadow-lg flex items-center mx-auto"
              >
                <Eye className="w-5 h-5 mr-2" />
                View My Resume
              </button>
            </div>
          </div>
        </div>
      </section>

{/* Projects Section  */}
      <section 
        ref={projectsRef} 
        id="projects" 
        className={`py-20 bg-gray-800/50 transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" style={{ lineHeight: '1.2' }}>
            Projects
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: 'Federated Learning in Acute Lymphoblastic Leukemia: Advancing Diagnosis with Limited Data',
                desc: 'This project uses federated learning to solve the problem of multi-class classification with highly skewed hospital data — providing a decentralized approach for hospitals to train a shared model without sharing patient data, and reducing the bias seen in single-hospital models.',
                tech: 'Python, PyTorch, Matplotlib, Seaborn, Scikit-Learn, KaggleHub, React.js, FastAPI, MongoDB, Railway',
                image: '/FLALL.svg',
                buttonText: 'Private Repository - Available Upon Request',
                isPrivate: true
              },
              {
                title: 'ArabicNLP: Generating Multiple-Choice Questions from Saudi Schoolbooks',
                desc: 'Arabic, a morphologically rich and complex language, presents unique challenges for natural language processing (NLP). Educational resources, particularly in the context of Saudi schoolbooks, offer a valuable yet untapped domain for the application of NLP techniques. This project tackles the power of NLP to automatically generate multiple-choice questions from Arabic texts in Saudi schoolbooks by employing Large Language models and Retrieval Augmented Generation.',
                tech: 'Python, ChatGPT 4.o mini API, ArabicOCR, YOLOv8, Matplotlib',
                image: '/nlpar.svg',
                buttonText: 'Private Repository - Available Upon Request',
                isPrivate: true
              },
              {
                title: 'EcoViation (Under Development)',
                desc: 'An innovative AI-powered waste tracking system for the aviation industry that addresses food waste challenges. By combining computer vision technology with dashboard monitoring and customer surveying, EcoViation enables airlines to understand waste patterns, optimize meal loading, and make environmentally conscious decisions. This project won second place at Engineeringthon, KAU.',
                tech: 'Python, Computer Vision, AI/ML, Dashboard Development, Data Analytics',
                image: '/Ecoviation_porto.png',
                buttonText: 'Under Development',
                isUnderDevelopment: true
              },
              {
                title: 'URBN-ART',
                desc: 'URBN ART is a concept-shop dedicated to serve graffiti artists, they sell all sorts of graffiti supplements, and they connect artists together through workshops or giving them exposure in their official website. I initialized this idea and built a full-Stack website using only HTML, CSS, and PHP, without the use of any framework as a challenge for myself since it was the first full web development project I worked on.',
                tech: 'HTML, CSS, JavaScript, PHP, Railway',
                image: '/urbn.svg',
                buttonText: 'View Project',
                link: 'https://github.com/mohanad-s/URBN-ART'
              },
              {
                title: 'The "CrimeScene" Sumo-Robot',
                desc: 'The CrimeScene is an autonomous sumo robot vehicle which was built for the sumo-robot contest at KAU Robocon, the robot comes in brass material, custom silicon wheels, and a hardware consisting of Arduino-Leonardo, Ultrasonic sensors, Infrared sensors and two DC motors. the robot was programmed to stay in the field while trying to take out the enemy out of the field, it my first robotics project and my team and I managed to reach the finals.',
                tech: 'Fusion 360, Arduino',
                image: '/crime.svg',
                buttonText: 'View Project',
                link: 'https://github.com/mohanad-s/SumoBot'
              },
              {
                title: 'Extended Modified National Institute of Standards and Technology(EMNIST) Classifier',
                desc: 'Extended Modified National Institute of Standards and Technology, or simply EMNIST is a widely known dataset of images illustrating handwritten numbers from 0-9, handwritten English alphabet(both uppercase and lower case) I built a multi-class classifier for this dataset and used neural networks, achieving 90% accuracy.',
                tech: 'Python, PyTorch, Keras, NumPy, Matplotlib',
                image: '/EMNIST.svg',
                buttonText: 'Private Repository - Available Upon Request',
                isPrivate: true
              }
            ].map((project, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                      e.target.parentNode.innerHTML = `<div class="text-4xl">📊</div><p class="ml-2 text-gray-400">Project Image</p>`;
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.desc}</p>
                  <p className="text-sm text-purple-400 mb-4 font-medium">{project.tech}</p>
                  
                  {project.isPrivate ? (
                    <button className="text-gray-400 cursor-default flex items-center font-medium">
                      {project.buttonText}
                    </button>
                  ) : project.isUnderDevelopment ? (
                    <button className="text-yellow-400 cursor-default flex items-center font-medium">
                      {project.buttonText}
                    </button>
                  ) : (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center font-medium"
                    >
                      {project.buttonText} <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Contact Section*/}      
<section 
  ref={contactRef} 
  id="contact" 
  className={`py-20 transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
>
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Contact Me
    </h2>
    
    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
      Ready to collaborate on your next project? Let's build something amazing together.
    </p>
    
    <div className="flex justify-center space-x-8 mb-12">
      {/* Email Container - Now Copyable */}
      <div 
        onClick={copyEmailToClipboard}
        className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-110 flex flex-col items-center space-y-2 cursor-pointer relative group"
      >
        <div className="text-blue-400">
          <Mail className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-gray-300">
          Email
        </span>
        <span className="text-xs text-blue-400 font-mono">
          mohanadaldakheelbusiness@gmail.com
        </span>
        
        {/* Copy feedback */}
        {emailCopied && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
            Copied!
          </div>
        )}
        
        {/* Hover tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Click to copy
        </div>
      </div>

      {/* GitHub and LinkedIn - Keep as is */}
      {[
        { icon: <Github className="w-6 h-6" />, label: 'GitHub', href: 'https://github.com/mohanad-s' },
        { icon: <Linkedin className="w-6 h-6" />, label: 'LinkedIn', href: 'https://linkedin.com/in/mohanad-aldakheel' }
      ].map((contact, i) => (
        <a 
          key={i}
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-110 flex flex-col items-center space-y-2"
        >
          <div className="text-blue-400">
            {contact.icon}
          </div>
          <span className="text-sm font-medium text-gray-300">
            {contact.label}
          </span>
        </a>
      ))}
    </div>
  </div>
</section>

      {/* Footer - ADDED as requested */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 <span className="text-blue-400 font-semibold">Mohanad Al Dakheel</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
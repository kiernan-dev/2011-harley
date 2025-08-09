import React, { useState, useEffect } from 'react';


const App: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const images = [
    { src: '/images/glide/IMG_4058.webp', alt: '2011 Harley-Davidson Road Glide Custom - Front Quarter View' },
    { src: '/images/glide/IMG_4059.webp', alt: '2011 Harley-Davidson Road Glide Custom - Left Side Profile' },
    { src: '/images/glide/IMG_4060.webp', alt: '2011 Harley-Davidson Road Glide Custom - Right Side Angle' },
    { src: '/images/glide/IMG_4061.webp', alt: '2011 Harley-Davidson Road Glide Custom - Front Three-Quarter' },
    { src: '/images/glide/IMG_4063.webp', alt: '2011 Harley-Davidson Road Glide Custom - Full Right Profile' },
    { src: '/images/glide/IMG_4064.webp', alt: '2011 Harley-Davidson Road Glide Custom - Complete Side View' },
    { src: '/images/glide/IMG_4065.webp', alt: '2011 Harley-Davidson Road Glide Custom - Alternative Angle' },
    { src: '/images/glide/IMG_4066.webp', alt: '2011 Harley-Davidson Road Glide Custom - Different Perspective' },
    { src: '/images/glide/IMG_4069.webp', alt: '2011 Harley-Davidson Road Glide Custom - Another View' },
    { src: '/images/glide/IMG_4067.webp', alt: '2011 Harley-Davidson Road Glide Custom - Rear Quarter View' },
    { src: '/images/glide/IMG_4062.webp', alt: '2011 Harley-Davidson Road Glide Custom - Overall Shot' }
  ];

  const handleContactSubmit = () => {
    // Netlify will handle the form submission automatically
    // Just close the modal after a brief delay to show success
    setTimeout(() => {
      setShowContactModal(false);
    }, 1000);
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    scrollToSection('gallery');
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        // Change when 90% of hero section is scrolled past
        setIsHeroVisible(scrollPosition < heroHeight * 0.9);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      {/* Mobile-friendly Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-950/95 backdrop-blur-md border-b border-red-500/20 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo/Brand */}
            <button 
              onClick={scrollToTop}
              className="flex items-center hover:opacity-80 transition-opacity duration-300"
            >
              <div className="flex flex-col">
                <span className="text-red-500 font-black text-2xl leading-tight">Road Glide</span>
                <span className="text-gray-400 text-xs font-medium leading-tight tracking-wider">CUSTOM</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'gallery', label: 'Gallery' },
                { id: 'features', label: 'Features' },
                { id: 'important-note', label: 'Disclosure' },
                { id: 'contact', label: 'Contact' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className={item.id === 'important-note' 
                    ? "px-4 py-2 bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 font-bold transition-all duration-300 hover:bg-yellow-500/30 rounded-xl border-2 border-yellow-500/50 hover:border-yellow-400/70"
                    : "px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/30"
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <select 
                onChange={(e) => e.target.value && scrollToSection(e.target.value)}
                className="bg-gray-800/80 backdrop-blur-sm text-gray-300 border border-red-500/30 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                defaultValue=""
              >
                <option value="" disabled>Navigate</option>
                <option value="gallery">Gallery</option>
                <option value="features">Features</option>
                <option value="important-note">Disclosure</option>
                <option value="contact">Contact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subtle bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-950 via-gray-900 to-red-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.08),transparent_50%)]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-red-950/50 rounded-full border border-red-500/30">
                  <span className="text-red-400 font-semibold text-sm">CUSTOM BUILD</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                  2011 Harley
                  <br />
                  <span className="text-red-500">Road Glide</span>
                  <br />
                  <span className="text-gray-300 text-3xl lg:text-4xl font-light">Custom</span>
                </h1>
              </div>
              
              {/* Mobile Image - Show only on mobile, directly after title */}
              <div className="lg:hidden relative mb-8">
                <div className="relative aspect-square">
                  {/* Circle Mask */}
                  <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
                    <img
                      src={images[0]?.src}
                      alt="2011 Harley-Davidson Road Glide Custom"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="absolute top-1/3 left-4 w-1 h-8 bg-gradient-to-b from-red-500 to-transparent"></div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/20 rounded-full pointer-events-none"></div>
                </div>
                
                {/* Enhanced glow effects */}
                <div className="absolute -inset-8 bg-gradient-to-tr from-red-500/15 via-red-600/5 to-transparent blur-2xl rounded-full"></div>
                <div className="absolute -inset-4 bg-gradient-to-br from-red-400/10 to-red-700/10 blur-xl rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <p className="text-xl text-gray-300 leading-relaxed">
                  A thoughtfully customized Road Glide with less than <span className="text-red-400 font-bold">14,500 miles</span> and over 
                  <span className="text-red-400 font-bold"> $15k invested </span>in quality upgrades
                </p>
                
                <div className="relative">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl shadow-2xl border border-red-500/20">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-black text-white">$18,000</span>
                      <span className="text-xl text-red-200">OBO</span>
                    </div>
                    <p className="text-red-100 text-sm mt-1">Comparable builds typically $25k+</p>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur opacity-20"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get in Touch
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="px-6 py-4 border-2 border-gray-700 hover:border-red-500 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
                >
                  View Gallery
                </button>
              </div>
            </div>

            {/* Desktop Image - Show only on lg screens and up */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-square">
                {/* Circle Mask */}
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
                  <img
                    src={images[0]?.src}
                    alt="2011 Harley-Davidson Road Glide Custom"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="absolute top-1/3 left-4 w-1 h-8 bg-gradient-to-b from-red-500 to-transparent"></div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/20 rounded-full pointer-events-none"></div>
              </div>
              
              {/* Enhanced glow effects */}
              <div className="absolute -inset-8 bg-gradient-to-tr from-red-500/15 via-red-600/5 to-transparent blur-2xl rounded-full"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-red-400/10 to-red-700/10 blur-xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="gallery" className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              The <span className="text-red-500">Photo's</span>
            </h2>
          </div>
          
          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative break-inside-avoid cursor-pointer"
                onClick={() => openImageModal(index)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05),transparent_70%)]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Quality <span className="text-red-500">Upgrades</span> & Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Engine Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Engine Power</h3>
                <p className="text-red-400 font-semibold mb-3">96" to 103" (1690cc) V-Twin</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Ported heads for maximum flow</li>
                  <li>• Performance cam swap</li>
                  <li>• Open headers for that rumble</li>
                </ul>
              </div>
            </div>

            {/* Performance Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Performance Tuning</h3>
                <p className="text-red-400 font-semibold mb-3">Thunder Max EFI System</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Custom air intake system</li>
                  <li>• CFM 4" deep rumbling exhaust</li>
                  <li>• Professional dyno tuning</li>
                </ul>
              </div>
            </div>

            {/* Stance Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Custom Stance</h3>
                <p className="text-red-400 font-semibold mb-3">23" Chrome Front Wheel</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Raked & stretched frame</li>
                  <li>• Rear air-ride suspension</li>
                  <li>• Show-stopping presence</li>
                </ul>
              </div>
            </div>

            {/* Details Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Custom Details</h3>
                <p className="text-red-400 font-semibold mb-3">Premium Chrome Package</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• 14" ape hangers</li>
                  <li>• Braided lines</li>
                  <li>• Custom mirrors & pegs</li>
                </ul>
              </div>
            </div>

            {/* Audio Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Premium Audio</h3>
                <p className="text-red-400 font-semibold mb-3">Alpine Sound System</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Alpine detachable bluetooth stereo head unit</li>
                  <li>• Alpine digital amplifier</li>
                  <li>• Polk Audio 6.5" marine speakers</li>
                </ul>
              </div>
            </div>

            {/* Care Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Meticulous Care</h3>
                <p className="text-red-400 font-semibold mb-3">Professional Maintenance</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Rawhide Harley service records</li>
                  <li>• Turkey Creek custom work</li>
                  <li>• Garage-kept, adult owned</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note Section */}
      <section id="important-note" className="py-24 bg-gray-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-950/20 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="group relative bg-gradient-to-br from-yellow-950/50 to-yellow-900/30 backdrop-blur-sm rounded-3xl border-2 border-yellow-500/30 p-12 text-center overflow-hidden shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-yellow-400 drop-shadow-lg">
                IMPORTANT NOTE
              </h2>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-black mb-4 drop-shadow">Before You Ride</h3>
                  <p className="text-lg text-black leading-relaxed">
                    The bike will need <span className="font-bold">a new front tire</span> before riding.</p>
                  <p className="text-lg text-black leading-relaxed">
                    For safety, it needs to be <span className="font-bold">picked up with a trailer</span> <span className="font-bold bg-black/20 px-2 py-1 rounded">(not ridden home)</span>.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-yellow-300 drop-shadow-lg">
                  The discounted price reflects this—otherwise, she's ready for a new owner!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-center border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="relative z-10 text-sm font-bold text-black drop-shadow">New tires needed</p>
                </div>
                <div className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-center border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="relative z-10 text-sm font-bold text-black drop-shadow">Trailer pickup recommended</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-8 py-4 bg-black/30 hover:bg-black/50 text-yellow-300 hover:text-yellow-200 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 border-2 border-yellow-500/50 hover:border-yellow-400/70 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Delivery Options Available
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
            
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
        </div>
      </section>

      {/* Contact & Legal Info Section */}
      <section id="contact" className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
              Questions About This <span className="text-red-500">Glide</span>?
            </h2>
            <p className="text-xl text-gray-400">
              Happy to share more details and answer any questions you might have.
            </p>
          </div>

          <div className="space-y-12">
            {/* Top Row - Bike Details and Delivery Options Side by Side */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">📍</span>
                  Bike Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300 font-medium">Location:</span>
                    <span className="text-red-400 font-semibold">KC Legends area</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300 font-medium">Title:</span>
                    <span className="text-green-400 font-semibold">Clean Title in Hand</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-700">
                    <span className="text-gray-300 font-medium mb-1 sm:mb-0">VIN:</span>
                    <span className="text-gray-200 font-mono text-sm">1HD1KH410BB631899</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">🚚</span>
                  Delivery Options
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm mb-4">Available within KC Legends area • Subject to availability</p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">Within 10 miles</span>
                        <span className="text-yellow-400 font-bold text-lg">$125</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">10-25 mile radius</span>
                        <span className="text-yellow-400 font-bold text-lg">$225</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Interested Section Spanning Full Width */}
            <div className="w-full">
              <div className="bg-gradient-to-br from-red-950/50 to-red-900/30 backdrop-blur-sm rounded-3xl border-2 border-red-500/30 p-10 text-center relative overflow-hidden max-w-4xl mx-auto">
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4">
                      Interested?
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      Custom builds like this don't come around often. I'm happy to answer any questions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="group relative w-full max-w-md mx-auto py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-500/50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Send Message
                      </span>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <p className="text-sm text-gray-400">
                      I'll get back to you promptly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-red-500 text-4xl font-light leading-none focus:outline-none bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              aria-label="Close modal"
            >
              &times;
            </button>
            
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-red-500 text-4xl font-bold focus:outline-none bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            
            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-red-500 text-4xl font-bold focus:outline-none bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              aria-label="Next image"
            >
              &#8250;
            </button>
            
            {/* Main Image */}
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} of {images.length}
            </div>
            
            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`w-16 h-10 object-cover rounded cursor-pointer transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'ring-2 ring-red-500 opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-700">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-3xl font-light leading-none focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold text-red-500 mb-6 text-center">Ask About This Harley</h3>
            <form 
              name="harley-inquiry" 
              method="POST" 
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleContactSubmit} 
              className="space-y-6"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="harley-inquiry" />
              <input type="hidden" name="bot-field" />
              <div>
                <label htmlFor="name" className="block text-gray-300 text-lg font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-red-500 focus:border-red-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-lg font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-red-500 focus:border-red-500"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-lg font-semibold mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-red-500 focus:border-red-500"
                  placeholder="Hi! I'd like to know more about the Road Glide. Could you tell me about..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-red-700 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Scroll Button */}
      <button
        onClick={isHeroVisible ? scrollToGallery : scrollToTop}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-red-500/25 focus:outline-none focus:ring-4 focus:ring-red-500/50"
        aria-label={isHeroVisible ? "Scroll to gallery" : "Back to top"}
      >
        <svg 
          className={`w-6 h-6 transform transition-all duration-300 ${isHeroVisible ? 'rotate-180 group-hover:translate-y-1' : 'group-hover:-translate-y-1'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 15l7-7 7 7" 
          />
        </svg>
        <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default App;
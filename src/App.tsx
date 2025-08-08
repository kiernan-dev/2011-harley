import React, { useState, useEffect } from 'react';


const App: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const images = [
    { src: '/images/glide/IMG_4058.webp', alt: '2011 Harley-Davidson Road Glide Custom - Front View' },
    { src: '/images/glide/IMG_4059.webp', alt: '2011 Harley-Davidson Road Glide Custom - Side View' },
    { src: '/images/glide/IMG_4060.webp', alt: '2011 Harley-Davidson Road Glide Custom - Detail Shot' },
    { src: '/images/glide/IMG_4061.webp', alt: '2011 Harley-Davidson Road Glide Custom - Engine View' },
    { src: '/images/glide/IMG_4062.webp', alt: '2011 Harley-Davidson Road Glide Custom - Chrome Details' },
    { src: '/images/glide/IMG_4063.webp', alt: '2011 Harley-Davidson Road Glide Custom - Custom Details' },
    { src: '/images/glide/IMG_4064.webp', alt: '2011 Harley-Davidson Road Glide Custom - Full Profile' },
    { src: '/images/glide/IMG_4065.webp', alt: '2011 Harley-Davidson Road Glide Custom - Additional View' },
    { src: '/images/glide/IMG_4066.webp', alt: '2011 Harley-Davidson Road Glide Custom - Another Angle' },
    { src: '/images/glide/IMG_4067.webp', alt: '2011 Harley-Davidson Road Glide Custom - Rear View' },
    { src: '/images/glide/IMG_4069.webp', alt: '2011 Harley-Davidson Road Glide Custom - Final Shot' },
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
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        setIsHeroVisible(scrollPosition <= heroBottom + 100);
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
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-lg">🏍️</span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-500 font-black text-xl leading-tight">Road Glide</span>
                <span className="text-gray-400 text-xs font-medium leading-tight">CUSTOM</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'gallery', label: 'Gallery', icon: '📸' },
                { id: 'features', label: 'Features', icon: '⚡' },
                { id: 'value', label: 'Value', icon: '$' },
                { id: 'important-note', label: 'Details', icon: '⚠️' },
                { id: 'contact', label: 'Contact', icon: '📞' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="group flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/30"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
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
                <option value="" disabled>Navigate ⚡</option>
                <option value="gallery">📸 Gallery</option>
                <option value="features">⚡ Features</option>
                <option value="value">$ Value</option>
                <option value="important-note">⚠️ Details</option>
                <option value="contact">📞 Contact</option>
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-red-950/50 rounded-full border border-red-500/30">
                <span className="text-red-400 font-semibold text-sm">CUSTOM BUILD • LOW MILES</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                2011 Harley
                <br />
                <span className="text-red-500">Road Glide</span>
                <br />
                <span className="text-gray-300 text-3xl lg:text-4xl font-light">Custom</span>
              </h1>
            </div>
            
            <div className="space-y-4">
              <p className="text-xl text-gray-300 leading-relaxed">
                Only <span className="text-red-400 font-bold">14,500 miles</span> with over 
                <span className="text-red-400 font-bold"> $15k in premium upgrades</span>
              </p>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl shadow-2xl border border-red-500/20">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-black text-white">$17,000</span>
                    <span className="text-xl text-red-200">OBO</span>
                  </div>
                  <p className="text-red-100 text-sm mt-1">Similar builds go for $25k+</p>
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
                  🔥 Secure This Deal Now
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="px-6 py-4 border-2 border-gray-700 hover:border-red-500 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                📸 View Gallery
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden shadow-2xl">
              {/* Custom Shape Mask */}
              <div 
                className="w-full h-full bg-gray-800"
                style={{
                  clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
                }}
              >
                <img
                  src={images[0]?.src}
                  alt="2011 Harley-Davidson Road Glide Custom"
                  className="w-full h-full object-cover"
                  style={{
                    clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
                  }}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="absolute top-1/3 left-4 w-1 h-8 bg-gradient-to-b from-red-500 to-transparent"></div>
              
              {/* Overlay gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/20"
                style={{
                  clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
                }}
              ></div>
            </div>
            
            {/* Enhanced glow effects */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-red-500/15 via-red-600/5 to-transparent blur-2xl"></div>
            <div className="absolute -inset-4 bg-gradient-to-br from-red-400/10 to-red-700/10 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="gallery" className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              This Is What <span className="text-red-500">Freedom</span> Looks Like
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A real head-turner with <span className="text-red-400">14,500 miles</span> and over 
              <span className="text-red-400"> $15k invested</span> in professional custom work
            </p>
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
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">
                      {image.alt.split(' - ')[1] || 'View Full Size'}
                    </p>
                  </div>
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
              Premium <span className="text-red-500">Upgrades</span> & Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Over $45k total invested - professional custom work that would cost $25k+ today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Engine Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
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
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🔥</span>
                </div>
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
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🏍️</span>
                </div>
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
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Custom Details</h3>
                <p className="text-red-400 font-semibold mb-3">Premium Chrome Package</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• 14" ape hangers</li>
                  <li>• Braided lines throughout</li>
                  <li>• Custom mirrors & pegs</li>
                </ul>
              </div>
            </div>

            {/* Audio Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎵</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Premium Audio</h3>
                <p className="text-red-400 font-semibold mb-3">Alpine Sound System</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Bluetooth stereo head unit</li>
                  <li>• Alpine digital amplifier</li>
                  <li>• Polk Audio marine speakers</li>
                </ul>
              </div>
            </div>

            {/* Care Card */}
            <div className="group relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🛡️</span>
                </div>
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

      {/* Why You'll Love This Bike Section */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-950/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                  Why You'll <span className="text-red-500">Love</span> This Bike
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  This is a <span className="text-red-400 font-semibold">turn-key custom build</span>, professionally maintained and ready to shine at bike nights or shows. This isn't your average Harley—she combines reliability and style in a one-of-a-kind package.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Incredible Value Proposition</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">This Custom Build:</span>
                    <span className="text-3xl font-bold text-red-400">$17,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Similar builds cost:</span>
                    <span className="text-2xl font-bold text-gray-400 line-through">$25,000+</span>
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">You save:</span>
                      <span className="text-3xl font-black text-green-400">$8,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowContactModal(true)}
                className="group relative w-full py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  🚀 Don't Miss Out - Secure This Deal!
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Visual Side */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-2xl font-bold text-red-400">Turn-Key</div>
                    <div className="text-sm text-gray-400">Ready to Ride</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="text-2xl font-bold text-green-400">$8k+ Saved</div>
                    <div className="text-sm text-gray-400">vs Similar Builds</div>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center">
                    <div className="text-3xl mb-2">🛡️</div>
                    <div className="text-2xl font-bold text-blue-400">Pro Maintained</div>
                    <div className="text-sm text-gray-400">Service Records</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-yellow-400">Show Ready</div>
                    <div className="text-sm text-gray-400">Head Turner</div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-8 bg-gradient-to-tr from-red-500/10 to-transparent rounded-3xl blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="value" className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1),transparent_70%)]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Think About <span className="text-amber-400">This</span>...
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Comparison Side */}
            <div className="space-y-8">
              <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">❌</span>
                  <h3 className="text-2xl font-bold text-red-400">New Stock Bike</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li>• Pay $20k+ for basic bike</li>
                  <li>• Loses 20% value immediately</li>
                  <li>• No custom work included</li>
                  <li>• Additional $15k+ for upgrades</li>
                  <li>• Total cost: <span className="text-red-400 font-bold">$35k+</span></li>
                </ul>
              </div>
            </div>

            {/* This Bike Side */}
            <div className="space-y-8">
              <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-8 relative">
                <div className="absolute -top-4 -right-4 bg-amber-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                  SMART CHOICE
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">✅</span>
                  <h3 className="text-2xl font-bold text-green-400">This Custom Beast</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li>• Pay only $17k OBO</li>
                  <li>• Already customized ($15k+ invested)</li>
                  <li>• Barely broken in (14,500 miles)</li>
                  <li>• Professional maintenance history</li>
                  <li>• Total value: <span className="text-green-400 font-bold">$45k+</span></li>
                </ul>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-2xl border border-amber-500/30">
                <p className="text-xl text-amber-300 font-bold">
                  Save $18,000+ and get a chromed-out magnificent beast that's ready to turn heads!
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl lg:text-3xl font-black text-white mb-4">
              This is a <span className="text-amber-400">rare opportunity</span> to get premium custom work at a fraction of the cost!
            </p>
            <button
              onClick={() => setShowContactModal(true)}
              className="group relative px-12 py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                💡 I Want This Smart Deal!
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Important Note Section */}
      <section id="important-note" className="py-24 bg-gray-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-950/50 to-amber-900/30 backdrop-blur-sm rounded-3xl border-2 border-amber-500/30 p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-amber-400">
                IMPORTANT NOTE
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Before You Ride</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  The bike will need <span className="text-amber-400 font-semibold">new tires</span> before riding. 
                  For safety, she should be <span className="text-amber-400 font-semibold">picked up with a trailer</span> (not ridden home).
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-center">
                <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                <p className="text-xl lg:text-2xl font-bold text-amber-300">
                  The discounted price reflects this—otherwise, she's ready for a new owner!
                </p>
                <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                  <span className="text-2xl mb-2 block">🛞</span>
                  <p className="text-sm text-gray-400">New tires needed</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                  <span className="text-2xl mb-2 block">🚛</span>
                  <p className="text-sm text-gray-400">Trailer pickup recommended</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Legal Info Section */}
      <section id="contact" className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
              Ready to Make This <span className="text-red-500">Harley</span> Yours?
            </h2>
            <p className="text-xl text-gray-400">
              Don't let this custom beauty slip away—serious inquiries welcome!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="space-y-8">
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
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3">
                    <span className="text-gray-300 font-medium mb-1 sm:mb-0">VIN:</span>
                    <span className="text-gray-200 font-mono text-sm">1HD1KH410BB631899</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-950/30 to-amber-900/20 rounded-2xl border-2 border-amber-500/30 p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl">⚡</span>
                  <h3 className="text-2xl font-bold text-amber-400">Sale Terms</h3>
                  <span className="text-3xl">⚡</span>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-white">Serious inquiries only</p>
                  <p className="text-lg font-bold text-white">No trades • Cash only</p>
                  <p className="text-amber-300 text-sm mt-4">
                    Ready to close fast for the right buyer!
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Side */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-950/50 to-red-900/30 backdrop-blur-sm rounded-3xl border-2 border-red-500/30 p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-red-600"></div>
                
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-4xl">🏍️</span>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4">
                      Don't Wait!
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      Custom builds like this are rare. At this price, she won't last long.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="group relative w-full py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-500/50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        📞 Contact Seller Now!
                      </span>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <p className="text-sm text-gray-400">
                      Response within 2 hours during business days
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">⏰</div>
                  <div className="text-lg font-bold text-white">Fast Response</div>
                  <div className="text-sm text-gray-400">Within 2 hours</div>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🤝</div>
                  <div className="text-lg font-bold text-white">Easy Process</div>
                  <div className="text-sm text-gray-400">No hassles</div>
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
            <h3 className="text-3xl font-bold text-red-500 mb-6 text-center">Inquire About This Harley</h3>
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
                  placeholder="I'm interested in the Road Glide. Please tell me more!"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-red-700 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
              >
                Send Inquiry
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
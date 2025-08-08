import React, { useState } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI sales agent for this beautiful 2011 Harley-Davidson Road Glide Custom. I can answer questions, discuss pricing (we're flexible between $15k-$17k), and help schedule a viewing. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const images = [
    { src: '/images/IMG_2542.jpg', alt: '2011 Harley-Davidson Road Glide Custom - Front View' },
    { src: '/images/IMG_2546.jpg', alt: '2011 Harley-Davidson Road Glide Custom - Side View' },
    { src: '/images/IMG_2548.jpg', alt: '2011 Harley-Davidson Road Glide Custom - Detail Shot' },
    { src: '/images/IMG_2549.jpg', alt: '2011 Harley-Davidson Road Glide Custom - Engine View' },
    { src: '/images/IMG_2550.jpg', alt: '2011 Harley-Davidson Road Glide Custom - Custom Details' },
    { src: '/images/IMG_2551.jpg', alt: '2011 Harley-Davidson Road Glide Custom - Full Profile' },
  ];

  const handleContactSubmit = (event: React.FormEvent) => {
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

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-red-950 shadow-xl">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('https://tailwindcss.com/_next/static/media/bg-dark@75.90cd243a.png')" }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-red-500 leading-tight tracking-tight mb-4 drop-shadow-lg">
            2011 Harley-Davidson Road Glide Custom
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
            Only 14k Miles – Over $15k in Custom Upgrades!
          </p>
          <div className="bg-red-600 inline-block px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              $17,000 OBO
            </span>
          </div>
          <p className="text-lg text-gray-300 mt-4">
            (Similar bikes with these upgrades easily go for $25k+)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={() => setShowContactModal(true)}
              className="px-8 py-4 bg-red-700 text-white text-xl font-bold rounded-full shadow-lg hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Inquire Now & Secure This Deal!
            </button>
            <button
              onClick={() => document.getElementById('important-note')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-amber-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              ⚠️ Important Note
            </button>
          </div>
        </div>
      </section>

      {/* About Section (Initial details before features) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-900 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            Looking for a truly unique Harley? This 2011 Road Glide Custom is a real head-turner, with just <strong className="text-red-400">14,500 miles</strong> and over <strong className="text-red-400">$15k invested</strong> in professional custom work and premium upgrades, bringing the total invested over <strong className="text-red-400">$45k</strong>.
          </p>
        </div>
      </section>

      {/* Image Gallery Placeholder Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-12">
            This Is What Freedom Looks Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className="rounded-xl aspect-video object-cover shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => openImageModal(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-12">
            Key Features & Upgrades
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-gray-200">Engine Upgrade:</strong> Twin Cam 96" to 103" (1690cc) V-Twin
                  <ul className="list-disc list-inside ml-6 text-gray-400">
                    <li>Ported heads</li>
                    <li>Performance cam swap</li>
                    <li>Open headers</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">
                  <strong className="text-gray-200">Performance Tuning:</strong> Thunder Max EFI tuner, custom air intake & CFM 4" deep rumbling exhaust
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">
                  <strong className="text-gray-200">Stance & Ride:</strong> Impressive 23" chrome front wheel, raked & stretched, rear air-ride suspension
                </span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">
                  <strong className="text-gray-200">Custom Details:</strong> 14" ape hangers, braided lines, extensive chrome, custom mirrors & pegs
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">
                  <strong className="text-gray-200">Premium Audio:</strong> Alpine Bluetooth stereo, Alpine digital amp, Polk Audio marine speakers
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">
                  <strong className="text-gray-200">Meticulous Maintenance:</strong> Service records by Rawhide Harley-Davidson, custom work by Turkey Creek Cycles
                </span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">
                  <strong className="text-gray-200">Care & Condition:</strong> Garage-kept, adult owned, excellent condition
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why You'll Love This Bike Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-red-500 mb-8">
            Why You'll Love This Bike
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
            This is a turn-key custom build, professionally maintained, ready to shine at bike nights or shows. This isn't your average Harley—she combines reliability and style in a one-of-a-kind package.
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-gray-200 mb-8">
            Priced at <span className="text-red-400 font-extrabold">$17,000 OBO</span>; similar bikes with these upgrades and low miles easily go for <span className="text-red-400 font-extrabold">$25k or more</span>. Incredible value for a unique ride!
          </p>
          <button
            onClick={() => setShowContactModal(true)}
            className="px-8 py-4 bg-red-700 text-white text-xl font-bold rounded-full shadow-lg hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Don't Miss Out - Inquire Now!
          </button>
        </div>
      </section>

      {/* Important Note Section */}
      <section id="important-note" className="py-16 sm:py-20 lg:py-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gray-800 rounded-xl p-8 shadow-inner border border-gray-700">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6">
            IMPORTANT NOTE:
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4">
            The bike will need new tires before riding. For safety, she should be picked up with a trailer (not ridden home).
          </p>
          <p className="text-xl sm:text-2xl font-bold text-amber-300">
            The discounted price reflects this—otherwise, she's ready for a new owner!
          </p>
        </div>
      </section>

      {/* Contact & Legal Info Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-red-500 mb-8">
            Ready to Make This Harley Yours?
          </h2>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 space-y-4 mb-10">
            <p className="text-lg text-gray-200">
              <strong className="text-red-400">Location:</strong> [KC Legends area]
            </p>
            <p className="text-lg text-gray-200">
              <strong className="text-red-400">Title:</strong> Clean Title in hand
            </p>
            <p className="text-lg text-gray-200">
              <strong className="text-red-400">VIN:</strong> 1HD1KH410BB631899
            </p>
            <p className="text-xl font-bold text-amber-300 pt-4">
              Serious inquiries only. No trades. Cash only.
            </p>
          </div>
          <button
            onClick={() => setShowContactModal(true)}
            className="px-10 py-5 bg-red-700 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Contact Seller Now!
          </button>
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
    </div>
  );
};

export default App;
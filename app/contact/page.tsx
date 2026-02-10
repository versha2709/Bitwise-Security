'use client'

import { useState } from 'react'
import CyberBackground from '@/components/CyberBackground'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Create mailto link
    const subject = `Security Inquiry from ${formData.name}`
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Service Interested: ${formData.service}

Message:
${formData.message}
    `
    
    const mailtoLink = `mailto:info@bitwise-security.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open email client
    window.location.href = mailtoLink
    
    setStatus('sent')
    setTimeout(() => {
      setStatus('')
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="relative min-h-screen pt-24 pb-16">
      <CyberBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">GET IN</span>{' '}
            <span className="text-cyber-blue text-glow">TOUCH</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyber-blue to-cyber-orange mx-auto mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Ready to secure your infrastructure? Let's discuss your security needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-2xl p-8 box-glow">
            <h2 className="text-3xl font-bold text-cyber-blue mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-500 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-500 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-500 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  Service Interested In *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="Web Application Pentesting">Web Application Pentesting</option>
                  <option value="Active Directory Pentesting">Active Directory Pentesting</option>
                  <option value="Azure Security Audit">Azure Security Audit</option>
                  <option value="Mobile App Pentesting">Mobile App Pentesting</option>
                  <option value="Source Code Analysis">Source Code Analysis</option>
                  <option value="Hardware Pentesting">Hardware Pentesting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-500 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all resize-none"
                  placeholder="Tell us about your security needs..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  status === 'sending'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : status === 'sent'
                    ? 'bg-green-600'
                    : 'bg-gradient-to-r from-cyber-blue to-cyan-500 hover:shadow-lg hover:shadow-cyber-blue/50 hover:scale-105'
                }`}
              >
                {status === 'sending' ? 'SENDING...' : status === 'sent' ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
              </button>

              {status === 'sent' && (
                <p className="text-center text-green-400 text-sm">
                  Your email client will open. Please send the message to complete the process.
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details Card */}
            <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-orange/30 rounded-2xl p-8 box-glow-orange">
              <h2 className="text-3xl font-bold text-cyber-orange mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyber-orange/20 border border-cyber-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyber-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a href="mailto:info@bitwise-security.nl" className="text-cyber-orange hover:text-orange-400 transition-colors">
                      info@bitwise-security.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyber-orange/20 border border-cyber-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyber-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Location</h3>
                    <p className="text-gray-400">Netherlands</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyber-orange/20 border border-cyber-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyber-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Response Time</h3>
                    <p className="text-gray-400">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-2xl p-8 box-glow">
              <h3 className="text-2xl font-bold text-cyber-blue mb-6">Certifications</h3>
              <div className="grid grid-cols-3 gap-4">
                {['OSCP', 'OSWE', 'OSEP'].map((cert, index) => (
                  <div key={index} className="bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-cyber-blue">{cert}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-gradient-to-br from-cyber-darkBlue to-cyber-dark border border-cyber-blue/30 rounded-2xl p-8 box-glow">
              <h3 className="text-2xl font-bold text-cyber-blue mb-4">Availability</h3>
              <p className="text-gray-300">
                Available for security assessments and consultations. 
                Projects are scheduled based on scope and complexity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

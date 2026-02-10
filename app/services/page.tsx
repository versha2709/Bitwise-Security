'use client'

import CyberBackground from '@/components/CyberBackground'

const services = [
  {
    icon: '🌐',
    title: 'Web Application Penetration Testing',
    description: 'I hunt for logic flaws and vulnerabilities that automated tools miss. From the OWASP Top 10 to complex API business logic, I ensure your web apps are resilient against modern attacks.',
    color: 'cyber-blue'
  },
  {
    icon: '🏢',
    title: 'On-Prem Active Directory Pentesting',
    description: 'The "keys to the kingdom" often reside in AD. I simulate an internal breach to see how far an attacker can pivot, escalate privileges, and achieve domain dominance.',
    color: 'cyber-orange'
  },
  {
    icon: '☁️',
    title: 'Azure Pentesting & Audit Checks',
    description: 'Cloud environments are often breached through identity and configuration errors. I perform deep audits of your Azure tenant and subscription security posture.',
    color: 'cyber-blue'
  },
  {
    icon: '📱',
    title: 'Mobile Application Pentesting (iOS & Android)',
    description: 'Mobile apps face unique threats like insecure data storage and weak binary protections. I perform both static and dynamic analysis to keep your mobile users safe.',
    color: 'cyber-orange'
  },
  {
    icon: '🛡️',
    title: 'Source Code Analysis (SAST)',
    description: 'I review your codebase line-by-line to find security flaws at the root. This "White Box" approach is the most effective way to eliminate vulnerabilities during the SDLC.',
    color: 'cyber-blue'
  },
  {
    icon: '📟',
    title: 'Hardware Pentesting',
    description: 'Security doesn\'t end at the software layer. I assess physical devices, IoT hardware, and embedded systems to ensure they can\'t be compromised via physical access or side-channel attacks.',
    color: 'cyber-orange'
  },
]

export default function Services() {
  return (
    <main className="relative min-h-screen pt-24 pb-16">
      <CyberBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">OUR</span>{' '}
            <span className="text-cyber-blue text-glow">SERVICES</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyber-blue to-cyber-orange mx-auto mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Comprehensive security testing services to protect your digital infrastructure
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-cyber-darkBlue/80 backdrop-blur-md border ${
                service.color === 'cyber-blue' ? 'border-cyber-blue/30 box-glow' : 'border-cyber-orange/30 box-glow-orange'
              } rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group`}
            >
              <div className={`text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${
                service.color === 'cyber-blue' ? 'text-cyber-blue' : 'text-cyber-orange'
              }`}>
                {service.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-mono text-gray-400">
                <div className={`w-2 h-2 rounded-full ${
                  service.color === 'cyber-blue' ? 'bg-cyber-blue' : 'bg-cyber-orange'
                } animate-pulse`}></div>
                <span>LEARN MORE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Section */}
        <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-2xl p-12 box-glow mb-8">
          <h2 className="text-4xl font-bold text-cyber-blue mb-8 text-center">My Methodology</h2>
          <p className="text-gray-300 text-center mb-12 text-lg max-w-3xl mx-auto">
            Every engagement follows a rigorous, industry-standard process
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Scoping',
                description: 'Defining boundaries to ensure zero business disruption.',
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )
              },
              {
                step: '02',
                title: 'Reconnaissance',
                description: 'Gathering intelligence on the target.',
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                )
              },
              {
                step: '03',
                title: 'Exploitation',
                description: 'Safely demonstrating the impact of a vulnerability.',
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                )
              },
              {
                step: '04',
                title: 'Reporting',
                description: 'Providing a detailed, prioritized roadmap for remediation.',
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                )
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-cyber-dark border-2 border-cyber-blue rounded-full flex items-center justify-center text-cyber-blue group-hover:scale-110 group-hover:border-cyber-orange group-hover:text-cyber-orange transition-all duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="text-5xl font-bold text-cyber-blue/20 mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Me */}
        <div className="bg-gradient-to-br from-cyber-darkBlue to-cyber-dark border border-cyber-orange rounded-2xl p-12 box-glow-orange text-center">
          <h2 className="text-3xl font-bold text-cyber-orange mb-6">Why Work With Me?</h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto mb-8">
            You receive a comprehensive report that speaks both to developers (with technical PoCs) 
            and stakeholders (with executive risk summaries).
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Technical PoCs', value: '100%' },
              { label: 'Executive Summaries', value: 'Clear' },
              { label: 'Follow-up Support', value: 'Included' },
            ].map((stat, index) => (
              <div key={index} className="bg-cyber-dark/50 rounded-xl p-6 border border-cyber-orange/30">
                <div className="text-3xl font-bold text-cyber-orange mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="/contact" className="inline-block px-10 py-4 bg-gradient-to-r from-cyber-orange to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyber-orange/50 transition-all duration-300 hover:scale-105">
              START YOUR SECURITY ASSESSMENT
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

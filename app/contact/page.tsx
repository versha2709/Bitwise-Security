"use client";

import { useState } from "react";
import { CyberBackground } from "@/components/common";
import contactData from "@/data/contact.json";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "d49e1c89-ab07-4968-a142-64b986a197f4",
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setTimeout(() => {
          setStatus("");
          setFormData({
            name: "",
            email: "",
            company: "",
            service: "",
            message: "",
          });
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="relative min-h-screen pt-24 pb-16">
      <CyberBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">GET IN</span>{" "}
            <span className="text-cyber-blue text-glow">TOUCH</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyber-blue to-cyber-orange mx-auto mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Ready to secure your infrastructure? Let&apos;s discuss your
            security needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-2xl p-8 box-glow">
            <h2 className="text-3xl font-bold text-cyber-blue mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
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
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
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
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
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
                  {contactData.serviceOptions.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
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
                disabled={status === "sending"}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  status === "sending"
                    ? "bg-gray-600 cursor-not-allowed"
                    : status === "sent"
                      ? "bg-green-600"
                      : "bg-gradient-to-r from-cyber-blue to-cyan-500 hover:shadow-lg hover:shadow-cyber-blue/50 hover:scale-105"
                }`}
              >
                {status === "sending"
                  ? "SENDING..."
                  : status === "sent"
                    ? "MESSAGE SENT!"
                    : "SEND MESSAGE"}
              </button>

              {status === "sent" && (
                <p className="text-center text-green-400 text-sm">
                  Thank you for reaching out! We will get back to you as soon as
                  possible.
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details Card */}
            <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-orange/30 rounded-2xl p-8 box-glow-orange">
              <h2 className="text-3xl font-bold text-cyber-orange mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactData.contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyber-orange/20 border border-cyber-orange rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-cyber-orange"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={method.svgPath} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {method.title}
                      </h3>
                      {method.link ? (
                        <a
                          href={method.link}
                          className="text-cyber-orange hover:text-orange-400 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-gray-400">{method.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            <div className="bg-cyber-darkBlue/80 backdrop-blur-md border border-cyber-blue/30 rounded-2xl p-8 box-glow">
              <h3 className="text-2xl font-bold text-cyber-blue mb-6">
                Certifications
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {contactData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-cyber-blue">
                      {cert}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-gradient-to-br from-cyber-darkBlue to-cyber-dark border border-cyber-blue/30 rounded-2xl p-8 box-glow">
              <h3 className="text-2xl font-bold text-cyber-blue mb-4">
                {contactData.availability.title}
              </h3>
              <p className="text-gray-300">
                {contactData.availability.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

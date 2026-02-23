import servicesData from "@/data/services.json";

export default function WhyWorkWithMe() {
  return (
    <div className="bg-gradient-to-br from-cyber-darkBlue to-cyber-dark border border-cyber-orange rounded-2xl p-12 box-glow-orange text-center">
      <h2 className="text-3xl font-bold text-cyber-orange mb-6">
        {servicesData.whyWorkWithMe.title}
      </h2>
      <p className="text-gray-300 text-lg max-w-4xl mx-auto mb-8">
        {servicesData.whyWorkWithMe.description}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {servicesData.whyWorkWithMe.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-cyber-dark/50 rounded-xl p-6 border border-cyber-orange/30"
          >
            <div className="text-3xl font-bold text-cyber-orange mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="/contact"
          className="inline-block px-10 py-4 bg-gradient-to-r from-cyber-orange to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyber-orange/50 transition-all duration-300 hover:scale-105"
        >
          START YOUR SECURITY ASSESSMENT
        </a>
      </div>
    </div>
  );
}

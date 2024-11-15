import { ArrowRight, Smartphone, Zap, Shield } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Bit Pay</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Support
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6 text-gray-800">Pay Smarter, Not Harder</h2>
          <p className="text-xl mb-8 text-gray-600">
            Experience lightning-fast digital payments with Bit Pay
          </p>
          <div className="flex flex-row justify-center items-center">
          <button onClick={(e)=> (navigate("/signin"))} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded flex items-center">
                Get Started <ArrowRight className="ml-2" />
            </button>
        </div>
    
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center text-gray-800">
              Why Choose Bit Pay?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Smartphone className="w-12 h-12 text-blue-500" />}
                title="Mobile-First"
                description="Designed for the way you live, with a seamless mobile experience."
              />
              <FeatureCard
                icon={<Zap className="w-12 h-12 text-blue-500" />}
                title="Instant Transfers"
                description="Send and receive money in seconds, not days."
              />
              <FeatureCard
                icon={<Shield className="w-12 h-12 text-blue-500" />}
                title="Bank-Grade Security"
                description="Your money and data are protected by state-of-the-art encryption."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Bit Pay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center p-6 border rounded-lg shadow-lg">
      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-2 text-gray-800">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

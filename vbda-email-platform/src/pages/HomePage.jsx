import { Link } from 'react-router-dom';
import { FiMail, FiBarChart2, FiClock, FiUsers } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">VBDA 2025</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Dashboard
            </Link>
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">AI-Powered Email Automation</span>
          <span className="block text-blue-600">for VBDA 2025</span>
        </h1>
        <p className="max-w-md mx-auto mt-5 text-xl text-gray-500 sm:text-2xl md:mt-8 md:max-w-3xl">
          Streamline your event communications with our intelligent email platform designed specifically for VBDA 2025.
        </p>
        <div className="flex justify-center mt-8 space-x-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 bg-white border border-transparent rounded-md hover:bg-gray-50"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              AI-Powered Email Automation
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-500">
              Our platform leverages cutting-edge AI to make your event communications effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-md">
                <FiMail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-center text-gray-900">Smart Invitations</h3>
              <p className="mt-2 text-base text-center text-gray-500">
                Automatically generate personalized invitations for different attendee types.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-md">
                <FiClock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-center text-gray-900">Scheduled Follow-ups</h3>
              <p className="mt-2 text-base text-center text-gray-500">
                Set intelligent follow-up sequences that adapt based on recipient engagement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-md">
                <FiBarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-center text-gray-900">Detailed Analytics</h3>
              <p className="mt-2 text-base text-center text-gray-500">
                Track open rates, click-through rates, and response metrics in real-time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-md">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-center text-gray-900">Audience Segmentation</h3>
              <p className="mt-2 text-base text-center text-gray-500">
                Target specific groups with tailored messaging for maximum engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About VBDA Section */}
      <section className="py-16 bg-blue-600">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              About VBDA 2025
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-xl text-blue-100">
              The Viksit Bharat Dialogues & Awards (VBDA) 2025 event brings together industry leaders, innovators, and entrepreneurs for a transformative experience.
            </p>
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 bg-white border border-transparent rounded-md hover:bg-blue-50"
              >
                Learn More About VBDA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Platform</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-300 hover:text-white">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-700">
            <p className="text-base text-gray-400">
              &copy; 2025 VBDA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
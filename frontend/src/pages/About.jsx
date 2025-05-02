import { Link } from "react-router-dom"
const About = () => {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center my-10">
          <h1 className="text-4xl font-bold text-gray-900">About HouseDwell</h1>
          <p className="text-gray-600 mt-2">
            Your trusted ML trained model platform for finding and evaluating real estate rental properties.
          </p>
        </section>
  
        {/* About Section */}
        <div className="flex justify-center gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4 ">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              HouseDwell is an innovative platform designed to help users find their suitable rental home.
              We use machine learning algorithms to predict house prices and provide accurate insights
              for buyers, sellers, and investors. Whether you are looking for a cozy apartment or a
              luxury penthouse, we make the search seamless and data-driven.
            </p>
          </div>
        </div>
  
        {/* Why Choose Us Section */}
        <section className="my-10 text-center">
          <h2 className="text-2xl font-semibold">Why Choose HouseDwell?</h2>
          <div className="mx-auto grid grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">🏡 Smart Search</h3>
              <p className="text-gray-700 mt-2">Find properties tailored to your needs.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">📊 Price Prediction</h3>
              <p className="text-gray-700 mt-2">Accurate ML-based price estimates help you make better decisions.</p>
            </div>
          </div>
        </section>
  
        {/* Meet Our Team Section */}
        <section className="my-10 text-center">
          <h2 className="text-2xl font-semibold">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mt-3">Hitesh Behera</h3>
              <p className="text-gray-500">Backend Devloper</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mt-3">Heet Nandu</h3>
              <p className="text-gray-500">Backend Developer</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mt-3">Sourav mandal</h3>
              <p className="text-gray-500">Frontend Developer</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mt-3">Vinit Prajapati</h3>
              <p className="text-gray-500">Frontend Developer + ML</p>
            </div>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="text-center my-10">
          <h2 className="text-2xl font-semibold">Start Exploring Today!</h2>
          <p className="text-gray-600 mt-2">Find your dream home with HouseDwell.</p>
          <Link to="/listings" 
          className="bg-black text-white px-6 py-3 rounded-md mt-4 inline-block">
            View Listings
          </Link>
        </section>
      </div>
    );
  };
  
  export default About;
  
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <section className="text-center my-12">
        <h1 className="text-5xl font-extrabold text-gray-900">About <span className="text-indigo-600">HouseDwell</span></h1>
        <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
          Your trusted ML-powered platform for discovering and evaluating rental properties intelligently.
        </p>
      </section>

      {/* Who We Are */}
      <section className="my-16 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            HouseDwell is an innovative real estate rental platform that simplifies your home search journey.
            With the power of machine learning, we predict rental prices and provide accurate, real-time insights
            for renters, landlords, and investors. Whether it’s a cozy studio or a lavish penthouse, we guide you
            with data-driven confidence.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Home illustration"
          className="rounded-xl shadow-lg w-full md:w-1/3"
        />
      </section>

      {/* Why Choose Us */}
      <section className="my-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose HouseDwell?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "🏡 Smart Search",
              desc: "Find properties tailored to your needs using our advanced filters and intelligent suggestions."
            },
            {
              title: "📊 Price Prediction",
              desc: "Machine Learning-backed price insights that keep you informed and ahead in the rental market."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    {/* Meet Our Team Section */}
<section className="my-16 text-center">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {[
      { name: "Hitesh Behera", role: "Backend + Frontend", img: "https://i.pravatar.cc/150?img=3" },
      { name: "Heet Nandu", role: "Frontend + ML", img: "https://i.pravatar.cc/150?img=33" },
      { name: "Sourav Mandal", role: "Backend + Frontend", img: "https://i.pravatar.cc/150?img=11" },
      { name: "Vinit Prajapati", role: "Frontend + ML", img: "https://i.pravatar.cc/150?img=51" }
    ].map((member, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2 animate-fade-in"
      >
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-md mb-4 border-4 border-indigo-200">
          <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-lg font-semibold text-gray-800">{member.name}</div>
        <div className="text-sm text-gray-500 mt-1">{member.role}</div>
      </div>
    ))}
  </div>
</section>


      {/* CTA */}
      <section className="text-center my-16">
        <h2 className="text-3xl font-bold text-gray-800">Start Exploring Today!</h2>
        <p className="text-gray-600 mt-3 text-lg">
          Find your dream home with HouseDwell and make confident rental decisions.
        </p>
        <Link
          to="/listings"
          className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium text-lg"
        >
          View Listings
        </Link>
      </section>
    </div>
  );
};

export default About;
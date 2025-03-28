import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully! ✅");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Contact Information */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600 mt-2">We’d love to hear from you! Reach out to us anytime.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Our Office</h2>
          <p className="text-gray-700">📍 1234 Street, Downtown, NY</p>
          <p className="text-gray-700">📧 contact@propertyfinder.com</p>
          <p className="text-gray-700">📞 +1 234 567 890</p>

          {/* Social Media Links */}
          <div className="mt-4 flex-col space-x-4">
            <a href="#" className="text-gray-700 hover:text-black">🔗 Facebook</a>
            <a href="#" className="text-gray-700 hover:text-black">🔗 Twitter</a>
            <a href="#" className="text-gray-700 hover:text-black">🔗 Instagram</a>
          </div>

          {/* Google Map (Optional) */}
          {/* <div className="mt-4">
            <iframe
              title="Google Map"
              className="w-full h-48 rounded-md"
              src="https://www.google.com/maps/embed/v1/place?q=New+York&key=YOUR_API_KEY"
              allowFullScreen
            ></iframe>
          </div> */}
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-md mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-md mb-4"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded-md mb-4"
            ></textarea>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ListingsPage from './pages/ListingsPage';
import PricePrediction from './pages/PricePrediction';
import About from './pages/About';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';

// Import missing owner route components
import OwnerLayout from './owner/OwnerLayout.jsx';
import Dashboard from './owner/Dashboard.jsx';
import Addproperty from './owner/Addproperty.jsx';
// import EditProperty from './owner/EditProperty.jsx';
import InquiryDetails from './owner/InquiryDetails.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="property/:id" element={<PropertyDetail />} />
        <Route path="predict" element={<PricePrediction />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      <Route path="/owner" element={<OwnerLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-property" element={<Addproperty />} />
        {/* <Route path="edit/:id" element={<EditProperty />} /> */}
        <Route path="inquiry/:id" element={<InquiryDetails />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

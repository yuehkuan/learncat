import "./global.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Community from "./pages/Community";
import Teach from "./pages/Teach";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import CoursePublished from "./pages/CoursePublished";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Checkout from "./pages/Checkout";
import PurchasedCourses from "./pages/PurchasedCourses";
import CourseLearning from "./pages/CourseLearning";
import CreateCommunity from "./pages/CreateCommunity";
import CommunityDetail from "./pages/CommunityDetail";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ModalProvider>
        <PaymentProvider>
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/edit-course" element={<EditCourse />} />
          <Route path="/course-published" element={<CoursePublished />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/courses/purchased" element={<PurchasedCourses />} />
          <Route path="/courses/:id/learn" element={<CourseLearning />} />
          <Route path="/community/create" element={<CreateCommunity />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </BrowserRouter>
        </PaymentProvider>
      </ModalProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

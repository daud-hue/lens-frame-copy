import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import WeddingFolders from '@/pages/WeddingFolders';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import ClientPortal from '@/pages/ClientPortal';
import Review from '@/pages/Review';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#050505' }}>
        <div className="w-6 h-6 border-2 border-gray-700 border-t-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/wedding-folders" element={<WeddingFolders />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/client-portal" element={<ClientPortal />} />
      <Route path="/review" element={<Review />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
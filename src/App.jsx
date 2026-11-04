import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Sub-pages are code-split.
const sub = (name) => lazy(() => import('./pages/SubPages').then((m) => ({ default: m[name] })));
const Portfolio = sub('Portfolio');
const ProjectDetail = sub('ProjectDetail');
const Services = sub('Services');
const About = sub('About');
const Contact = sub('Contact');
const Privacy = sub('Privacy');
const NotFound = sub('NotFound');

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<ProjectDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

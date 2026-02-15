import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BroadcastTicker from "../components/BroadcastTicker";

export const metadata = {
  title: "St. Augustine Higher Secondary School",
  description: "Knowledge, Discipline, Integrity - Est. 1952",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen bg-slate-50">
          <div className="sticky top-0 z-50 shadow-md">
            <Header />
            <BroadcastTicker />
          </div>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


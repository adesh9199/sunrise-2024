import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

// Define a type for the component props
interface MyAppProps extends AppProps {
  Component: React.ComponentType<{ toggleDarkMode: () => void }>;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Component {...pageProps} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

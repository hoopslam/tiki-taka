import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useThemeStore from '../store/themeStore';

const App = ({ Component, pageProps }: AppProps) => {
    const [isSSR, setIsSSR] = useState(true);
    const { darkMode } = useThemeStore();

    useEffect(() => {
        setIsSSR(false);
    }, []);

    if (isSSR) return null;

    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN || ``}
        >
            <div
                className={`${
                    darkMode && `dark`
                } flex flex-col items-center w-full`}
            >
                <Navbar />
                <div className='flex'>
                    <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
                        <Sidebar />
                    </div>
                    <div className='lg:px-12 mt-6 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 items-center'>
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;

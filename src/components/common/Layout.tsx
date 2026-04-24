import React, { Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import OrderSheet from './OrderSheet';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Suspense fallback={<div className="h-[90px] w-full bg-white"></div>}>
                <Header />
            </Suspense>
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <OrderSheet />
        </div>
    );
}

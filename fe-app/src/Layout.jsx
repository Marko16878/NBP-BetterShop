import React from "react";
import Header from "./Header";
import Footer from "./Footer";


const MainLayout: React.FC = ({ children }) => (
    <section className='layout'>
        <aside className='sidebar' />
        <section>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </section>
    </section>
);
export default MainLayout;

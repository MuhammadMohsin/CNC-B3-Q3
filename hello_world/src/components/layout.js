import React from 'react';
import Footer from './footer';
import Navbar from './nav';

const Layout = ({children})=>{

    return(<>
        <Navbar />
            <p style={{
                    margin: 0,
                    background: '#fb4545',
                    color: 'white',
                    textAlign: 'center'
            }}
            >Notice: Website will be down for next 2 hrs 
                for maintenance</p>
            {children}
        <Footer />
    </>)
}

export default Layout;
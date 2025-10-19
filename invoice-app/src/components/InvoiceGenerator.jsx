import Header from './header';
import Table from './table';
import Footer from './footer';
import { useState } from 'react';
function InvoiceGenerator() {
    
    return (
        <div className="invoice_generator">
            
            <Header/>
            <Table/>
            <Footer/>
        </div>
    );
}
export default InvoiceGenerator;
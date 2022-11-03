import React from 'react';
import { footerList1, footerList2, footerList3 } from '../utils/constants';
import List from './List';

const Footer = () => {
    return (
        <div className='mt-6 hidden xl:block'>
            <List list={footerList1} />
            <List
                list={footerList2}
                mt
            />
            <List
                list={footerList3}
                mt
            />
            <p className='text-gray-400 text-s mt-5'>2022 David Cho</p>
        </div>
    );
};

export default Footer;

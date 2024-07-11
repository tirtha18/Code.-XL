import React from 'react'
import { useState } from 'react';
import {Link} from 'react-scroll';
export default function Navbar() {
    const links=[
        {
            id: 1,
            link: 'home'
        },
        {
            id: 2,
            link: 'features'
        },
        {
            id: 3,
            link: 'techstack'
        },
        {
            id: 4,
            link: 'contact'
        }
    ];
  return (
    <div className="flex justify-between items-centre w-full px-4 py-4 text-white bg-black fixed">
        <div>
            <h1 className="text-2xl text-white ml-2 rounded-md font-bold">Code.XL</h1>
        </div>
        <ul className="flex mt-auto">
             {links.map(({id,link}) =>(
                <li key={id} className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
                    <Link to={link} smooth duration={500}>{link}</Link>
                </li>
             ))}
        </ul>
    </div>
  );
};

 

'use client';//pathname can be used by declaring this

import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavItems = () => {
    const pathname = usePathname();
    return (
        <ul className='md:flex md:flex-row flex flex-col items-start gap-5'>
            {headerLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <li
                        key={link.route}
                        className={`${isActive && 'text-primary-500'
                            } flex-center p-medium-16 whitespace-nowrap`}
                    >
                        <Link href='{link.route}'>{link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    )
}

export default NavItems
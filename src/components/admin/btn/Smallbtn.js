import React from 'react'
import Link from 'next/link'

export default function Smallbtn({ icon: Icon, href }) {
    return (
        <>
            <Link href={href}>
                <div className=' hover:bg-[#b9870c] hover:text-white cursor-pointer duration-150 p-3 rounded-lg'><Icon className="w-5 h-5" /></div>
            </Link>

        </>
    )
}

import { Headset } from 'lucide-react'
import Link from 'next/link'

export default function NavbarPhone() {
  return (
    <div className='flex items-center gap-2 text-gray-500'>
      <Headset size={32} className='rounded-full' />
      <div className=' dark:text-gray-300'>
        <Link href='tel:0769999' className='flex flex-col items-center'>
          <p className='text-sm'>مشاوره و خرید</p>
          <p>
            <span className='text-sm'>076</span>-
            <span className='font-bold'>9999</span>
          </p>
        </Link>
      </div>
    </div>
  )
}

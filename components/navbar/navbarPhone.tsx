import { Headset, Phone } from 'lucide-react'
import Link from 'next/link'

export default function NavbarPhone() {
  return (
    <div className='flex items-center gap-3 group'>
      <div className='relative'>
        <div className='absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        <div className='relative bg-gradient-to-br from-primary/10 to-primary/5 p-2.5 rounded-full border border-primary/20'>
          <Headset size={20} className='text-primary' />
        </div>
      </div>
      <div className='flex flex-col'>
        <Link
          href='tel:0769999'
          className='group/link flex flex-col items-start transition-all duration-300'
        >
          <p className='text-xs text-default-500 font-medium group-hover/link:text-primary transition-colors duration-300'>
            مشاوره و خرید
          </p>
          <div className='flex items-center gap-1'>
            <Phone
              size={12}
              className='text-primary/60 group-hover/link:text-primary transition-colors duration-300'
            />
            <p className='text-sm font-bold text-foreground group-hover/link:text-primary transition-colors duration-300'>
              <span className='text-xs'>076</span>-
              <span className='text-base'>9999</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

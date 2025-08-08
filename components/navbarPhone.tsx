import { Headset } from 'lucide-react'

export default function NavbarPhone() {
  return (
    <div className='flex items-center gap-2 text-gray-500'>
      <Headset size={32} className='rounded-full' />
      <div className='flex flex-col items-center dark:text-gray-300'>
        <p className='text-xs'>مشاوره و خرید</p>
        <p>
          <span className='text-xs'>076</span>-
          <span className='font-semibold'>33380664</span>
        </p>
      </div>
    </div>
  )
}

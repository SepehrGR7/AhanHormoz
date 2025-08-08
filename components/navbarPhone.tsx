import { Headset } from 'lucide-react'

export default function NavbarPhone() {
  return (
    <div className='text-gray-500  flex items-center gap-2'>
      <Headset size={32} className='bg-gray-300 p-1 rounded-full' />
      <div className='flex flex-col items-center dark:text-gray-300'>
        <p className='text-xs'>مشاوره و خرید</p>
        <p className=''>
          <span className='text-xs'>076</span>-
          <span className='font-semibold'>33380664</span>
        </p>
      </div>
    </div>
  )
}

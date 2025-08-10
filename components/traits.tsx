import { Divider } from '@heroui/divider'

export default function Traits() {
  return (
    <div className='dark:bg-gray-900 w-full h-full py-10'>
      <div className='flex justify-center items-center gap-4'>
        <Divider className='max-w-xs h-0.5 rounded-full' />
        <h2 className='font-extrabold text-xl text-center'>
          تجربه‌ای راحت و مطمئن از خرید
        </h2>
        <Divider className='max-w-xs h-0.5 rounded-full' />
      </div>
    </div>
  )
}

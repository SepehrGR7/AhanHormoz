import { Divider } from '@heroui/divider'
import TraitItem from './traitItem'
import { traitItems } from '@/config/traitItems'

export default function Traits() {
  return (
    <div className='bg-gray-100 dark:bg-gray-950  w-full h-full py-10'>
      <div className='flex justify-center items-center gap-4 mb-10'>
        <Divider className='w-[4rem] md:w-[10rem] lg:w-[12rem] h-0.5 rounded-full' />
        <h2 className='font-extrabold text-lg md:text-xl text-center'>
          تجربه‌ای راحت و مطمئن از خرید
        </h2>
        <Divider className='w-[4rem] md:w-[10rem] lg:w-[12rem] h-0.5 rounded-full' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-0 lg:gap-0 justify-items-center'>
        {traitItems.map(item => (
          <TraitItem
            key={item.id}
            title={item.title}
            iconName={item.icon}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}

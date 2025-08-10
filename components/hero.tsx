import { siteConfig } from '@/config/site'
import HeroItem from './heroItem'
import { title } from './primitives'

export default function Hero() {
  return (
    <section className='bg-gray-100 text-center px-4 py-10 w-full'>
      <h2 className={title({ color: 'blue' })}>قیمت روز آهن آلات</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12  '>
        {siteConfig.heroItems.map(item => (
          <HeroItem key={item.name} label={item.label} icon={item.icon} />
        ))}
      </div>
    </section>
  )
}

import Hero from '@/components/hero'
import Traits from '@/components/traits'
import ProductSlider from '@/components/product-slider'

export default function Home() {
  return (
    <main className='flex flex-col gap-10 dark:bg-stone-950'>
      <section>
        <Hero />
      </section>

      <section className='container px-4 mx-auto'>
        <ProductSlider title='آخرین قیمت‌ها' />
      </section>

      <section>
        <Traits />
      </section>
    </main>
  )
}

import Hero from '@/components/hero';
import Traits from '@/components/traits';
import Image from 'next/image';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center dark:bg-stone-950">
      <Hero />
      <Traits />
      {/* <Image src='/1.png' alt='e33' width={4000} height={4000} /> */}
      {/* <Image src='/2.jpeg' alt='cp2077' width={4000} height={4000} /> */}
    </section>
  );
}

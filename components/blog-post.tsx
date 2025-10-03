import Image from 'next/image'
import Link from 'next/link'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { CalendarDays, Clock3, ArrowRight } from 'lucide-react'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  author: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className='overflow-hidden group flex flex-col h-full'>
      <div className='relative h-48 w-full overflow-hidden'>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <div className='p-6 flex flex-col flex-1'>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <CalendarDays size={16} />
            <span>{post.date}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Clock3 size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className='mt-3'>
          <h3 className='text-xl font-bold'>{post.title}</h3>
          <p className='text-muted-foreground line-clamp-3 mt-2'>
            {post.excerpt}
          </p>
        </div>

        <div className='mt-auto'>
          <div className='mt-6 border-t border-muted-foreground/10 pt-4'>
            <Button asChild className='flex items-center gap-2'>
              <Link href={`/manufacturers/${post.id}`}>
                <ArrowRight className='w-4 h-4' />
                <span>ادامه مطلب</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

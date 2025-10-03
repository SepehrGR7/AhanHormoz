import Image from 'next/image'
import Link from 'next/link'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { CalendarDays, Clock3 } from 'lucide-react'

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
    <Card className='overflow-hidden group'>
      <div className='relative h-48 w-full overflow-hidden'>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <div className='p-6 space-y-4'>
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
        <h3 className='text-xl font-bold'>{post.title}</h3>
        <p className='text-muted-foreground line-clamp-3'>{post.excerpt}</p>
        <Button asChild>
          <Link href={`/manufacturers/${post.id}`}>ادامه مطلب</Link>
        </Button>
      </div>
    </Card>
  )
}

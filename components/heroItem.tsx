import { Card, CardBody, CardHeader } from '@heroui/card'

export default function HeroItem({
  label,
  icon,
}: {
  label: string
  icon: string
}) {
  return (
    <Card className='max-w-lg relative overflow-visible'>
      <CardHeader className='flex gap-2'>
        <div className='bg-white border shadow dark:bg-gray-700 flex gap-2 items-center py-1 px-2 rounded-full absolute -top-5 z-50 text-md'>
          <i className={`${icon} text-[32px]`}></i>
          <h3 className='font-medium'>قیمت {label}</h3>
        </div>
      </CardHeader>
      <CardBody className='text-sm pr-5 grid grid-cols-2 gap-10'>
        <ul className='flex flex-col items-start gap-1.5'>
          <li>میلگرد ساده</li>
          <li>میلگرد غیر ساده</li>
          <li>میلگرد خیلی ساده</li>
        </ul>
        <ul className='flex flex-col items-start gap-1'>
          <li>میلگرد ساده</li>
          <li>میلگرد غیر ساده</li>
          <li>میلگرد خیلی ساده</li>
        </ul>
      </CardBody>
    </Card>
  )
}

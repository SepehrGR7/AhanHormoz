import { Card, CardBody, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'

export default function HeroItem({
  label,
  icon,
}: {
  label: string
  icon: string
}) {
  return (
    <Card className='max-w-lg'>
      <CardHeader className='flex gap-2'>
        <i className={`${icon} text-[36px]`}></i>
        <h3 className='font-medium'>قیمت {label}</h3>
      </CardHeader>
      <Divider />
      <CardBody className='text-sm pr-5 flex flex-row'>
        <ul className='flex flex-col items-start'>
          <li>میلگرد ساده</li>
          <li>میلگرد غیر ساده</li>
          <li>میلگرد خیلی ساده</li>
        </ul>
        <ul className='flex flex-col items-start'>
          <li>میلگرد ساده</li>
          <li>میلگرد غیر ساده</li>
          <li>میلگرد خیلی ساده</li>
        </ul>
      </CardBody>
    </Card>
  )
}

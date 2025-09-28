import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Coins, Banknote, ShieldCheck, PhoneCall } from 'lucide-react';

const iconMap = {
  Coins: Coins,
  Banknote: Banknote,
  ShieldCheck: ShieldCheck,
  PhoneCall: PhoneCall,
};

interface TraitItemProps {
  iconName: keyof typeof iconMap;
  title: string;
  description: string;
}

export default function TraitItem({
  title,
  iconName,
  description,
}: TraitItemProps) {
  const IconComponent = iconMap[iconName];
  return (
    <Card className="w-[75%] md:w-[18rem] h-[10.5rem]">
      <CardHeader className="flex items-center gap-2">
        <IconComponent
          className="bg-green-400 text-white rounded-full p-2 overflow-visible"
          size={42}
        />
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-hidden mr-1">
        <p className="text-sm text-justify text-gray-900/80 dark:text-foreground pl-4 leading-6">
          {description}
        </p>
      </CardBody>
    </Card>
  );
}

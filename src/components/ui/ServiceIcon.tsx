import {
  House,
  PackageOpen,
  Sparkles,
  SprayCan,
  type LucideIcon,
} from 'lucide-react';
import { ServiceIconName } from '@/types';

const iconMap: Record<ServiceIconName, LucideIcon> = {
  sparkles: Sparkles,
  spray: SprayCan,
  package: PackageOpen,
  home: House,
};

interface ServiceIconProps {
  icon: ServiceIconName;
  className?: string;
  strokeWidth?: number;
}

export default function ServiceIcon({
  icon,
  className,
  strokeWidth = 1.8,
}: ServiceIconProps) {
  const Icon = iconMap[icon];

  return <Icon className={className} strokeWidth={strokeWidth} />;
}

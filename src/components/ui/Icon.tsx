import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Clock,
  Compass,
  Cpu,
  GraduationCap,
  Globe,
  Layers,
  LoaderCircle,
  Megaphone,
  Menu,
  Play,
  Search,
  Send,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
  CircleAlert,
  type LucideProps,
} from "lucide-react";

const icons = {
  "arrow-down": ArrowDown,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  bot: Bot,
  calendar: CalendarCheck,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  clapperboard: Clapperboard,
  clock: Clock,
  compass: Compass,
  cpu: Cpu,
  graduation: GraduationCap,
  globe: Globe,
  layers: Layers,
  loader: LoaderCircle,
  megaphone: Megaphone,
  menu: Menu,
  play: Play,
  search: Search,
  send: Send,
  share: Share2,
  sparkles: Sparkles,
  target: Target,
  trending: TrendingUp,
  users: Users,
  workflow: Workflow,
  close: X,
  zap: Zap,
  alert: CircleAlert,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

/** Wrapper unico per Lucide: nome tipizzato, decorativo per default. */
export function Icon({ name, strokeWidth = 1.75, ...props }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={strokeWidth} {...props} />;
}

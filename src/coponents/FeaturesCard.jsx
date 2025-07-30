// src/components/FeatureCard.jsx
import { Card } from '../components/ui/card'
import * as Lucide from 'lucide-react'
export default function FeatureCard({ icon, title, description, color }) {
  const colorMap = {
    blue:   'text-[var(--bg-blue-green)]    bg-[var(--bg-blue-green)]/10',
    purple: 'text-[var(--bg-secondary)]      bg-[var(--bg-secondary)]/10',
    orange: 'text-[var(--bg-orange)]         bg-[var(--bg-orange)]/10',
    green:  'text-[var(--bg-green-secondary)] bg-[var(--bg-green-secondary)]/10',
  }
    const IconComponent = Lucide[icon]

  return (
    <Card className="
        p-6 
        bg-containerwhite 
        border-0 
        shadow-card 
        hover:shadow-button 
        transition-all 
        duration-300
      "
    >
      <div className={`
          w-12 h-12 
          rounded-lg 
          ${colorMap[color]} 
          flex items-center justify-center 
          mb-4
        `}
      >
        {IconComponent && <IconComponent className="w-6 h-6" />}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Card>
  )
}

'use client'

import { ViewStyle } from '../types/ViewStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGrip, faTableCells, faTableList } from '@fortawesome/pro-duotone-svg-icons'
import { cn } from '@/utils/classNames'

type ViewStyleButtonsProps = {
  currentStyle: ViewStyle
  onStyleChange: (style: ViewStyle) => void
}

export const ViewStyleButtons = ({ currentStyle, onStyleChange }: ViewStyleButtonsProps) => {
  const styles = [
    { 
      type: ViewStyle.LIST, 
      icon: faList,
      title: 'Vue liste'
    },
    { 
      type: ViewStyle.GRID, 
      icon: faGrip,
      title: 'Vue grille'
    },
    { 
      type: ViewStyle.COMPACT, 
      icon: faTableList,
      title: 'Vue compacte' 
    },
    { 
      type: ViewStyle.DETAILS, 
      icon: faTableCells,
      title: 'Vue détaillée'
    }
  ]

  return (
    <div className="flex gap-2 mb-4">
      {styles.map(style => (
        <button
          key={style.type}
          onClick={() => onStyleChange(style.type)}
          className={cn(
            'p-2 rounded-lg transition-colors',
            currentStyle === style.type
              ? 'bg-fuchsia-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700'
          )}
          title={style.title}
        >
          <FontAwesomeIcon icon={style.icon} className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}
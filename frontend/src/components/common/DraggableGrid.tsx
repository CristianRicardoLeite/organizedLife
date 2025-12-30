import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box } from '@mui/material'
import { ReactNode, useState } from 'react'

interface DraggableChartProps {
  id: string
  children: ReactNode
}

const DraggableChart = ({ id, children }: DraggableChartProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  )
}

interface ChartItem {
  id: string
  component: ReactNode
}

interface DraggableGridProps {
  initialItems: ChartItem[]
  onReorder?: (items: ChartItem[]) => void
}

const DraggableGrid = ({ initialItems, onReorder }: DraggableGridProps) => {
  const [items, setItems] = useState(initialItems)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems(currentItems => {
        const oldIndex = currentItems.findIndex(item => item.id === active.id)
        const newIndex = currentItems.findIndex(item => item.id === over.id)
        const newItems = arrayMove(currentItems, oldIndex, newIndex)

        if (onReorder) {
          onReorder(newItems)
        }

        return newItems
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 3,
          }}
        >
          {items.map(item => (
            <DraggableChart key={item.id} id={item.id}>
              {item.component}
            </DraggableChart>
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  )
}

export default DraggableGrid

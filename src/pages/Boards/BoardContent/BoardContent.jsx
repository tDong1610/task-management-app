import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, MouseSensor,TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors#usesensor

  const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance: 10 } })
  // Yêu cầu di chuyển chuột 10px mới kích hoạt event , fix trường hợp click chuột bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhấn giữ 250ms và dung sai của cảm ứng ( dễ hiểu là di chuyển /chênh lệch 500px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance:500 } })

  const sensors = useSensors(mouseSensor, touchSensor)
  // Ưu tiên sử dụng kết hợp 2 loại sesor là Mouse và Touch để có trải nghiệm tốt nhất trên mobile
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event)
    const { active, over } = event
    // Kiểm tra  nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗilỗi)
    if (!over) return
    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      //Lấy vị trí cũ từ thằng active
      const oldIndex= orderedColumns?.findIndex(c => c._id === active.id)
      //Lấy vị trí mới từ thằng over
      const newIndex= orderedColumns?.findIndex(c => c._id === over.id)

      // dùng array move để sắp xếp lại mảng Columns ban đầu
      // Code của array move ở đây :dnd-kit/packages/sortable/src/utilities/arrayMove.ts
      const dndOrederedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // 2 cái console.log sau dung để kiểm tra api
      // const dndOrederedColumnsIds = dndOrederedColumns.map(c => c._id)
      // console.log('🚀 ~ handleDragEnd ~ dndOrederedColumnsIds:', dndOrederedColumnsIds)
      // console.log('dndOrederedColumns', dndOrederedColumns)

      // Cập nhật lại  state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrederedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p:'10px 0'

        // alignItems: 'center'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent

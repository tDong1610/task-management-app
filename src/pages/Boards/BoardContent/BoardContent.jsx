import { useCallback, useEffect, useState ,useRef} from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, rectIntersection, getFirstCollision, closestCenter } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep,isEmpty} from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CAR: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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
  // Cùng 1 thời điểm chỉ có 1 item được kéo thả
  const [activeDragItemId, setcativeDragItemId] = useState(null)

  const [activeDragItemType, setactiveDragItemType] = useState(null)

  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColumnWhenDragingCard, setOldColumnWhenDragingCard] = useState(null)

  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColmunByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Function chung để xử lý việc cập nhật lại  state trong TH di chuyển Card giũa các Column
  const moveCardBetweenColumns = (overColumn, overCardId, over, active, activeColumn, activeDraggingCardData, activeDraggingCardId) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top >
        over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.length + 1
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      // console.log('nextColumns', nextColumns)

      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    // console.log('🚀 ~ handleDragStart ~ handleDragStart:', event)
    setcativeDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CAR : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragingCard(findColmunByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    console.log('handleDragOver', event)
    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.COLUMN) {return}
    const { active, over } = event
    if (!active||!over) return
    const { id: activeDraggingCardId, data :{ current:activeDraggingCardData } } = active
    const { id:overCardId } = over

    const activeColumn = findColmunByCardId(activeDraggingCardId)
    const overColumn = findColmunByCardId(overCardId)

    if (!activeColumn||!overColumn) return

    if (activeColumn._id !==overColumn._id) {
      moveCardBetweenColumns(
        overColumn,
        overCardId,
        over,
        active,
        activeColumn,
        activeDraggingCardData,
        activeDraggingCardId
      )

    }
  }

  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event)

    const { active, over } = event
    // Kiểm tra  nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗilỗi)
    if (!over) return

    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.CAR) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      const activeColumn = findColmunByCardId(activeDraggingCardId)
      const overColumn = findColmunByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDragingCard._id !== overColumn._id) {
        moveCardBetweenColumns(overColumn,
          overCardId,
          over,
          active,
          activeColumn,
          activeDraggingCardData,
          activeDraggingCardId
        )
      } else {
        //Lấy vị trí cũ từ thằng oldColumnWhenDragingCard
        const oldCardIndex = oldColumnWhenDragingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        //Lấy vị trí mới từ thằng over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrederedCards = arrayMove(oldColumnWhenDragingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const tagetColumn = nextColumns.find(column => column._id === overColumn._id)
          tagetColumn.cards = dndOrederedCards
          tagetColumn.cardOrderIds = dndOrederedCards.map(card => card._id)
          return nextColumns
        })
      }
    }


    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Lấy vị trí cũ từ thằng active
        const oldColumnIndex = orderedColumns?.findIndex(c => c._id === active.id)
        //Lấy vị trí mới từ thằng over
        const newColumnIndex = orderedColumns?.findIndex(c => c._id === over.id)

        // dùng array move để sắp xếp lại mảng Columns ban đầu
        // Code của array move ở đây :dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrederedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // 2 cái console.log sau dung để kiểm tra api
        // const dndOrederedColumnsIds = dndOrederedColumns.map(c => c._id)
        // console.log('🚀 ~ handleDragEnd ~ dndOrederedColumnsIds:', dndOrederedColumnsIds)
        // console.log('dndOrederedColumns', dndOrederedColumns)

        // Cập nhật lại  state columns ban đầu sau khi đã kéo thả
        setOrderedColumns(dndOrederedColumns)
      }
    }
    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu

    setcativeDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
    setOldColumnWhenDragingCard(null)
  }
  const customdropAnimation = {
    sideEffects:defaultDropAnimationSideEffects({ styles:{ active: { opacity: 0.5 } } })
  }

  const collisionDetectionStrategy = useCallback((args) => {

    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerIntersection = pointerWithin(args)

    if (!pointerIntersection?.length) return
    
    // Thuật toán phát hiện va chạm sẽ trả về 1 mảng các vav chạm trả về 1 mảng các va chạm ở đây (ko cần bước này nữa -37.1)
    // const intersections = !!pointerIntersection?.length
    //   ? pointerIntersection
    //   : rectIntersection(args)
    
    let overId = getFirstCollision(pointerIntersection,'id')
    if (overId) {

        const checkColumn = orderedColumns.find(column => column._id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers : args.droppableContainers.filter (container => {
              return (container.id !==overId) && (checkColumn?.cardOrderIds?.includes(container.id))
            })
          })[0]?.id
        }
        lastOverId.current = overId
        return [{id:overId}]
    }
    return lastOverId.current ? [{id:lastOverId.current}] : []
  }, [activeDragItemType])
  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p:'10px 0'

        // alignItems: 'center'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customdropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CAR) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

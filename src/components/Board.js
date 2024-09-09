import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const staticData = [
  [
    { id: '6', content: 'Salary Negotiation' },
    { id: '7', content: 'Offer letter Agreement' },
    { id: '8', content: 'Join Office' },
    { id: '9', content: 'Grow company and self carrier' },
    { id: '10', content: 'Appraisal' }
  ],
  [{ id: '5', content: 'Interview Scheduled' }],
  [],
  [{ id: '4', content: 'Task Submitted' }],
  [
    { id: '1', content: 'Apply for Job' },
    { id: '2', content: 'Upload Resume' },
    { id: '3', content: 'Task Development' }
  ]
];

const staticColumns = [
  'To Do',
  'In Development',
  'Testing',
  'Ready For Deployment',
  'Done'
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? '#65a2fcdc' : 'white',
  borderRadius: '5px',
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#65a2fcdc' : '',
  padding: grid,
  width: 250
});

function Board() {
  const [state, setState] = useState([]);
  const [itemName, setItemName] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(10);

  console.log('STATE-', state);

  useEffect(() => {
    setState(staticData);

    return () => {
      setState([]);
    };
  }, []);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  }

  return (
    <div className='h-full w-full border p-5 overflow-scroll'>
      <div className='w-full flex justify-start items-center '>
        {/* <button
          className='h-10 w-36 bg-blue-500 rounded-md'
          type='button'
          onClick={() => {
            setState([...state, []]);
          }}
        >
          Add new group
        </button> */}
        <input
          className='h-10 cursor-default p-1 text-blue-700 font-semibold rounded-md'
          value={itemName}
          onChange={({ target }) => {
            setItemName(target.value);
          }}
        ></input>
        <button
          className='h-10 w-36 bg-blue-500 ml-2 rounded-md'
          type='button'
          onClick={() => {
            let addedItem = state;
            addedItem[0].push({
              id: `${totalItemCount + 1}`,
              content: itemName
            });
            setState([...addedItem]);
            setTotalItemCount(totalItemCount + 1);
            setItemName('');
          }}
        >
          Add new item
        </button>
      </div>
      <div className='mt-10 flex w-full h-full'>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((item, index) => (
            <div>
              <span className='w-full flex justify-center font-semibold font-serif text-blue-700'>
                {staticColumns[index]}
              </span>
              <Droppable key={index} droppableId={`${index}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {item.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className='flex justify-between relative text-blue-700 font-semibold '>
                              <span>{item.content}</span>
                              <span className='absolute bottom-0 right-0 font-mono text-[11px]'>
                                TID-{item.id}
                              </span>
                              {/* <button
                              type='button'
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter((group) => group.length)
                                );
                              }}
                            >
                              delete
                            </button> */}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
export default Board;

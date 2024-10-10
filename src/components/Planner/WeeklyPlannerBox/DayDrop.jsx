import { Droppable } from "react-beautiful-dnd";

const DayDrop = ({ day }) => {
  console.log(day);

  return (
    <Droppable droppableId="droppable-day">
      {(provided) => (
        <div
          className="h-[350px] w-[800px] border border-black"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{day.day}:</h2>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DayDrop;

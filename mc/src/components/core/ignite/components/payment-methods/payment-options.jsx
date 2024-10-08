import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Core from '../../../../core';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PaymentOptions = ({ methods, handleOptionUpdate }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const options = reorder(
      methods,
      result.source.index,
      result.destination.index
    );
    handleOptionUpdate(options);
  };

  const handlePaymentOptionUpdate = (label, key, value) => {
    const activeItem = methods.find((method) => method.label === label);
    if (key === 'fields') {
      for (let val of value) {
        methods[activeItem.displayOrder][val.key] = val.value;
      }
    } else {
      methods[activeItem.displayOrder][key] = value;
    }
    handleOptionUpdate(methods);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className="payment-options"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {methods.map((item, index) => (
              <Draggable
                key={`draggable${index}`}
                draggableId={`draggeble-${item.displayOrder}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="pay-option"
                    key={`payment-options-${index}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Core.PaymentCard
                      {...item}
                      handlePaymentOptionUpdate={handlePaymentOptionUpdate}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PaymentOptions;

PaymentOptions.propTypes = {
  handleOptionUpdate: PropTypes.func,
  methods: PropTypes.array,
};
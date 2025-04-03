import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button aria-label="btn-delete" className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

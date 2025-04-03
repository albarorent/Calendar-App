import { addHours, differenceInSeconds } from "date-fns";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import { toast } from "sonner";
import { useCalendarStore, useUiStore } from "../../hooks";
import { getEnvVariables } from "../../helpers/getEnvVariables";
registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
if(getEnvVariables().VITE_MODE !== "test") {
Modal.setAppElement("#root");
}

export const CalendarModal = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const onCloseModal = () => {
    closeDateModal();
  };

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmited]);

  useEffect(() => {
    if (activeEvent !== null && typeof activeEvent === "object") {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event: Date | null, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      return toast.error("Fechas incorrectas. Revisar las fechas ingresadas");
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false)
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={onSubmit} className="container">
        <div className="form-group mb-2 d-flex flex-column">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, "start")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2 d-flex flex-column">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, "end")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass} `}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={onInputChange}
            value={formValues.title}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            onChange={onInputChange}
            value={formValues.notes}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

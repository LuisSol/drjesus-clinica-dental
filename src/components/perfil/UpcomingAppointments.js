import { useState } from "react";
import ReactModal from "react-modal";
import { today } from "../../utils/dateFunctions";
import flasher from "../../utils/flasher";

ReactModal.setAppElement("body");

import CancelConfirmation from "./CancelConfirmation";
import AppointmentInfoCard from "./AppointmentInfoCard";

const cancelationSpan = 3540000; /* 59mn in ms */

const UpcomingAppointments = ({ upcomingAppoinments }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppoinment, setSelectedAppointment] = useState({});

  const cancelAppointment = (appointment) => {
    if (appointment.timeStamp - today() < cancelationSpan) {
      return flasher(
        "Las citas solo pueden ser canceladas con más de 1 hora de anticipación",
        "error"
      );
    }
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  return (
    <>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        overlayClassName="appointment-confirmation-overlay"
        className="appointment-confirmation-content"
        closeTimeoutMS={200}
      >
        <CancelConfirmation
          selectedAppoinment={selectedAppoinment}
          setModalOpen={setModalOpen}
        />
      </ReactModal>
      <div className="appointments">
        <h2>Próximas citas:</h2>
        <small>
          * Las citas deben ser canceladas con al menos 1 hora de anticipación.
        </small>
        {upcomingAppoinments &&
          Object.values(upcomingAppoinments).map((appointment) => (
            <AppointmentInfoCard key={appointment.timeStamp} {...appointment}>
              <button
                onClick={() => cancelAppointment(appointment)}
                className="link-btn secunday-btn cancel-btn"
              >
                Cancelar
              </button>
            </AppointmentInfoCard>
          ))}
      </div>
    </>
  );
};

export default UpcomingAppointments;

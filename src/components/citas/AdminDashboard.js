import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { rtdb } from "../../utils/firebase";
import flasher from "../../utils/flasher";
import Nprogress from "nprogress";

const DashBoard = styled.div`
  label {
    display: inline;
  }
  .fullday-btn {
    width: 100%;
    margin-top: 1rem;
  }
  .restForm {
    display: flex;
    align-items: center;
    label {
      margin-top: 0;
      margin-right: 1rem;
    }
    select {
      margin-left: 1rem;
    }
  }
`;
const ButtonsContainer = styled.div`
  text-align: right;
  button {
    margin-left: 0.5rem;
    width: 5rem;
    height: 2rem;
    border-radius: 7px;
    display: inline-block;
  }
  .cancel {
    border: 1px solid #999;
    color: #777;
  }
`;

const AdminDashboard = ({ setServiceDuration, setValues, currentDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [restBlock, setRestBlock] = useState(false);
  const [restDuration, setRestDuration] = useState(1);

  const setDayOfRest = (e) => {
    e.preventDefault();
    Nprogress.start();
    const dayRef = rtdb.ref(`days/${currentDate}`);
    dayRef
      .set({
        0: {
          hour: "10_00am",
          appointment: {
            desc: {
              service: "descanzo",
              timeBlocks: 20,
              cancelPaths: [
                `days/${currentDate}/0/appointment`,
                `days/${currentDate}/1/appointment`,
                `days/${currentDate}/2/appointment`,
                `days/${currentDate}/3/appointment`,
                `days/${currentDate}/4/appointment`,
                `days/${currentDate}/5/appointment`,
                `days/${currentDate}/6/appointment`,
                `days/${currentDate}/7/appointment`,
                `days/${currentDate}/8/appointment`,
                `days/${currentDate}/9/appointment`,
                `days/${currentDate}/10/appointment`,
                `days/${currentDate}/11/appointment`,
                `days/${currentDate}/12/appointment`,
                `days/${currentDate}/13/appointment`,
                `days/${currentDate}/14/appointment`,
                `days/${currentDate}/15/appointment`,
                `days/${currentDate}/16/appointment`,
                `days/${currentDate}/17/appointment`,
                `days/${currentDate}/18/appointment`,
                `days/${currentDate}/19/appointment`,
              ],
            },
          },
        },
        1: { hour: "10_30am", appointment: "desc" },
        2: { hour: "11_00am", appointment: "desc" },
        3: { hour: "11_30am", appointment: "desc" },
        4: { hour: "12_00pm", appointment: "desc" },
        5: { hour: "12_30pm", appointment: "desc" },
        6: { hour: "1_00pm", appointment: "desc" },
        7: { hour: "1_30pm", appointment: "desc" },
        8: { hour: "2_00pm", appointment: "desc" },
        9: { hour: "2_30pm", appointment: "desc" },
        10: { hour: "3_00pm", appointment: "desc" },
        11: { hour: "3_30pm", appointment: "desc" },
        12: { hour: "4_00pm", appointment: "desc" },
        13: { hour: "4_30pm", appointment: "desc" },
        14: { hour: "5_00pm", appointment: "desc" },
        15: { hour: "5_30pm", appointment: "desc" },
        16: { hour: "6_00pm", appointment: "desc" },
        17: { hour: "6_30pm", appointment: "desc" },
        18: { hour: "7_00pm", appointment: "desc" },
        19: { hour: "7_30pm", appointment: "desc" },
      })
      .then(() => {
        flasher(
          "Tu cita ha sido agendada con exito, te contactaremos para confirmar",
          "success"
        );
      })
      .catch((err) => {
        flasher(
          "Algo salió mal, probablemente la hora y fecha ya fueron ocupadas",
          "error"
        );
        console.error(err);
      })
      .finally(() => {
        Nprogress.done();
        setModalOpen(false);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setRestBlock(true);
      setValues((values) => ({ ...values, service: "descanzo" }));
      setServiceDuration(1);
    } else {
      setRestBlock(false);
      setValues((values) => ({ ...values, service: "Consulta general" }));
    }
  };

  const handleSelect = (e) => {
    setRestDuration(e.target.value);
    setServiceDuration(e.target.value);
    setValues((values) => ({ ...values, service: "descanzo" }));
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        overlayClassName="appointment-confirmation-overlay"
        className="appointment-confirmation-content"
        closeTimeoutMS={200}
      >
        <h3>
          Estás seguro que deseas establecer este día como día de descanzo ?
        </h3>
        <ButtonsContainer>
          <button
            className="link-btn secunday-btn cancel"
            onClick={() => setModalOpen(false)}
          >
            Cancelar
          </button>
          <button className="link-btn primary-btn" onClick={setDayOfRest}>
            Confirmar
          </button>
        </ButtonsContainer>
      </Modal>
      <DashBoard>
        <h3>Panel de administrador: </h3>
        <div className="restForm">
          <label>
            <input type="checkbox" onChange={handleCheck} />
            Descanzo
          </label>
          {restBlock && (
            <label>
              Bloques (30mn c/u):
              <select onChange={handleSelect} value={restDuration}>
                {[...new Array(20)].map((_, i) => {
                  return (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
            </label>
          )}
        </div>
        <button
          className="link-btn primary-btn fullday-btn"
          onClick={handleClick}
        >
          Día completo de descanzo
        </button>
      </DashBoard>
    </>
  );
};

export default AdminDashboard;

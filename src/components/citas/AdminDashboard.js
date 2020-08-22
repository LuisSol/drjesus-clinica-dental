import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

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

const AdminDashboard = ({ setServiceDuration, setValues }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [restBlock, setRestBlock] = useState(false);
  const [restDuration, setRestDuration] = useState(1);

  const setDayOfRest = (e) => {
    e.preventDefault();

    setModalOpen(false);
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

import styled from 'styled-components'
import { rtdb } from '../utils/firebase'
import Nprogress from 'nprogress'
import flasher from '../utils/flasher'

const root = rtdb.ref();

const CalcelContainer = styled.div`
    .btn-container {
        text-align: right;
        margin-top: 1rem;
        button {
            display: inline-block;
            margin-left: .7rem;
            width: 3rem;
            height: 2rem;
            border-radius: 7px;
        }
        .si-btn {
            border: 1px solid #666;
            color: black;
        }
    }
`

const CancelConfirmation = ({selectedAppoinment, setModalOpen}) => {

    const processCancelation = () => {
        const updateObj = selectedAppoinment.cancelPaths.reduce((accu, item) => {
            return {...accu, [item]: null}
        }, {});
        Nprogress.start();
        root.update(updateObj)
        .then(() => flasher('La cita fue cancelada con éxito', 'success'))
        .catch((err) => {
            console.error(err);
            flasher('Algo salió mal, intentalo más tarde', 'error');
        })
        .finally(() => {
            setModalOpen(false);
            Nprogress.done();
        });
    }

    return (
        <CalcelContainer>
            Estas seguro que deseas cancelar tu cita ?
            <div className="btn-container">
                <button
                    className="link-btn primary-btn"
                    onClick={() => setModalOpen(false)}
                >No</button>
                <button
                    className="link-btn secundary-btn si-btn"
                    onClick={processCancelation}
                >Si</button>
            </div>
        </CalcelContainer>
    )
}

export default CancelConfirmation;
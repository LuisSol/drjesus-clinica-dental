import AppointmentInfoCard from './AppointmentInfoCard';

const HistoryAppointments = ({ pastAppoinments }) => {
    return (
        <div className="past">
            <h2>Historial:</h2>
            {
                pastAppoinments &&
                Object.values(pastAppoinments).map(appointment => 
                    <AppointmentInfoCard
                        key={appointment.timeStamp}
                        {...appointment}
                    />
                )
            }
        </div> 
    )
}

export default HistoryAppointments;

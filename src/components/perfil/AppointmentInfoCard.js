import styled from 'styled-components';
import moment from 'moment';

const CardContainer = styled.div`    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: .4rem;    
    span {
        margin: .7rem;
    }
    .date {
        color: #1b3891;
    }
`

const AppointmentInfoCard = ({name, timeStamp, service, children}) => {
    return (
        <CardContainer>
            <span>
                {name}
            </span>
            <span>
                {service}
            </span>
            <span className="date">
                {moment(timeStamp).format('LLLL')}hrs
            </span>              
            {
                children &&
                <span>{children}</span>
            }              
        </CardContainer>
    )
}

export default AppointmentInfoCard;

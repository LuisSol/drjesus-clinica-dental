import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { rtdb } from '../utils/firebase'
import { epochToDateField } from '../utils/dateFunctions'

const SchedulerContainer = styled.div`
    border: 1px solid #666;
    border-radius: 10px;
    margin: 2rem 0;
    width: 50%;
    overflow: hidden;
    div:last-child {
       border: 0;
    }
    
`
const TimeUnit = styled.div`
    height: 32px;
    position: relative;
    border-bottom: 1px solid #ddd;
    span {
        position: absolute;
        top: 3px;
        right: 3px;
        color: #444;
    }
    &.disabled {
        pointer-events: none;
    }
`
const TimeBlock = styled.div`
    position: absolute;
    top: 0;
    background-color: #1b3891;
    width: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fcfcfc;
`

const dayPlaceHolder = [
    {hour: '9_00am'}, {hour: '9_30am'}, {hour: '10_00am'}, {hour: '10_30am'}, {hour: '11_00am'},
    {hour: '11_30am'}, {hour: '12_00pm'}, {hour: '12_30pm'}, {hour: '1_00pm'}, {hour: '1_30pm'}, 
    {hour: '2_00pm'}, {hour: '2_30pm'}, {hour: '3_00pm'}, {hour: '3_30pm'}, {hour: '4_00pm'},
    {hour: '4_30pm'}, {hour: '5_00pm'}, {hour: '5_30pm'}, {hour: '6_00pm'}, {hour: '6_30pm'},
    {hour: '7_00pm'}, {hour: '7_30pm'},
];

const Scheduler = ({ currentDate }) => {
    const [dayAppointments, setDayAppointments] = useState(dayPlaceHolder);
    let dayRef = useMemo(() => rtdb.ref(`days/${epochToDateField(currentDate)}`), [currentDate]);

    useEffect(() => {
        dayRef.on('value', snap => {
           setDayAppointments(snap.val());
        });
        return () => {
            dayRef.off();
        }
    }, [dayRef]);

    const handleClick = (e) => {
        console.log(e.target.dataset.index);
    }

    return (
        <SchedulerContainer>
        {
            
            dayAppointments.map((time, index) =>
                <TimeUnit
                    data-index={index} 
                    key={`${time.hour}${index}`}
                    onClick={handleClick}
                    className={ time.appointment ? 'disabled' : ''}
                >                
                    <span>{time.hour.replace('_',':')}</span>
                    { 
                        time.appointment?.timeBlocks &&
                        <TimeBlock style={{height: 32*time.appointment.timeBlocks}}>
                            No disponible
                        </TimeBlock>
                    }
                </TimeUnit>
            )
        } 
        </SchedulerContainer>
    )
}

export default Scheduler;
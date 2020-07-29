import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { rtdb } from '../../utils/firebase';
import flasher from '../../utils/flasher';
import { epochToDateField, dateFieldToEpoch } from '../../utils/dateFunctions';

const SchedulerContainer = styled.div`
    border: 1px solid #666;
    border-radius: 10px;
    margin: 2rem 0;
    width: 100%;
    overflow: hidden;
    button:last-child {
       border: 0;
    }
    
`
const TimeUnit = styled.button`
    display: block;
    width: 100%;
    height: 32px;
    position: relative;
    border: 0;
    border-bottom: 1px solid #ddd;
    background-color: transparent;
    span {
        position: absolute;
        top: 3px;
        right: 3px;
        color: #444;
    }
    &:focus {
        outline-color: #1193e7;
    }
    &.disabled {
        pointer-events: none;
    }
    &:hover {
        cursor: pointer;
    }
`
const TimeBlock = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1b3891;    
    z-index: 6;
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

const msDayStart = 32400000; /* 9:00am in ms */
const msTimeBlock = 1800000; /* 30mn in ms */

const Scheduler = ({ currentDate, currentServiceDuration, errors, setSelectedHour }) => {
    const [dayAppointments, setDayAppointments] = useState(dayPlaceHolder);
    let dayRef = useMemo(() => rtdb.ref(`days/${currentDate}`), [currentDate]);
    // to disable past hours
    let isToday = useMemo(() => epochToDateField(Date.now()) === currentDate,[currentDate]);    

    useEffect(() => {
        dayRef.on('value', snap => {
           setDayAppointments(snap.val());
        });
        return () => {
            dayRef.off();
        }
    }, [dayRef]);

    const handleClick = (e) => {        
        let selectedHourIndex = parseInt(e.target.dataset.index);
        let timeSpanNeeded = parseInt(currentServiceDuration) + selectedHourIndex;
        let isPastHour = (isToday && Date.now() > (dateFieldToEpoch(currentDate) + msDayStart + (msTimeBlock * selectedHourIndex)))
        
        /* Validation for past hours */
        if (isPastHour) {
            flasher('La hora que elegiste ya pasó', 'error');
            e.preventDefault();  
            return;
        }
        /* Validate selected hour according to the seleted service */
        if (timeSpanNeeded > dayAppointments.length) {
            flasher('La hora que elegiste para tu servicio supera el horario de trabajo', 'error');
            e.preventDefault();  
            return;
        }               
        for (let i = selectedHourIndex; i < timeSpanNeeded; i++) {
            if(dayAppointments[i].appointment) {
                flasher('Tu servicio requiere de más tiempo disponible', 'error');
                e.preventDefault();
                return;
            }
        }
        // before the first validation errors.isEmpty could be undefined        
        if( errors.isEmpty && !errors.isEmpty()) {
            flasher('Revisa los datos ingresados', 'error');
            return;
        }   
        setSelectedHour({
            index: selectedHourIndex,
            hour: e.target.firstChild.innerText
        });    
    }


    return (        
        <SchedulerContainer>
        {                
            dayAppointments.map((time, index) => {                
                const timeBlocks = !time.appointment 
                                   ? null
                                   : Object.values(time.appointment)[0].timeBlocks;                

                return (
                    <TimeUnit
                        data-index={index} 
                        key={`${time.hour}${index}`}
                        onClick={handleClick}
                        className={ time.appointment ? 'disabled' : ''}
                    >           
                        <span>{time.hour.replace('_',':')}</span>
                        { 
                            timeBlocks &&
                            <TimeBlock style={{height: 32*timeBlocks}}>
                                No disponible
                            </TimeBlock>
                        }                       
                    </TimeUnit>
            )})           
        }         
        </SchedulerContainer>       
    )
}

export default Scheduler;
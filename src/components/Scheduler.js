import styled from 'styled-components'

const SchedulerContainer = styled.div`
    border: 1px solid #666;
    border-radius: 10px;
    margin: 2rem 0;
    div:last-child {
       border: 0;
    }
    width: 50%;
`
const TimeUnit = styled.div`
    height: 2rem;
    position: relative;
    border-bottom: 1px solid #ddd;
    span {
        position: absolute;
        top: 3px;
        right: 3px;
        color: #444;
    }
`

const mockDay = [
    { id: '9_00am', appoiment: null },
    { id: '9_30am', appoiment: null },
    { id: '10_00am', appoiment: null },
    { id: '10_30am', appoiment: null },
    { id: '11_00am', appoiment: null },
    { id: '11_30am', appoiment: null },
    { id: '12_00pm', appoiment: null },
    { id: '12_30pm', appoiment: null },
    { id: '1_00pm', appoiment: null },
    { id: '1_30pm', appoiment: null },
    { id: '2_00pm', appoiment: null },
    { id: '2_30pm', appoiment: null },
    { id: '3_00pm', appoiment: null },
    { id: '3_30pm', appoiment: null },
    { id: '4_00pm', appoiment: null },
    { id: '4_30pm', appoiment: null },
    { id: '5_00pm', appoiment: null },
    { id: '5_30pm', appoiment: null },
    { id: '6_00pm', appoiment: null },
    { id: '6_30pm', appoiment: null },
    { id: '7_00pm', appoiment: null },
    { id: '7_30pm', appoiment: null },
]

const Scheduler = () => {
    return (
        <SchedulerContainer>
        {
            mockDay.map(time =>
                <TimeUnit 
                    key={time.id}
                >
                    <span>{time.id.replace('_',':')}</span>
                </TimeUnit>
            )
        } 
        </SchedulerContainer>
    )
}

export default Scheduler;
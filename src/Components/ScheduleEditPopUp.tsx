import React, {DragEvent, useState} from 'react';

import "../style/ScheduleEditPopUp.css"

type ScheduleEditPopUpProps = {
    title?: string,
    startDay?: number,
    endDay?: number,
    handleAddSchedule(data: any): void
}

const ScheduleEditPopUp = (props: ScheduleEditPopUpProps) => {
    const [state, setState] = useState({
        title: '',
        startDay: 1,
        endDay: 1
    });

    const handleChange=(event: React.FormEvent<HTMLInputElement>)=>{
        setState({...state, [event.currentTarget.name] : event.currentTarget.value})
    };

    return(
        <div className="popup-wrapper">
            <div className="input-item">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={state.title} onChange={handleChange}/>
            </div>
            <div className="input-item">
                <label htmlFor="startDay">Start Day</label>
                <input type="text" id="startDay" name="startDay" value={state.startDay} onChange={handleChange}/>
            </div>
            <div className="input-item">
                <label htmlFor="endDay">End Day</label>
                <input type="text" id="endDay" name="endDay" value={state.endDay} onChange={handleChange}/>
            </div>

            <button onClick={()=>props.handleAddSchedule(state)}>Add</button>
            <button>Cancel</button>
        </div>
    )
};

export default ScheduleEditPopUp;

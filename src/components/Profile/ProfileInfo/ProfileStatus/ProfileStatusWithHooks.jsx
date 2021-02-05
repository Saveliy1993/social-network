import React, { useEffect, useState } from 'react'




const ProfileStatusWithHooks = (props) => {
    //hook все хуки начинаются с 'use'
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    //если зависимость изменится(props в массиве) запускается эта f
    useEffect(()=>{
        setStatus(props.status)
    },[props.status])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'Place for you status..'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;
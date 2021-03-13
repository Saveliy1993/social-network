import React, { ChangeEvent, useEffect, useState } from 'react'


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = ({ status, updateStatus }) => {
    //hook все хуки начинаются с 'use'
    let [editMode, setEditMode] = useState(false)
    let [newStatus, setNewStatus] = useState(status)
    //если зависимость изменится(props в массиве) запускается эта f
    useEffect(() => {
        setNewStatus(status)
    }, [status])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(event.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || 'Place for you status..'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={newStatus} />
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;
import React, {useState} from 'react';
import './adminTools.css';
import AdminToolsNavigator from "../adminToolsNavigator/AdminToolsNavigator";
import CourseTools from "../courseTools/CourseTools";
import UserTools from "../userTools/UserTools";

export default function AdminTools() {
    const [currentTool, setCurrentTool] = useState(1);

    return (
        <div className={"admin-tools"}>
            <AdminToolsNavigator setCurrentTool={setCurrentTool}/>
            {
                (currentTool === 1) ? (
                        <UserTools/>
                    )
                    :
                    (currentTool === 2) ? (
                            <CourseTools/>
                        )
                        :
                        null
            }
        </div>
    )
}
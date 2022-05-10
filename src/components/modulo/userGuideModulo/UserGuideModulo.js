import "./userGuideModulo.css";
import React, {useEffect} from 'react';

export default function UserGuideModulo({setShowModulo}){

    /**
     * Function used to close the modulo if a click outside is registered.
     * @param event click that sent the event
     */
    const handleClickOutside = (event) => {
        if (event.target.className === "user-guide-modulo-filter") {
            setShowModulo(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <div className={"user-guide-modulo-filter"}>
            <div className={"user-guide-modulo-content"}>
                <h1 className={"user-guide-temp-title"}>User guide to come</h1>
            </div>
        </div>
    )

}
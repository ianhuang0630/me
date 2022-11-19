import { useState } from 'react';

function ElevatorFloor(props) {
    const [expand, set_expand] = useState(false);
    function onClick(e) {
        props.callback();
    }
    function onHover(e) {
        set_expand(true);
    }
    function onLeave(e) {
        set_expand(false);
    }
    return (<div style={{position: "relative"}}>
        <button className={props.onFocus ? "elevator-button button-onfocus" : "elevator-button button-offfocus"} onClick={onClick} onMouseOver={onHover} onMouseLeave={onLeave}> </button> 
        <div className={expand ? "elevator-label show" : "elevator-label hide"}> {props.semantic} </div> 
        </div>
    )
}

function ElevatorLevels(props) {
    return (
        <div>
            {
            props.button2semantics.map(function (d, idx) {
                return (<ElevatorFloor semantic={d[0]} key={idx} callback={d[1]} onFocus={idx === props.focus_level}  /> );
            })  
            }
        </div>
    )
}

export default ElevatorLevels;
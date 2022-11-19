function WavingFig(props) { 
    return (<div>
        <div className="waving-message">
            { props.message }
        </div> 
        <img className="waving" src="assets/waving_smaller.png" alt="waving figure" />
    </div>)
}

export default WavingFig;
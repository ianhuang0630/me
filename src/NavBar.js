function Navbar(props) {
    const tabs = props.item2onClick.map(function (d, idx) {
            return (<a onClick={d[1]}> {d[0]} </a>);
    })
    const space_tabs = tabs.map((e, i) => {
        if (i < (tabs.length - 1))
            return [e, <span className="spacer"> | </span>];
        else
            return [e];
    }).flat();

    return <div className="infotext-dark navbar">
        <img className="web-logo" src="assets/Logo.svg" alt="logo" />
        {window.innerWidth > 600? <div className="my-name">
            Ian Huang
        </div> : null}
        <div className="section-tabs" >
            {space_tabs}
        </div>
        </div>
}
export default Navbar;
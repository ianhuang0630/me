
function IntroBlock(props) { 
    return <div className="intro-block" >
            <div>
                <img className="intro-image" src={props.img_src} alt="intro_image" />
            </div>
            <div className="intro-text">
                <div className="intro-description">
                    {props.description}
                </div>
            </div>
        </div>
 
}

export default IntroBlock;
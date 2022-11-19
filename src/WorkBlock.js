import { ProgressLabel } from "@chakra-ui/react";
import { HiAcademicCap, HiCode, HiDocumentText } from "react-icons/hi";
function WorkBlock(props) { 
    return <div className="work-block" >
            <img className="paper-image" src={props.img_src} alt="paperteaser" />
            <div className="paper-text">
                <h3 className="work-title"> {props.title} </h3>
                <h4 className="work-author"> {props.authors} </h4> 
                {props.subtext != null ? <div className="work-author" style={{marginTop:"0px", marginBottom: "15px", fontWeight: "400"}}> <i> {props.subtext}</i>  </div> : null}
                <div className="work-description">
                    {props.description}
            </div>
            <div style={{
                display: "flex", marginTop: "8px", marginBottom: "20px"}}>
                    {props.paperlink != null ?
                        <a className="work-button-color" href={props.paperlink} style={{textDecoration: "none"}}>
                            <span style={{display: "flex", marginRight: "15px"}}>
                                <span style={{ marginRight: "2px" }}> Paper </span>
                                <HiAcademicCap className="work-button" />
                            </span> 
                        </a>
                        : null} 
                    {props.webpagelink != null ?
                        <a className="work-button-color" href={props.webpagelink} style={{textDecoration: "none"}}>
                            <span style={{ display: "flex", marginRight: "15px"}}>
                                <span style={{ marginRight: "2px" }}> Webpage </span>
                                <HiDocumentText className="work-button" />
                            </span> 
                        </a>
                        : null} 
                    {props.githublink != null ?
                        <a className="work-button-color" href={props.githublink} style={{ textDecoration: "none" }}>  
                            <span style={{ display: "flex", marginRight: "15px" }}>
                                <span style={{ marginRight: "2px" }}> Code </span>
                                <HiCode className="work-button" />
                            </span>
                        </a>
                        : null}
                </div>
            </div>
        </div>
}


export default WorkBlock;
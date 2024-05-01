import { useState } from 'react';
import { ProgressLabel } from "@chakra-ui/react";
import { HiAcademicCap, HiCode, HiDocumentText, HiChevronDoubleDown, HiChevronDoubleRight, HiChevronDoubleUp} from "react-icons/hi";
import { FaTwitter } from "react-icons/fa";

function WorkBlock(props) { 
    
    const [descOpen, setDescOpen] = useState(false);
    const handleExpansionToggle = () => {
        setDescOpen(!descOpen); 
    }    


    return <div className="work-block" >
            <img className="paper-image" src={props.img_src} alt="paperteaser" />
            <div className="paper-text">
                <h3 className="work-title"> {props.title} </h3>
                <h4 className="work-author"> {props.authors} </h4> 
                {props.subtext != null ? <div className="work-author" style={{marginTop:"0px", marginBottom: "15px", fontWeight: "400"}}> <i> {props.subtext}</i>  </div> : null}

                {descOpen ?
                    <div className="work-description">
                        {props.description}
                    </div> : null
                }

                <div style={{marginBottom: "10px", marginTop: "10px"}}>
                    <span style={{ display: "flex", marginRight: "15px"}}>
                        <a className="work-button-color work-description-expand-button " onClick={handleExpansionToggle}> 
                        {
                            descOpen?
                            <HiChevronDoubleUp style={{fontSize: "10px"}}className="work-button" /> :
                            <HiChevronDoubleRight style={{fontSize: "10px"}}className="work-button" /> 
                        }
                        {
                            descOpen? 
                            <span style={{fontSize: "12px"}}> Collapse description </span>
                            :
                            <span style={{fontSize: "12px"}}> Expand description </span>
                        } 
                        </a>
                    </span>
                    
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
                    {props.tweetlink != null ?
                        <a className="work-button-color" href={props.tweetlink} style={{ textDecoration: "none" }}>  
                            <span style={{ display: "flex", marginRight: "15px" }}>
                                <span style={{ marginRight: "2px" }}> Tweet </span>
                                <FaTwitter className="work-button" />
                            </span>
                        </a> 
                        : null}
                </div>
            </div>
        </div>
}


export default WorkBlock;
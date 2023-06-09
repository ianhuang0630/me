import logo from './logo.svg';
import DeskSceneLoading from './DeskScene';
import DeskSceneImage from './DeskSceneImage';
import ElevatorLevels from './ElevatorLevels';
import WorkBlock from './WorkBlock';
import IntroBlock from './IntroBlock'
import WavingFig from './WavingFig'
import NavBar from './NavBar'
import { ChakraProvider } from '@chakra-ui/react'

import './App.css';
import { useEffect, useState, useRef } from 'react';
import { smootherstep } from 'three/src/math/MathUtils';

function App() {
  const d = new Date();
  const currentYear = d.getFullYear();
  const researchSection = useRef(null);
  const aboutSection = useRef(null);
  const contactSection = useRef(null);
  
  const [focus, set_focus] = useState(0);
  const [mobile, set_mobile] = useState(false);
  const [showWave, set_showWave] = useState(false);
  const [waveDismissed, set_waveDismissed] = useState(false);

  useEffect(() => { 
    window.addEventListener(
      'scroll',
      () => {
        if ((window.scrollY + window.innerHeight) >= contactSection.current.offsetTop) { // since this is the last section
          set_focus(3);
          set_showWave(true);
        }
        else if (window.scrollY >= researchSection.current.offsetTop) {
          set_focus(2);
          set_showWave(false);
        }
        else if (window.scrollY >= aboutSection.current.offsetTop) {
          set_focus(1);
          set_showWave(false);
        }
        else {
          set_focus(0);
          set_showWave(false);
        }
      }
    );

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      set_mobile(true);
    }else{
      // false for not mobile device
      set_mobile(false);
    }

  })


  // const requestContact = () => { 
  //   scrollToAbout(); // scroll first to the about section
  //   set_showWave(!showWave);
  // }
  
  const scrollToContact = () => { 
    window.scrollTo({
      top: contactSection.current.offsetTop,
      behavior: "smooth"
    })
  }

  const scrollToResearch = () => {
    window.scrollTo({
      top: researchSection.current.offsetTop,
      behavior: "smooth"
    });
  }

  const scrollToAbout = () => {
    window.scrollTo({
      top: aboutSection.current.offsetTop, 
      behavior: "smooth"
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function onClickWave(e) {
    set_waveDismissed(true);
  }

  return (
    <div className="full-screen" >
      <div className="elevator-levels">
        <ElevatorLevels focus_level={focus} button2semantics={[["To Top", scrollToTop], ["About", scrollToAbout], ["Research", scrollToResearch], ["Contact", scrollToContact]]} />
      </div>   
      <div className="header-chunk">
        <div className="center" > 
          <NavBar item2onClick={[["About", scrollToAbout], ["Research", scrollToResearch], ["Contact", scrollToContact]]} />
        </div> 
        <div className="header">
          <h1 className="header-style main-header"> Hi, I'm Ian </h1>
          <h2 className="header-style sub-header"> I'm a Ph.D. student at Stanford working on 3D content generation.</h2>
        </div>
      </div>

      {(showWave && !waveDismissed) ?
        <div className="character" onClick={onClickWave}>
          <WavingFig message={<p>
            Hi there! I'm building a team for a new project in scene generation. If you're interested, please reach out!
          </p>} />
        </div>
        : null
      }

      <div className="scene">
        <DeskSceneLoading orbit={!mobile} />
      </div> 
        
      <div className="about-block" ref={aboutSection} >
        <h2 className="header-style sub-header-ff"> About </h2>
        <IntroBlock img_src="assets/profile_pic.png"
          description="I'm a Ph.D. student at Stanford doing research in AI
          and machine learning, advised by Leonidas Guibas. I'm
          specifically interested in 3D content generation and
          technology that can advance the way we tell and experience
          stories. Previously, I worked as a student researcher at Meta 
          Reality Labs and studied applied math and CS in undergrad at Columbia, 
          where I worked on projects around video understanding,
          robotics and neural network interpretability." />
      </div>

      <div className="research-block" ref={researchSection} >
        <h2 className="header-style sub-header-ff"> Research </h2>
        <WorkBlock img_src="assets/pictures/paper8.png"
          title="Aladdin: Zero-Shot Hallucination of Stylized 3D Assets from Abstract Scene Descriptions"
          authors={"Ian Huang, Vrishab Krishna, Omoruyi Atekha, Leonidas Guibas"}
          paperlink="assets/papers/aladdin.pdf"
          githublink="https://github.com/ianhuang0630/Aladdin"
          subtext="Under review"
          description='What constitutes the "vibe" of a particular scene? What should one find in "a busy, dirty city street", "an idyllic countryside", or "a crime scene in an abandoned living room"? The translation from abstract scene descriptions to stylized scene elements cannot be done with any generality by extant systems trained on rigid and limited indoor datasets. In this paper, we propose to leverage the knowledge captured by foundation models to accomplish this translation. We present a system that can serve as a tool to generate stylized assets for 3D scenes described by a short phrase, without the need to enumerate the objects to be found within the scene or give instructions on their appearance. Additionally, it is robust to open-world concepts in a way that traditional methods trained on limited data are not, affording more creative freedom to the 3D artist. Our system demonstrates this using a foundation model "team" composed of a large language model, a vision-language model and several image diffusion models, which communicate using an interpretable and user-editable intermediate representation, thus allowing for more versatile and controllable stylized asset generation for 3D artists. We introduce novel metrics for this task, and show through human evaluations that in 91% of the cases, our system outputs are judged more faithful to the semantics of the input scene description than the baseline, thus highlighting the potential of this approach to radically accelerate the 3D content creation process for 3D artists.'
        />
        <WorkBlock img_src="assets/pictures/paper7.png"
          title="LADIS: Language Disentanglement for 3D Shape Editing"
          authors={ "Ian Huang, Panos Achlioptas, Tianyi Zhang, Sergey Tulyakov, Minhyuk Sung, Leonidas Guibas" }
          paperlink="https://arxiv.org/abs/2212.05011"
          githublink="https://github.com/ianhuang0630/LADIS"
          subtext="Accepted to Findings of EMNLP 2022"
          description="Natural language interaction is a promising direction for democratizing 3D shape design. However, existing methods for text-driven 3D shape editing face challenges in producing decoupled, local edits to 3D shapes. We address this problem by learning disentangled latent representations that ground language in 3D geometry. To this end, we propose a complementary tool set including a novel network architecture, a disentanglement loss, and a new editing procedure. Additionally, to measure edit locality, we define a new metric that we call part-wise edit precision. We show that our method outperforms existing SOTA methods by 20% in terms of edit locality, and up to 6.6% in terms of language reference resolution accuracy. Our work suggests that by solely disentangling language representations, downstream 3D shape editing can become more local to relevant parts, even if the model was never given explicit part-based supervision." />
        <WorkBlock img_src="assets/pictures/paper6.png"
          title="Editing 3D geometry is a challenging task requiring specialized skills. In this work we aim to facilitate the task of editing the geometry of 3D models through the use of natural language. For example, we may want to modify a 3D chair model to 'make its legs thinner', or to 'open a hole in its back'. We introduce ShapeTalk, the largest existing corpus of natural language utterances describing shape differences, covering a diverse set of specialized language descriptions describing intended shape changes, as well as shape differences at varying levels. ShapeTalk contains over half a million discriminative utterances produced by contrasting the shapes of pairs of common 3D objects for a variety of object classes and degrees of similarity. We also introduce a generic framework, ChangeIt3D, which builds on ShapeTalk and can use an arbitrary 3D generative model of shapes to produce edits that align the output better with the edit or deformation description. We introduce metrics for the quantitative evaluation of language-assisted shape editing methods that reflect key desiderata within this editing setup. We note that ShapeTalk allows methods to be trained with explicit 3D-to-language data, bypassing the necessity of lifting 2D to 3D using methods like neural rendering, as required by extant 2D image-language foundation models."
          authors={"Panos Achlioptas, Ian Huang, Minhyuk Sung, Sergey Tulyakov, Leonidas Guibas"}
          paperlink="assets/papers/shapetalk.pdf"
          webpagelink="https://changeit3d.github.io/"
          subtext="Accepted to CVPR2023"
          description="Editing 3D geometry is a challenging task requiring specialized skills. In this work, we aim to facilitate the task of editing the geometry of 3D models through the use of natural language. For example, we may want to modify a 3D chair model to “make its legs thinner” or to “open a hole in its back”. To tackle this problem in a manner that promotes open-ended language use and enables fine-grained shape edits, we introduce the most extensive existing corpus of natural language utterances describing shape differences: ShapeTalk. ShapeTalk contains over half a million discriminative utterances produced by contrasting the shapes of common 3D objects for a variety of object classes and degrees of similarity. We also introduce a generic framework, ChangeIt3D, which builds on ShapeTalk and can use an arbitrary 3D generative model of shapes to produce edits that align the output better with the edit or deformation description. Finally, we introduce metrics for the quantitative evaluation of language-assisted shape editing methods that reflect key desiderata within this editing setup. We note that ShapeTalk allows methods to be trained with explicit 3D-to-language data, bypassing the necessity of “lifting” 2D to 3D using methods like neural rendering, as required by extant 2D image-language foundation models." />
        <WorkBlock img_src="assets/pictures/paper5.png"
          title="PartGlot: Learning Shape Part Segmentation from Language Reference Games"
          authors={"Juil Koo, Ian Huang, Panos Achlioptas, Leonidas Guibas, Minhyuk Sung"}
          paperlink="https://arxiv.org/abs/2112.06390"
          webpagelink="https://mhsung.github.io/publications/partglot"
          githublink="https://github.com/63days/PartGlot"
          subtext="Accepted to CVPR 2022 (Oral)"
          description="We introduce PartGlot, a neural framework and associated architectures for learning semantic part segmentation of 3D shape geometry, based solely on part referential language. We exploit the fact that linguistic descriptions of a shape can provide priors on the shape's parts -- as natural language has evolved to reflect human perception of the compositional structure of objects, essential to their recognition and use. For training, we use the paired geometry / language data collected in the ShapeGlot work for their reference game, where a speaker creates an utterance to differentiate a target shape from two distractors and the listener has to find the target based on this utterance. Our network is designed to solve this target discrimination problem, carefully incorporating a Transformer-based attention module so that the output attention can precisely highlight the semantic part or parts described in the language. Furthermore, the network operates without any direct supervision on the 3D geometry itself. Surprisingly, we further demonstrate that the learned part information is generalizable to shape classes unseen during training. Our approach opens the possibility of learning 3D shape parts from language alone, without the need for large-scale part geometry annotations, thus facilitating annotation acquisition." />
      </div>
        
      <div className="contact-block" ref={contactSection}>
          <h2 className="header-style sub-header-ff"> Contact </h2>
          <img className="purplehat" src="assets/pulsing_purple_hat.png" alt="purple hat" />
          <div>
          If you're interested in this direction or would like to chat, please reach out to me at <br />
            <b >ianhuang[at]stanford.edu</b>!
          </div>
      </div>

      <footer> <small>&copy; Copyright {currentYear}, Ian Huang </small> </footer> 
    </div>
  );
}

export default App;

import { useState } from "react";
import "./tabs.scss";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>

      <div className="outerContainerTabs">

        {/* TABS */}
        <div className="blocs-tabs">
          
          {/* 1st Year tab */}
          <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
            1st Year
          </button>

          {/* 2nd Year tab */}
          <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
            2nd Year
          </button>

          {/* 3rd Year tab */}
          <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}> 
            3rd Year  
          </button>
        </div>

        {/* CONTENTS */}
        <div className="content-tabs">

          {/* TAB 1 box */}
          <div className={toggleState === 1 ? "content  active-content" : "content"}>
            <h2>CPD event 1</h2>
            <hr />
            <p>
              Hello World!
            </p>
          </div>

          {/* TAB 2 box*/}
          <div className={toggleState === 2 ? "content  active-content" : "content"}>
            <h2>CPD event 2</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              voluptatum qui adipisci.
            </p>
          </div>

          {/* TAB 3 box*/}
          <div className={toggleState === 3 ? "content  active-content" : "content"}>
            <h2>CPD event 3</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
              nostrum rerum laudantium totam unde adipisci incidunt modi alias!
              Accusamus in quia odit aspernatur provident et ad vel distinctio
              recusandae totam quidem repudiandae omnis veritatis nostrum
              laboriosam architecto optio rem, dignissimos voluptatum beatae
              aperiam voluptatem atque. Beatae rerum dolores sunt.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Tabs;

import React from "react";
import Attributes from "./Attributes";
import Klasses from "./Klasses";
import Skills from "./Skills";

const Character = ({ attributes, updateCharacter, skills, index }) => {
  return (
    <div key={`character-${index}`}>
      <h1 style={{ marginTop: 40 }}>Character #{index}</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Attributes
          key={`attributes-${index}`}
          attributes={attributes}
          updateCharacter={updateCharacter}
        />
        <Klasses key={`klasses-${index}`} characterAttributes={attributes} />
        <Skills
          key={`skills-${index}`}
          attributes={attributes}
          skills={skills}
          updateCharacter={updateCharacter}
        />
      </div>
    </div>
  );
};

export default Character;

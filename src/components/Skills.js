import React, { useState } from "react";
import { produce } from "immer";
import { getModifier, getRandomNumber } from "../utils/helpers";

const Skills = ({ attributes, skills, updateCharacter }) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [dc, setDc] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [result, setResult] = useState(null);

  const getTotalPoints = () => {
    const intelligence = getAttribute("Intelligence");
    return 10 + 4 * getModifier(intelligence.value);
  };

  const getPointsSpent = () => {
    return skills.reduce((total, skill) => total + skill.value, 0);
  };

  const getAttribute = (attributeName) => {
    return attributes.find((attribute) => attribute.name === attributeName);
  };

  const canIncrement = () => {
    const totalPoints = getTotalPoints();
    const pointsSpent = getPointsSpent();
    if (totalPoints > pointsSpent) {
      return true;
    } else {
      alert("You need more skill points! Upgrade intelligence to get more.");
      return false;
    }
  };

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleDcChange = (event) => {
    setDc(parseInt(event.target.value, 10));
  };

  const handleRoll = () => {
    const selectedCharacter = getCharacterWithHighestSkill();
    const totalSkill = calculateTotalSkill(selectedCharacter);

    const rolledNumber = getRandomNumber(1, 20);
    setRandomNumber(rolledNumber);

    if (totalSkill + rolledNumber >= dc) {
      setResult("Success");
    } else {
      setResult("Failure");
    }
  };

  const calculateTotalSkill = (character) => {
    if (character.skills && character.skills.length > 0) {
      const skill = character.skills.find((s) => s.name === selectedSkill);

      if (skill) {
        const attributeModifier = getAttribute(skill.attributeModifier).value;
        return skill.value + getModifier(attributeModifier);
      } else {
        console.error(
          `Skill '${selectedSkill}' not found in character's skills`
        );
        return 0;
      }
    } else {
      console.error("Character's skills are not defined or empty");
      return 0;
    }
  };

  const getCharacterWithHighestSkill = () => {
    return attributes.reduce((prev, current) =>
      calculateTotalSkill(prev) > calculateTotalSkill(current) ? prev : current
    );
  };

  const handleClick = (name, value) => {
    const updatedSkills = produce(skills, (draftSkills) => {
      const skillIndex = draftSkills.findIndex((skill) => skill.name === name);
      draftSkills[skillIndex].value = value;
    });
    updateCharacter({ skills: updatedSkills });
  };

  return (
    <div className="box">
      <h2>Skills</h2>
      <div style={{ marginBottom: 14 }}>
        Total skill points available: {getTotalPoints()}
      </div>
      <div style={{ marginBottom: 14 }}>
        Total skill points spent: {getPointsSpent()}
      </div>
      <div>
        <label htmlFor="skill">Select Skill:</label>
        <select id="skill" value={selectedSkill} onChange={handleSkillChange}>
          <option value="">Select a skill</option>
          {skills.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="dc">Enter DC:</label>
        <input type="number" id="dc" value={dc} onChange={handleDcChange} />
      </div>
      <button onClick={handleRoll}>Roll</button>
      {randomNumber !== null && (
        <div>
          <p>Random number generated: {randomNumber}</p>
          <p>Result: {result}</p>
          <p>
            Character selected: Character #
            {getCharacterWithHighestSkill().index}
          </p>
        </div>
      )}
      {skills.map(({ name, attributeModifier, value }) => {
        const attribute = getAttribute(attributeModifier);
        const modifier = getModifier(attribute.value);
        return (
          <div key={name}>
            <span>{name}</span>
            <span style={{ marginRight: 10 }}>: {value}</span>
            <span>(Modifier: {attributeModifier})</span>
            <span style={{ marginRight: 10 }}>: {modifier}</span>
            <button
              onClick={() => handleClick(name, value - 1)}
              style={{ marginRight: 2 }}
            >
              -
            </button>
            <button
              onClick={() => canIncrement() && handleClick(name, value + 1)}
              style={{ marginRight: 10 }}
            >
              +
            </button>
            <span>Total: {modifier + value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Skills;

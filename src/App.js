import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import Character from "./components/Character";
import { API_URL, ATTRIBUTE_LIST, SKILL_LIST } from "./consts";

//calculate total skill
const calculateTotalSkill = (character) => {
  return character.skills.reduce((total, skill) => total + skill.value, 0);
};

function App() {
  const [characters, updateCharacters] = useImmer([]);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDC] = useState(0);
  const [skillCheckResult, setSkillCheckResult] = useState(null);

  useEffect(() => {
    // Fetch characters from the API on component mount
    if (characters.length === 0) {
      fetch(API_URL)
        .then((response) => response.json())
        .then((response) => {
          const fetchedCharacters = response.body;
          updateCharacters((draft) => (draft = fetchedCharacters));
        })
        .catch(() => {
          alert("Something went wrong!");
        });
    }
  }, [characters, updateCharacters]);

  // handle character update
  const updateCharacter = (characterIndex, newCharacter) => {
    updateCharacters((draft) => {
      draft[characterIndex] = {
        ...draft[characterIndex],
        ...newCharacter,
      };
    });
  };

  //handle adding a new character
  const handleAddCharacter = () => {
    const newCharacter = {
      attributes: ATTRIBUTE_LIST.map((name) => ({
        name,
        value: 0,
      })),
      skills: SKILL_LIST.map((skill) => ({ ...skill, value: 0 })),
    };
    updateCharacters((draft) => {
      draft.push(newCharacter);
    });
  };

  //handle saving all characters
  const saveAllCharacters = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characters),
    })
      .then(() => {
        alert("Successfully saved the Characters");
      })
      .catch(() => {
        alert("An error occurred while saving the Characters");
      });
  };

  //handle skill check
  const handleSkillCheck = () => {
    const totalSkill = calculateTotalSkill(characters[selectedCharacterIndex]);
    // skill check logic based on totalSkill and DC
    const randomRoll = Math.floor(Math.random() * 20) + 1;
    const isSuccessful = totalSkill + randomRoll >= dc;
    setSkillCheckResult({
      randomRoll,
      isSuccessful,
      characterIndex: selectedCharacterIndex,
    });
  };
  const getSelectedCharacterName = () => {
    const selectedCharacter = characters[selectedCharacterIndex];

    // condition to Check if there is a 'name' property directly in the character
    if (selectedCharacter && selectedCharacter.name) {
      return selectedCharacter.name;
    }
    if (selectedCharacter && selectedCharacter.attributes) {
      const nameAttribute = selectedCharacter.attributes.find(
        (attr) => attr.name === "name"
      );
      if (nameAttribute) {
        return nameAttribute.value;
      }
    }

    return `Character #${selectedCharacterIndex + 1}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {characters.map((character, index) => (
          <Character
            key={index}
            index={index + 1}
            attributes={character.attributes}
            updateCharacter={(character) => updateCharacter(index, character)}
            skills={character.skills}
          />
        ))}
        <div style={{ margin: "20px 0px 100px 0px" }}>
          <button onClick={handleAddCharacter} style={{ marginRight: 20 }}>
            Add New Character
          </button>
          <button onClick={saveAllCharacters}>Save all Characters</button>
        </div>
        <select
          value={selectedCharacterIndex}
          onChange={(e) => setSelectedCharacterIndex(Number(e.target.value))}
        >
          {characters.map((character, index) => (
            <option key={index} value={index}>
              Character #{index + 1}
            </option>
          ))}
        </select>

        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={isNaN(dc) ? "" : dc}
          onChange={(e) => setDC(Number(e.target.value))}
        />

        <button onClick={handleSkillCheck}>Roll</button>
        {skillCheckResult && (
          <div>
            <p>Random Number Generated: {skillCheckResult.randomRoll}</p>
            <p>
              Skill Check Result:{" "}
              {skillCheckResult.isSuccessful ? "Success" : "Failure"}
            </p>
            <p>Character selected: {getSelectedCharacterName()}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

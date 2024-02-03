import { useState } from "react";
import { CLASS_LIST } from "../consts";
import { meetsRequirements } from "../utils/helpers";

const Klasses = ({ characterAttributes }) => {
  const [selectedKlass, setSelectedKlass] = useState(null);
  return (
    <>
      <div className="box">
        <h2>Classes</h2>
        {Object.keys(CLASS_LIST).map((name) => (
          <div
            key={name}
            onClick={() =>
              setSelectedKlass({
                name,
                minimumRequirements: CLASS_LIST[name],
              })
            }
            className="klass-item"
            style={{
              color: meetsRequirements(characterAttributes, CLASS_LIST[name])
                ? "red"
                : "",
            }}
          >
            {name}
          </div>
        ))}
      </div>
      {selectedKlass && (
        <div className="box">
          <h2>{selectedKlass.name} Minimum Requirements</h2>
          <div>
            {Object.keys(selectedKlass.minimumRequirements).map((skill) => (
              <div key={skill}>
                <span style={{ marginRight: 10 }}>{skill}:</span>
                <span>{selectedKlass.minimumRequirements[skill]}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedKlass(null)}
            style={{ marginTop: 20 }}
          >
            Close Requirement View
          </button>
        </div>
      )}
    </>
  );
};

export default Klasses;

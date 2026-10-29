import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import './cssfiles/commoncomponents.css';
import { stringToColour } from './Functions';
import { genres } from './mockdata/Genres';


function TagComponent({name, removableCallback = undefined}) {
    let removeButton = <></>;
    if (removableCallback) {
      // If in an editable list, add a button to remove this tag
      removeButton = (
        <button class="iconButton" onClick={() => removableCallback(name)}>
          <img class="iconButtonImg" width="12" height="12" src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="x"></img>
        </button>
      );
    }
    return (
      <span class="tag" style={{backgroundColor: stringToColour(name)}}>{name}{removeButton}</span>
    );
}


function TagList({names, editableCallback = undefined, creatable = false}) {
  const [unselectedNames, setUnselectedNames] = useState(genres.filter(x => !names.includes(x)).map(x => ({label: x, value: x})));
  const [selectedName, setSelectedName] = useState(null);
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    left: "0px",
    top: "0px"
  });
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIsVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  let removableCallback = undefined;
  let addButton = <></>;
  if (editableCallback) {
    // If list is editable, make function to remove individual tags
    removableCallback = function(name) {
      const updatedNames = names.filter(x => x !== name);
      editableCallback(updatedNames);
      unselectedNames.push({label: name, value: name});
      setUnselectedNames(unselectedNames);
    };
    // Create button to search and add a tag
    const addCallback = function(event) {
      const newPosition = {};
      const targetX = event.pageX;
      if (targetX < document.documentElement.scrollWidth*0.75) {
        newPosition.left = `${targetX}px`;
      } else {
        newPosition.right = `${document.documentElement.scrollWidth-targetX}px`;
      }
      const targetY = event.pageY;
      if (targetY < document.documentElement.scrollHeight*0.75) {
        newPosition.top = `${targetY}px`;
      } else {
        newPosition.bottom = `${document.documentElement.scrollHeight-targetY}px`;
      }
      setDropdownPosition(newPosition);
      setDropdownIsVisible(true);
    };
    addButton = (
      <div>
        <button class="iconButton" onClick={addCallback}>
          <img class="iconButtonImg" width="24" height="24" src="https://img.icons8.com/material-rounded/24/plus-2-math--v1.png" alt="add tag"/>
        </button>
        {dropdownIsVisible && ReactDOM.createPortal(
          <div class="tagAddDropdown" style={dropdownPosition} ref={dropdownRef}>
            <div>
              <Select options={unselectedNames} value={selectedName} onChange={setSelectedName} />
            </div>
            <button class="iconButton" onClick={() => {
              if (selectedName) {
                const index = unselectedNames.find(x => x.value === selectedName.value);
                if (index !== -1) {
                  unselectedNames.splice(index, 1);
                  names.push(selectedName.value);
                  editableCallback(names);
                  setUnselectedNames(unselectedNames);
                }
              }
              setDropdownIsVisible(false);
              setSelectedName(null);
            }}>
              <img class="iconButtonImg" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/plus-math.png" alt="add selected"/>
            </button>
          </div>, document.body
        )}
      </div>
    );
  }
  return (
    <div class="tagBag">
      {names.map((name) => (
        <TagComponent name={name} removableCallback={removableCallback} />
      ))}
      {addButton}
    </div>
  );
}


export { TagList }
import './App.css'
import { SetStateAction, useState } from 'react';

function App() {
  const [color, setColor] = useState('#ffffff');
  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setColor(e.target.value);
  };

  const onClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      }
    })
  };

  return (
    <>
      <h1 className='title'>Background Color Setter</h1>
      <label className='label' htmlFor="color">{color.toUpperCase()}</label>
      <form className="form">
        <input className='input' type="color" value={color} onChange={onChange} />
        <button className='button' onClick={onClick}>
          Set Color
        </button>
      </form>
    </>
  )
}

export default App

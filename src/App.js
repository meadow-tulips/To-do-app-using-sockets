import React, { useState, useEffect, useCallback, useRef } from 'react';
import WorkDescription from './components/description'
import SocketClient from './socketClient'
import './App.css';

function App() {

  const SocketInstance = useRef(null);
  const [val, updateVal] = useState('');
  const [work, updateWork] = useState([]);

  const onUpdateFromServer = ((data) => {
    updateWork(data);
  })


  useEffect(() => {
    const socketClientInstance = new SocketClient();
    socketClientInstance.connectClient({ onUpdateFromServer });
    SocketInstance.current = socketClientInstance;
  }, []);

  const handleKeyPress = (e) => {
    if(e.charCode === 13) {
      if(val) {
        SocketInstance.current.add(val);
        // updateWork([...work, { text: val, selected: false, id: new Date().toISOString() }]);
        updateVal('');
      }
    }
  }

  const handleSelected = (index) => {
    SocketInstance.current.select(index);
    // updateWork([...work.slice(0, index), {...work[index], selected: !work[index].selected}, ...work.slice(index + 1, work.length)]);
  }

  const handleDelete = (id) => {
    SocketInstance.current.delete(id)
    // updateWork(work.filter((item, ind) =>  ind !== index));
  }

  console.log(work, 'Outside Work');
  return (
    <div className="App">
    <input value={val} onChange={e => updateVal(e.target.value)} onKeyPress={handleKeyPress} className="add-work" type="text" placeholder="What needs to be done?" />
    {work.map((work, index) => <WorkDescription selected={work.selected} handleClick={() => handleSelected(index)} handleDelete={() => handleDelete(work.id)} key={work.id}>{work.text}</WorkDescription>)}
    </div>
  );
}

export default App;

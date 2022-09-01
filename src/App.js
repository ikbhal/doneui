
import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  var [isLoading, setLoading] = useState(true);
  var [id, setId] = useState(-1);
  var [name, setName] = useState('Jigs Store');
  var [isDone, setDone] = useState(false);

  useEffect(()=>{
    axios({
      // Endpoint to send files
      url: "http://localhost:8000/items/1",
      method: "GET",
    })
      // Handle the response from backend here
    .then((res) => {

        console.log(res);
        console.log("res.data", res.data);
        var item = res.data;
        setId(item.id);
        setName(item.name);
        setDone(item.isDone);
        setLoading(false);
    })
    // Catch errors if any
    .catch((err) => {
        console.error(err);
    });
  },
  []);
  var toggleDone = (e)=>{
    console.log("toggle done");
    setDone(!isDone);
    axios({

      // Endpoint to send files
      url: "http://localhost:8000/items/1/toggledone",
      method: "PUT",
    })
      // Handle the response from backend here
      .then((res) => { console.log(res)})
      // Catch errors if any
      .catch((err) => { console.error(err)});
  }
  return (
    <div className="App">
      <h1>Done</h1>
      {isLoading ? '<p>Loading ..<.p>':
        <div className="item">
          {/* Id: {id} <br/>  */}
          <input type="checkbox" checked={isDone}
            onChange = {toggleDone}
            />
          {name} <br/>
        </div>
      }
    </div>
  );
}

export default App;

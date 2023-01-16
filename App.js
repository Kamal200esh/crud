
import './App.css';
import { useEffect,useState } from 'react'
import Axios from "axios"

function App() {
  const [users,setUsers] = useState([]);
  const [name,setName] = useState("");
  const [des,setDes] = useState("");
  const [sal,setSal] = useState("");
  useEffect( () => {
    loadData();
  },[]);
  const loadData = async () => {
    const response = await Axios.get("http://localhost:3003/user");
    console.log(response.data);
    setUsers(response.data)

  }

const AddUser = (e) => {

  e.preventDefault()
  Axios.post('http://localhost:3003/user',{
    name,des,sal
  }).then(() => {
    setName("");setDes("");setSal("")
  }
   ).catch((err)=>{
      console.log(err); 
   } )

   setTimeout(() => {
    loadData();
   },500)
}

  const deleteUser = (name) => {

    Axios.delete('http://localhost:3003/user/${name}');

    setTimeout(() => {
      loadData()
    },500)

  }

  return (
    <div className="App">
      <label htmlFor="">Name</label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <label htmlFor="">Designation</label>
      <input value={des} onChange={e => setDes(e.target.value)} />
      <label htmlFor="">Salary</label>
      <input value={sal} onChange={e => setSal(e.target.value)} />
      <button onClick={AddUser}>Save</button>

      {users.map( e => (
        <div key={e.name} className="box">
          <div className='box-1'>
          {e.name} {e.des} {e.sal} <button onClick={() => {deleteUser(e.name)} }>Delete</button>
          </div>
        </div>

      ) 

      )}
    </div>
  );
}

export default App;

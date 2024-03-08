import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);
  console.log(data)
  useEffect(() => {
    let isMounted = true;

    axios
      .get("http://localhost:3001/api/todos")
      .then((response) => {
        if (isMounted) {
          setdata(response.data);
        }
      })
      .catch((error) => console.error("error", error));
    const newtodo = "helloew";
   
    // addtodo(newtodo)
    return () => {
      isMounted = false;
    };
  }, []);

  const addtodo = (newtodo) => {
    axios
      .post("http://localhost:3001/api/todos", { text: newtodo, done: false })
      .then((Response) => {
        console.log(Response.data)
        setdata(Response.data)

      })
      // .then(Response=>setdata([...data,Response.data]))
      .catch((error) => console.error("Error adding todo:", error));
  };
  const deletetodo = (id) => {
    axios
      .delete(`http://localhost:3001/api/todos/${id}`)
      .then((Response) => setdata(Response.data))
      // .then(()=>setdata(todos=>todos?.filter(todo=>todo.id!==id)))
      .catch((error) => console.error("error deleting todo:", error));
  };
  // deletetodo(id);
  const updatedtext = "hit1re";

  const updatetodo = (id) => {
    axios
      .put(`http://localhost:3001/api/todos/${id}`, { text: updatedtext })
      .then((response) => {
        const updatedtodo = data?.map((todo) =>
          todo.id === id ? { ...todo, text: updatedtext } : todo
        );
        setdata(updatedtodo);
      })
      .catch((error) => console.error("error updating todo:", error));
  };
  // updatetodo()
  // if(data.length===0)return
  return (
    <div className="">
      tod
      <button onClick={()=>addtodo("huiuio")}>addtodo</button>
      {data?.map((data) => {
        return (
         <>
          <div key={data.id} className="">
            {data.text}
            {data.id}
          </div>
          <div className="">
          <button onClick={()=>deletetodo(data.id)}>Delete</button>
        </div>
         </>
        );
      })}
      
    </div>
  );
}

export default App;

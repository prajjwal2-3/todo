import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setinput] = useState("");
  const handleinput = (e) => {
    setinput(e.target.value);
  };
  const handleadding = () => {
    addtodo(input);
    setinput("");
  };
  const [update, setupdate] = useState("");
  const handleinput2 = (e) => {
    setupdate(e.target.value);
  };
  const handleupdate = (prop) => {
    updatetodo(prop, update);
    setupdate("");
  };
  const [data, setdata] = useState([]);
  // console.log(data)
  useEffect(() => {
    let isMounted = true;

    axios
      .get("https://todo-server-two-phi.vercel.app/api/todos")
      .then((response) => {
        if (isMounted) {
          setdata(response.data);
        }
      })
      .catch((error) => console.error("error", error));

    return () => {
      isMounted = false;
    };
  }, []);

  const addtodo = (newtodo) => {
    axios
      .post("https://todo-server-two-phi.vercel.app/api/todos", { text: newtodo, done: false })
      .then((Response) => {
        setdata(Response.data);
      })

      .catch((error) => console.error("Error adding todo:", error));
  };
  const deletetodo = (id) => {
    axios
      .delete(`https://todo-server-two-phi.vercel.app/api/todos/${id}`)
      .then((Response) => {
        setdata(Response.data);
      })

      .catch((error) => console.error("error deleting todo:", error));
  };

  const updatedtext = "updated";

  const updatetodo = (id, update) => {
    axios
      .put(`https://todo-server-two-phi.vercel.app/api/todos/${id}`, { id: id, text: update })
      .then((response) => {
        {
          console.log(response.data);
          setdata(response.data);
        }
      })
      .catch((error) => console.error("error updating todo:", error));
  };

  return (
    <div className="bg-[#070F2B] ">
      <div className="  flex justify-center sm:p-20 p-12">
        <div className="flex flex-col h-screen overflow-auto  sm:w-6/12 items-center bg-[#1B1A55] rounded-lg">
          <div className="font-bold text-4xl text-center text-[#9290C3]">
            TODO APP
          </div>

          <div className="flex sm:flex-wrap sm:flex-row flex-col text-black font-semibold ">
            {data?.map((data) => {
              return (
                <div className="bg-[#535C91] m-2 p-2 rounded-xl shadow-md">
                  <div key={data.id} className="">
                    {data.id}) - {data.text}
                  </div>

                  <div className="flex my-2">
                    <input
                      type="text"
                      className="rounded-l-lg shadow-md w-6/12"
                      onChange={handleinput2}
                    />
                    <div className="">
                      <button
                        className="bg-indigo-700/60 rounded-r-lg p-1 "
                        onClick={() => handleupdate(data.id)}
                      >
                        update
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <button onClick={() => deletetodo(data.id)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="shadow-lg m-2">
            {" "}
            <input
              type="text"
              className="bg-white shadow-md rounded-l-lg p-1"
              value={input}
              onChange={handleinput}
            />
            <button
              className="bg-[#9290C3] rounded-r-lg p-1"
              onClick={() => handleadding()}
            >
              addtodo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

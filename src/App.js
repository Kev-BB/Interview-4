import React, { useContext, createContext, useEffect, useState } from "react";

const userContext = createContext();

function App() {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true,
  });

  // KODUNUZ BURAYA GELECEK
  useEffect(() => {
    const interval = setInterval(() => {
      setUserState((prevState) => {
        const randomUser =
          Object.keys(prevState)[
            Math.floor(Math.random() * Object.keys(prevState).length)
          ];
        return { ...prevState, [randomUser]: !prevState[randomUser] };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [userState]);
  return (
    <userContext.Provider value={{ userState, setUserState }}>
      <UserList />
    </userContext.Provider>
  );
}

const UserList = () => {
  const { userState } = useContext(userContext);

  return (
    <div className="flex justify-center">
      <div className="container flex items-center flex-col border-solid border-gray-900 border-2 p-8 mt-32">
        <h1 className="font-bold">Users:</h1>
        {Object.entries(userState).map(([username, isOnline]) => (
          <div key={username}>
            {username} {isOnline ? "🟢" : "🔴"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

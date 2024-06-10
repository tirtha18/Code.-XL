import { useState } from "react";
import Sheets from "./components/Sheets";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-row bg-black h-screen">
      <div className="w-1/6">
        <Navbar />
      </div>
      <div className=" flex flex-col w-5/6 max-h-full h-screen">
        <Header></Header>
        <Sheets />
      </div>
    </div>
  );
}
export default App;

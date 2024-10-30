import { React, useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import OverlayAvatarUploadCard from "../ui/reusables/AvatarUploadCard";
import { AuthContext } from "../context/AuthContextProvider";
import User_img from "../../images/User_img.png";
import { navContext } from "../context/NavContextProvider";
import { FaEdit, FaUser, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { AvatarContext } from "../context/AvatarContext";
import techQuotesData from "../../../dummy_dbs/techQuotes.json";
const quotes = techQuotesData.techQuotes;
export default function Header() {
  const { changeActiveNav } = useContext(navContext);
  const { user, logout } = useContext(AuthContext);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [loading, setLoading] = useState(false);
  const { avatar, updateAvatar } = useContext(AvatarContext);
  const getUser = async () => {
    try {
      if (!user) return console.log("User ID not available");
      const user_id = user._id;
      setUserid(user_id);
      setLoading(true);
      const response = await axios.get(
        "https://code-xl.onrender.com/api/getUser",
        {
          params: { user_id: user_id },
        }
      );
      updateAvatar(response.data.avatar);
      console.log(response.data.avatar);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [user]);

  const showQuote = () => {
    setQuoteIndex(Math.floor(Math.random() * 50));
  };
  useEffect(() => {
    showQuote();
  }, []);
  return (
    <div className="w-full">
      <div className="fixed-header h-[64px] flex shadow-sm shadow-gray-700 flex-row items-center  z-10 w-full ">
        <div className=" hidden lg:flex justify-center py-1 w-4/5 border border-zinc-700 text-sm text-center rounded-3xl text-blue-200 ml-auto bg-zinc-900 ">
          {quotes[quoteIndex]["quote"]}
          {" " + quotes[quoteIndex]["author"]}
        </div>
        <div className="text-white font-semibold text-3xl md:hidden w-full z-10 justify-center items-center absolute flex font-heading sm:relative">
          <h1>Code.XL</h1>
        </div>
        <div className="ml-auto flex flex-row">
          {!user ? (
            <Link to={"/login"}>
              <button className="text-black px-4 py-2 bg-white rounded-lg ml-auto mr-5 hover:cursor-pointer hover:scale-105 space-x-1 flex flex-row items-center duration-200 hover:bg-green-500 hover:text-white">
                <div className="flex flex-row items-center">
                  <div>Login |</div>
                  <MdOutlineLogin size={20} />
                </div>
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button">
                <div className="text-white mr-6 hover:cursor-pointer  border-green-600 ring-primary ring-offset-base-100 w-14 h-14 rounded-full border-[3.5px] overflow-hidden flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    src={avatar}
                    alt={User_img}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="border border-zinc-600 mt-2 mr-4 text-md text-green-500 bg-zinc-800 dropdown-content menu rounded-box z-[1] w-36 p-2 shadow"
              >
                <li>
                  <a
                    onClick={() => setIsVisible(true)}
                    className="flex items-center hover:bg-zinc-700"
                  >
                    <FaEdit className="mr-4" /> Edit
                  </a>
                </li>
                <li
                  onClick={() => {
                    changeActiveNav(1);
                    navigate("/dashboard");
                  }}
                >
                  <a className="flex items-center hover:bg-zinc-700">
                    <FaUser className="mr-4" /> Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={logout}
                    className="flex items-center hover:bg-zinc-700"
                  >
                    <FaSignOutAlt className="mr-4" /> Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <OverlayAvatarUploadCard
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        user_id={userid}
        getUser={getUser}
      />
    </div>
  );
}

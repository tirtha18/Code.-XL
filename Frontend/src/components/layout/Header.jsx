import { React, useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContextProvider";
import User_img from "../../images/User_img.png";
import { navContext } from "../context/NavContextProvider";

export default function Header() {
  const { changeActiveNav } = useContext(navContext);
  const { user, token } = useContext(AuthContext);
  const [quote, setQuote] = useState('');
  const techQuotes = [
    "Technology is best when it brings people together. - Matt Mullenweg",
    "The science of today is the technology of tomorrow. - Edward Teller",
    "It has become appallingly obvious that our technology has exceeded our humanity. - Albert Einstein",
    "Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke",
    "The real problem is not whether machines think but whether men do. - B.F. Skinner",
    "Technology like art is a soaring exercise of the human imagination. - Daniel Bell",
    "The great myth of our times is that technology is communication. - Libby Larsen",
    "The human spirit must prevail over technology. - Albert Einstein",
    "Technology is nothing. What’s important is that you have faith in people. - Steve Jobs",
    "It's not a faith in technology. It's faith in people. - Steve Jobs",
    "We are stuck with technology when what we really want is just stuff that works. - Douglas Adams",
    "The real danger is not that computers will begin to think like men, but that men will begin to think like computers. - Sydney Harris",
    "Technology should improve your life, not become your life. - Billy Cox",
    "Just because something doesn’t do what you planned it to do doesn’t mean it’s useless. - Thomas Edison",
    "Innovation is the outcome of a habit, not a random act. - Sukant Ratnakar",
    "Technology over technique produces emotionless design. - Daniel Mall",
    "Computers are useless. They can only give you answers. - Pablo Picasso",
    "Everybody gets so much information all day long that they lose their common sense. - Gertrude Stein",
    "The most technologically efficient machine that man has ever invented is the book. - Northrop Frye",
    "The purpose of technology is not to confuse the brain but to serve the body. - William S. Burroughs",
    "Technology feeds on itself. Technology makes more technology possible. - Alvin Toffler",
    "The art challenges the technology, and the technology inspires the art. - John Lasseter",
    "Technology will never replace great teachers, but technology in the hands of great teachers is transformational. - George Couros",
    "Technology is a useful servant but a dangerous master. - Christian Lous Lange",
    "It’s not that we use technology, we live technology. - Godfrey Reggio",
    "Technology is the campfire around which we tell our stories. - Laurie Anderson",
    "The greatest achievement of humanity is not its works of art, science, or technology, but the recognition of its own dysfunction. - Eckhart Tolle",
    "Our technology forces us to live mythically. - Marshall McLuhan",
    "Technological progress has merely provided us with more efficient means for going backwards. - Aldous Huxley",
    "We are changing the world with technology. - Bill Gates",
    "The Internet is becoming the town square for the global village of tomorrow. - Bill Gates",
    "The advance of technology is based on making it fit in so that you don’t really even notice it, so it’s part of everyday life. - Bill Gates",
    "The new information technology… Internet and e-mail… have practically eliminated the physical costs of communications. - Peter Drucker",
    "If you think technology can solve your security problems, then you don’t understand the problems and you don’t understand the technology. - Bruce Schneier",
    "The advance of technology is based on making it fit in so that you don’t really even notice it. - Bill Gates",
    "We are continually faced with great opportunities which are brilliantly disguised as unsolvable problems. - Margaret Mead",
    "The real question is, when will we draft an artificial intelligence bill of rights? What will that consist of? And who will get to decide that? - Gray Scott",
    "AI is likely to be either the best or worst thing to happen to humanity. - Stephen Hawking",
    "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim. - Edsger Dijkstra",
    "The great thing about technology is that it can help us become more human again. - Simon Mainwaring",
    "We’re still in the first minutes of the first day of the Internet revolution. - Scott Cook",
    "The real revolution is not AI, but how we choose to use it. - Jean-Philippe Desbiolles",
    "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
    "Innovation is the calling card of the future. - Anna Eshoo",
    "The true sign of intelligence is not knowledge but imagination. - Albert Einstein",
    "Don’t compare yourself to others. Compare yourself to the person you were yesterday. - Anonymous",
    "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job. - Mosher’s Law of Software Engineering",
    "First we build the tools, then they build us. - Marshall McLuhan",
    "In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks. - Mark Zuckerberg",
    "Technology is a word that describes something that doesn’t work yet. - Douglas Adams"
];

  const showQuote = () => {
    setQuote(techQuotes[Math.floor(Math.random()*50)]);
  }
  useEffect(() => {
    showQuote();
  },[]);
  return (
    <div className="fixed-header min-h-[64px] flex shadow-sm shadow-gray-700 flex-row items-center  z-10 w-full">
      <div className=" hidden lg:flex justify-center py-1 w-4/5 border border-zinc-700 text-sm text-center rounded-3xl text-blue-200 ml-auto bg-zinc-900 ">
      {quote}
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
          <Link
            onClick={() => {
              changeActiveNav(1);
            }}
            to={"/dashboard"}
          >
            <div className=" text-white mr-6 hover:cursor-pointer border border-zinc-600 ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
              <img width="50" height="50" src={User_img} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

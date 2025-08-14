import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { LogOut, PlusCircle, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const iconHover = {
    rotate: 10,
    transition: { duration: 0.3 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-gradient-to-r from-gray-800 to-gray-900 py-4 px-4 md:px-6 flex justify-between items-center shadow-lg"
    >
      <Link to="/" className="flex items-center">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          MY PROMPT
        </motion.span>
      </Link>

      <div className="flex items-center space-x-2 md:space-x-4">
        {currentUser ? (
          <>
            <motion.div whileHover={buttonHover}>
              <Link
                to="/create"
                className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-all duration-300 shadow-md"
              >
                <PlusCircle className="mr-1 md:mr-2" size={18} />
                <span className="text-sm md:text-base">Create Post</span>
              </Link>
            </motion.div>

            <div
              className="flex items-center space-x-2 ml-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.span
                animate={{
                  x: isHovered ? -5 : 0,
                  color: isHovered ? "#ffffff" : "#d1d5db",
                }}
                className="hidden md:block text-gray-300 font-medium"
              >
                {currentUser.username}
              </motion.span>

              <motion.button
                onClick={logout}
                whileHover={iconHover}
                className="p-1 md:p-2 text-gray-300 hover:text-white transition-colors"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div whileHover={buttonHover}>
            <Link
              to="/signin"
              className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-all duration-300 shadow-md"
            >
              <LogIn className="mr-1 md:mr-2" size={18} />
              <span className="text-sm md:text-base">Sign In</span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

import type { Dispatch, SetStateAction } from "react";
import logo from "@/assets/Logo - Teddy.svg";
import { ArrowLeft, Home, UserRound, UserRoundCheck } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onSetIsOpen: Dispatch<SetStateAction<boolean>>;
  currentPath: string;
}

const Sidebar = ({ isOpen, currentPath, onSetIsOpen }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Dark Overlay for when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => onSetIsOpen(false)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: "-100%", opacity: 0 }}
            animate={isOpen ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 h-screen w-3xs bg-white shadow-xl  rounded-r-lg"
          >
            <div className="flex flex-col items-center">
              {/* Sidebar Header */}
              <div className="relative flex w-full justify-center py-10 bg-slate-600 rounded-tr-lg">
                <img src={logo} alt="Logo Teddy - Open Finance" />
                <button
                  onClick={() => onSetIsOpen(false)}
                  className="absolute -right-4 -bottom-5 rounded-full p-3 bg-black hover:cursor-pointer"
                >
                  <div className="rounded-full border bg-white">
                    <ArrowLeft size={12} />
                  </div>
                </button>
              </div>

              {/* Sidebar Routes */}
              <div className="flex flex-col w-full py-8 space-y-5">
                <button
                  onClick={() => navigate("/")}
                  className="flex gap-2.5 pl-8 items-start hover:cursor-pointer"
                >
                  <Home />
                  <span>Home</span>
                </button>
                <button
                  className={`flex gap-2.5 pl-8 items-start hover:cursor-pointer ${
                    currentPath === "/clientes" &&
                    "text-orange-color border-r-2 border-orange-color"
                  }`}
                >
                  <UserRound />
                  <span>Clietes</span>
                </button>
                <button
                  onClick={() => navigate("/clientes-selecionados")}
                  className={`flex gap-2.5 pl-8 items-start hover:cursor-pointer ${
                    currentPath === "/clientes-selecionados" &&
                    "text-orange-color border-r-2 border-orange-color"
                  }`}
                >
                  <UserRoundCheck />
                  <span>Clientes selecionados</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Insert Botpress widget script here, themed for dark mode
    // Example:
    // window.botpressWebChat.init({ ...darkThemeOptions });
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botpress widget will appear here */}
    </div>
  );
};

export default Chatbot;

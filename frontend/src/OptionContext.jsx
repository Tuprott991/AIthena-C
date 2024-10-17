import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const OptionContext = createContext();
export const OptionProvider = ({ children }) => {
 const [data, setData] = useState();
 const [added, setAdded] = useState([]);
 const [selectedOption, setSelectedOption] = useState("CLIP");
 const [isKeywords, setIsKeywords] = useState(false);
 const [keywords, setKeywords] = useState("");
 const [isCQ, setIsCQ] = useState(false);
 const [loading, setLoading] = useState(false);
 const [range, setRange] = useState(100);
 const [iframe, setIframe] = useState(null);
 const [footer, setFooter] = useState();
 const [sessionId, setSessionId] = useState();
 useEffect(() => {
  const fecthSessionId = async () => {
   const response = await axios.get("http://localhost:5001/getsessionId");
   if (response) {
    setSessionId(response.data);
   }
  };
  fecthSessionId();
 }, []);
 const handleOptionChange = (value) => {
  if (value === "CLIP + OCR" || value === "CLIP + ASR") {
   setIsKeywords(true);
  } else {
   setIsKeywords(false);
  }
  setSelectedOption(value);
 };
 const handleKeywordChange = (value) => {
  setKeywords(value);
 };
 const handleDataChange = (value) => {
  setData(value);
 };
 const handleCQChange = (value) => {
  setIsCQ(value);
 };
 const handleLoading = (value) => {
  setLoading(value);
 };
 const handleRange = (value) => {
  setRange(value);
 };
 return (
  <OptionContext.Provider
   value={{
    data,
    added,
    sessionId,
    setSessionId,
    setData,
    setAdded,
    footer,
    setFooter,
    selectedOption,
    isKeywords,
    keywords,
    loading,
    isCQ,
    range,
    iframe,
    setIframe,
    handleCQChange,
    handleOptionChange,
    handleKeywordChange,
    handleDataChange,
    handleLoading,
    handleRange,
   }}
  >
   {children}
  </OptionContext.Provider>
 );
};

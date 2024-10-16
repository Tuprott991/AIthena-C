import { useContext } from "react";
import { OptionContext } from "../OptionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = () => {
 const { footer, setIframe, setFooter } = useContext(OptionContext);
 const navigate = useNavigate();
 const handleIR = async (id) => {
  navigate(`/imgsearch?imgid=${id}`);
 };
 const handleYT = async (path) => {
  const response = await axios.get(
   `http://localhost:5001/submit_item?path=${path}`
  );
  console.log("path", response.data);
  setIframe(response.data);
 };
 const handleC = async (path) => {
  const response = await axios.get(
   `http://localhost:5001/get_Answer?path=${path}`
  );
  console.log("C", response.data);
 };
 const handleOnClick = async (index) => {
  const response = await axios.get(
   `http://localhost:5001/getneighbor?imgid=${index}`
  );
  if (response) {
   setFooter(response.data.pagefile);
  }
 };
 console.log("footer", footer);

 return (
  <div className="fixed  left-[20%] w-full right-0 overflow-y-scroll  bottom-0 h-[20%] bg-white px-2">
   {footer &&
    footer.map((item, index) => (
     <div key={index} className="h-full w-[200px] ">
      <img
       className="rounded h-full w-[400px]"
       src={item.imgpath}
       alt="image description"
       onClick={() => handleOnClick(index)}
      />
      <button
       className="font-bold absolute text-sm text-center 
                rounded-sm top-1 left-1 px-2 py-[1px]
                text-white bg-emerald-500 border-none focus:outline-none 
                hover:bg-emerald-800 hover:ring-2 hover:ring-emerald-800"
      >
       <span>+</span>
      </button>
      <div className="invisible absolute bottom-[3px] flex items-center justify-center w-full gap-3 text-white">
       <button
        className="font-medium group-hover:visible text-sm rounded-sm
                  px-2 py-[2px] text-white bg-emerald-500 border-none focus:outline-none 
                  hover:bg-emerald-800 hover:ring-2 hover:ring-emerald-800"
        onClick={() => handleIR(item.id)}
       >
        IR
       </button>
       <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="font-medium group-hover:visible text-sm rounded-sm
                  px-2 py-[2px] text-white bg-emerald-500 border-none focus:outline-none 
                  hover:bg-emerald-800 hover:ring-2 hover:ring-emerald-800"
        onClick={() => handleYT(item.imgpath)}
       >
        YT
       </button>
       <button
        className="font-medium right-0 group-hover:visible text-sm rounded-sm
                  px-2 py-[2px] text-white bg-emerald-500 border-none focus:outline-none 
                  hover:bg-emerald-800 hover:ring-2 hover:ring-emerald-800"
        onClick={() => handleC(item.imgpath)}
       >
        C
       </button>
      </div>
     </div>
    ))}
  </div>
 );
};

export default Footer;

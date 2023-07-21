import { doc } from "firebase/firestore";
import sendMessage from "../../../Util/SendMessage";

function FileUploadMenu({ from, to }) {
    const handleFIleUpload = () => {
      // convert file to blob 64
      // send blob to server
      // server will save blob to cloudinary
      // server will return url of the file
      // save url to database
      const file = document.getElementById('fileUpload').files[0];
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(base64String.split(',')[1]);
        sendMessage({
          message: base64String,
          fromId: from,
          toId: to,
          type: "image"
        });
        document.getElementById('fileUpload').value = '';
        document.getElementById('fileUploadScreen').style.display = 'none';
      }
    }
  
    return (
      <section className="flex flex-col p-3 bg-white" style={{
        maxWidth: '250px',
        position: 'absolute',
        bottom: '180px',
        display: 'none'
      }} id="fileUploadScreen">
        <input type="text" className="bg-gray-100 p-2 rounded hidden" id="from" value={from}/>
        <input type="text" className="bg-gray-100 p-2 rounded hidden" id="to" value={to}/>
        <input type="file" id="fileUpload" className="bg-gray-100 p-2 rounded"/>
        <select className="bg-gray-100 p-2 rounded mt-2">
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="document">Document</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={
          handleFIleUpload
        }>
          send
          <i className="fas fa-paper-plane ms-2"></i>
        </button>
  
        
      </section>
    )
}

export default FileUploadMenu;

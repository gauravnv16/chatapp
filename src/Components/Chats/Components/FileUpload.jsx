import sendMessage from "../../../Util/SendMessage";
import PropTypes from 'prop-types';

function FileUploadMenu({ from, to }) {
  const handleFIleUpload = () => {
    const file = document.getElementById("fileUpload").files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64String.split(",")[1]);
      sendMessage({
        message: base64String,
        fromId: from,
        toId: to,
        type: "image",
      });
      document.getElementById("fileUpload").value = "";
      document.getElementById("fileUploadScreen").style.display = "none";
    };
  };

  return (
    <section
      className="flex flex-col p-3 bg-white"
      style={{
        maxWidth: "250px",
        position: "absolute",
        bottom: "180px",
        display: "none",
      }}
      id="fileUploadScreen"
    >
      <input
        type="text"
        className="bg-gray-100 p-2 rounded hidden"
        id="from"
        defaultValue={from}
      />
      <input
        type="text"
        className="bg-gray-100 p-2 rounded hidden"
        id="to"
        defaultValue={to}
      />
      <input type="file" id="fileUpload" className="bg-gray-100 p-2 rounded" />
      <select className="bg-gray-100 p-2 rounded mt-2">
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
        <option value="document">Document</option>
      </select>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={handleFIleUpload}
      >
        send
        <i className="fas fa-paper-plane ms-2"></i>
      </button>
    </section>
  );
}

FileUploadMenu.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default FileUploadMenu;

import PropTypes from 'prop-types';

function ImageEnlarger({ image }) {
  return (
    <section
      className="flex flex-col fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => {
        document.getElementById("imageEnlarger").style.display = "none";
      }}
      id="imageEnlarger"
      style={{
        display: "none",
      }}
    >
      <img src={image} alt="" className="w-1/2 h-1/2" />
      {/* download button */}
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={() => {
          const link = document.createElement("a");
          link.href = image;
          link.download = "image";
          link.click();
        }}
      >
        download
        <i className="fas fa-download ms-2"></i>
      </button>
    </section>
  );
}

ImageEnlarger.propTypes = {
  image: PropTypes.string.isRequired,
};
export default ImageEnlarger;

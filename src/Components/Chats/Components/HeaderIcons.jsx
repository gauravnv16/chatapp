function HeaderIcons() {
    const headerIcons = [
        {
          src:"https://img.icons8.com/color/24/000000/video-call.png",
          alt:"video",
          className:"w-6 h-6 mr-3"
        },
        {
          src:"https://img.icons8.com/color/24/000000/phone.png",
          alt:"phone",
          className:"w-6 h-6 mx-3"
        },
        {
          src:"https://img.icons8.com/color/24/000000/ellipsis.png",
          alt:"more",
          className:"w-6 h-6 mx-3"
        }
      ]
    
    return <section className="flex items-center">
            {
            headerIcons.map((icon, index) => (
                <img src={icon.src} alt={icon.alt} className={icon.className} key={index} />
            ))
            }
        </section>
}

export default HeaderIcons;
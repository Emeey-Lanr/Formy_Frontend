import "../Styles/Logo.css"
interface logoSize {
    w: string;
    h: string;
}

const Logo = ({w, h}:logoSize) => {
  return (
      <div className={`logo bg-appcolor-100 ${w} ${h} `}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
    </div>
  )
}

export default Logo
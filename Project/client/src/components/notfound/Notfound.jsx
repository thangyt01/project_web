import "./notfound.scss"

const Notfound = ({title}) => {
  return (
    <div className='container padding___main'>
        <div className="title">
            <div className="center"></div>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default Notfound
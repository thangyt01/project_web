const Element = ({title, up, total, current}) => {
    return (
        <div className="element">
            <h2>{title}</h2>
            <div>
                {
                    up ? 
                    <i class="fa-solid fa-angle-up"></i>
                    :
                    <i class="fa-solid fa-angle-down"></i>
                }
                {
                    total ?
                    <p>{total}</p>
                    :
                    <p>{current} <span>%</span></p>
                }
            </div>
        </div>
    )
}

export default Element
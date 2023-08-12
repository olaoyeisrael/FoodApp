import calsses from "./Cards.module.css"
const Card = (props)=>{
    return <div className={calsses.card}>{props.children}</div>
}

export default Card
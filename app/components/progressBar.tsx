const ProgressBar = (props:any) => {
    let bgColorClass = "";
    if(props.color === "orange"){
        bgColorClass = "bg-common-orange"
    } else if (props.color === "purple"){
        bgColorClass = "bg-common-purple"
    } else {
        bgColorClass = "bg-common-light"
    }
    return(
        <progress className="w-[53px] h-[6px] sm:rounded-sm"
            max="100"
            value={props.value}
          
        />
    )
}

export default ProgressBar;
const ProgressBar = (props:any) => {
    return(
        <progress className="w-[53px] h-[6px] sm:rounded-sm"
            max="100"
            value={props.value}
        />
    );
};

export default ProgressBar;
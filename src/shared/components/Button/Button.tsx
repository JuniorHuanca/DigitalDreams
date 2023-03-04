
type Props = {
    icon: any,
    bgColor: any,
    color: any,
    bgHoverColor: any,
    size: any,
    text: any,
    borderRadius: any,
    width: any
}
const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }: Props) => {

    return (
        <button
            type="button"
            // onClick={() => setIsClicked(initialState)}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
        >
            {icon} {text}
        </button>
    );
};

export default Button;

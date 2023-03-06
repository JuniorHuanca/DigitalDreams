import { cleanupModals } from "@/state/globalSlice";
import { useAppDispatch } from "@/state/store";

type Props = {
    icon: any,
    bgColor: any,
    color: any,
    bgHoverColor: any,
    size: any,
    text: any,
    borderRadius: any,
    width: any,
    title: any,
}
const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, title }: Props) => {
    const dispatch = useAppDispatch()
    return (
        <button
            type="button"
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`relative text-${size} p-1 w-${width} hover:drop-shadow-xl hover:scale-125 hover:bg-${bgHoverColor} transition-transform`}
            onClick={() => dispatch(cleanupModals(title))}
        >
            {icon} {text}
        </button>
    );
};

export default Button;
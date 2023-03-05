type Props = {
    title: any,
    customFunc: any,
    icon: any,
    color: any,
    dotColor: any,
}

const NavButton = ({ title, customFunc, icon, color, dotColor }: Props) => (
    <div>
        <button
            type="button"
            onClick={() => customFunc()}
            style={{ color }}
            className="relative text-2xl rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
            {icon}
        </button>
    </div>
);

export default NavButton
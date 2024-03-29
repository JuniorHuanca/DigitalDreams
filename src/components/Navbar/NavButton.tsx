type Props = {
    title: any,
    customFunc: any,
    icon: any,
    color: any,
    dotColor: any,
    selected: any
}

const NavButton = ({ title, customFunc, icon, color, dotColor, selected }: Props) => (
    <div>
        <button
            type="button"
            onClick={() => customFunc()}
            style={{ color }}
            className={`${selected ? 'bg-slate-100 dark:bg-primary-500' : null} relative text-2xl rounded-full p-3 hover:animate-bell-swing-scale hover:dark:bg-primary-600 md:hover:dark:bg-primary-500 hover:bg-slate-100`}
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
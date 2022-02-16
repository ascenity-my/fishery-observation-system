import * as ReactIconsFa from "react-icons/fa";
import * as ReactIconsSi from "react-icons/si";
import * as ReactIconsBs from "react-icons/bs";
import * as ReactIconsBi from "react-icons/bi";
import * as ReactIconsAi from "react-icons/ai";
import * as ReactIconsDi from "react-icons/di";
import * as ReactIconsFi from "react-icons/fi";
import * as ReactIconsFc from "react-icons/fc";
import * as ReactIconsGi from "react-icons/gi";
import * as ReactIconsGo from "react-icons/go";
import * as ReactIconsGr from "react-icons/gr";
import * as ReactIconsHi from "react-icons/hi";
import * as ReactIconsIm from "react-icons/im";
import * as ReactIconsIo from "react-icons/io";
import * as ReactIconsIo5 from "react-icons/io5";
import * as ReactIconsMd from "react-icons/md";
import * as ReactIconsTi from "react-icons/ti";
import * as ReactIconsCg from "react-icons/cg";

const icons = {
    "Fa": ReactIconsFa,
    "Si": ReactIconsSi,
    "Bs": ReactIconsBs,
    "Bi": ReactIconsBi,
    "Ai": ReactIconsAi,
    "Di": ReactIconsDi,
    "Fi": ReactIconsFi,
    "Fc": ReactIconsFc,
    "Gi": ReactIconsGi,
    "Go": ReactIconsGo,
    "Gr": ReactIconsGr,
    "Hi": ReactIconsHi,
    "Im": ReactIconsIm,
    "Io": ReactIconsIo,
    "Io5": ReactIconsIo5,
    "Md": ReactIconsMd,
    "Ti": ReactIconsTi,
    "Cg": ReactIconsCg
};

export default function Icon(props) {
    if (!props.name || props.name === '') {
        return <p>No icon</p>;
    }

    const src = props.name.split('').splice(0, 2).join('');
    const name = props.name;

    const TagName = icons[src][name];

	return !!TagName ? <TagName /> : <p>{name}</p>;
}

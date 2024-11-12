import { RiCloseLargeLine, RiDeleteBin6Line } from "react-icons/ri";

interface IconsProps {
    size: string;
    color: string;
}

export const CloseIcon = ({ size, color }: IconsProps) => {
    return <RiCloseLargeLine size={size} color={color} />;
};

export const DeleteIcon = ({ size, color }: IconsProps) => {
    return <RiDeleteBin6Line size={size} color={color} />;
}
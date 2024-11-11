import { RiCloseLargeLine } from "react-icons/ri";

interface IconsProps {
    size: string;
    color: string;
}

export const CloseIcon = ({ size, color }: IconsProps) => {
    return <RiCloseLargeLine size={size} color={color} />;
};

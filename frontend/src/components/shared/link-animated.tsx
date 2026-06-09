import {Link} from "react-router";
import React from "react";

interface LinkProps {
    to: string;
    text: string;
}

const LinkAnimated: React.FC<LinkProps> = ({to, text}) => {
    return (
        <Link to={to} target="_blank" className="group underline align-baseline">
            <p className="relative inline-block text-muted-foreground transition-all duration-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-500 group-hover:after:w-full">
                {text}
            </p>
        </Link>
    )
}
export default LinkAnimated

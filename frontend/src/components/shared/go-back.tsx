import React from 'react'
import {Button} from "@/src/components/ui/button.tsx";
import {ArrowLeftIcon} from "lucide-react";
import {NavLink} from "react-router";

interface Props {
    path: string;
    module: string;
}

const GoBack: React.FC<Props> = ({path, module}) => {
    return (
        <NavLink to={`${path}`}>
            <Button variant="outline" className="groups">
                <ArrowLeftIcon className="transition-transform duration-200 group-hover:-translate-x-0.5"/>
                Go back to {module}
            </Button>
        </NavLink>
    )
}
export default GoBack

import type React from "react";

interface Props {
    title: string;
    description: string;
}

const ModuleTitle: React.FC<Props> = ({ title, description }) => {
    return (
        <div className="space-y-1">
            <h2 className="text-4xl tracking-tighter font-regular">{title}</h2>
            <p className="leading-relaxed tracking-tight text-muted-foreground">
                {description}
            </p>
        </div>
    );
};
export default ModuleTitle;
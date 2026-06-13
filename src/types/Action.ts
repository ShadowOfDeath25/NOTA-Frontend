import type React from "react";

export type Action = {
    id: string
    titleAr: string,
    titleEn: string,
    descAr: string,
    descEn: string,
    icon: React.FC<React.SVGProps<SVGSVGElement>>,
    color: "purpleIcon" | "blueIcon" | "greenIcon",
    onClick: () => void
}


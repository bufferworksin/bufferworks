"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", "G-RHPWMVX6LK", {
                page_path: pathname + searchParams.toString(),
            });
        }
    }, [pathname, searchParams]);

    return null;
}

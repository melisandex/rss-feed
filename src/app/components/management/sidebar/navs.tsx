'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import clsx from 'clsx'
import { Crosshair2Icon, GlobeIcon, CardStackMinusIcon } from "@radix-ui/react-icons";
import SidebarNavItem from "./nav-item";

// Add interface for nav item type
interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;  // Change icon type to ElementType
}

const NAVS: NavItem[] = [
    {
        name: "MyFeed",
        href: "/management/my-feeds",
        icon: Crosshair2Icon
    },
    {
        name: "Bundles",
        href: "/management/bundles",
        icon: CardStackMinusIcon
    },
    {
        name: "Explore",
        href: "/management/explore",
        icon: GlobeIcon
    },
]

export default function ManagementSidebarNavs() {
    const pathname = usePathname();
    function getIsActive(nav: NavItem) {  // Add type to nav parameter
        return pathname === nav.href
    }

    return (
        <div className="management-sidebar-navs flex flex-col gap-3 p-2">
            {
                NAVS.map((nav) => (
                    <Link href={nav.href} key={nav.name}>
                        <div className={clsx("rounded hover:bg-blue-800 p-2 cursor-pointer flex items-center gap-3", {
                            'bg-blue-800 text-white': getIsActive(nav)
                        })}>
                            <SidebarNavItem IconComponent={nav.icon} label={nav.name}></SidebarNavItem>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
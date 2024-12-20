'use client'
import { logoutAction } from "@/app/lib/auth-action"
import router from "next/router"

export default function UserCenter() {
    function handleLogout() {
        logoutAction().then(() => {
            router.push('/login')
        })
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="hover:bg-gray-200 rounded cursor-pointer py-2 px-4">User Profile</div>
            <div className="hover:bg-gray-200 rounded cursor-pointer py-2 px-4">User Settings</div>
            <hr />
            <div className="hover:bg-gray-200 rounded cursor-pointer py-2 px-4" onClick={handleLogout}>Logout</div>
        </div>
    )
}
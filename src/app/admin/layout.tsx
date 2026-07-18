import AdminRightSidebar from "@/components/admin/layouts/admin_right_sidebar"
import { FC, ReactNode } from "react"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex gap-2.5">
            <article className="w-full">
                {children}
            </article>
            <aside>
                <AdminRightSidebar />
            </aside>
        </div>
    )
}

export default Layout
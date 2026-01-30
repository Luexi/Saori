import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

// Helper para mostrar rol en español
const roleLabels: Record<string, string> = {
    ADMIN: 'Administrador',
    SUPERVISOR: 'Supervisor',
    VENDEDOR: 'Vendedor',
}

interface NavItem {
    icon: string
    label: string
    path: string
    filled?: boolean
}

const navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', path: '/', filled: true },
    { icon: 'point_of_sale', label: 'Punto de Venta', path: '/pos' },
    { icon: 'trending_up', label: 'Ventas', path: '/ventas' },
    { icon: 'groups', label: 'Clientes', path: '/clientes' },
    { icon: 'inventory_2', label: 'Inventario', path: '/productos' },
    { icon: 'credit_card', label: 'Finanzas', path: '/finanzas' },
    { icon: 'description', label: 'Reportes', path: '/reportes' },
    { icon: 'local_shipping', label: 'Proveedores', path: '/proveedores' },
]

const proximamenteItems: NavItem[] = [
    { icon: 'receipt_long', label: 'Facturación', path: '/facturacion' },
    { icon: 'badge', label: 'Nómina', path: '/nomina' },
    { icon: 'account_balance', label: 'Contabilidad', path: '/contabilidad' },
]

// Items que requieren permisos especiales
const adminOnlyItems: NavItem[] = [
    { icon: 'history', label: 'Registro Actividad', path: '/logs' },
]

const bottomItems: NavItem[] = [
    { icon: 'manage_accounts', label: 'Usuarios', path: '/usuarios' },
    { icon: 'settings', label: 'Configuración', path: '/configuracion' },
]

export default function Sidebar() {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const isAdmin = useAuthStore((state) => state.isAdmin)

    return (
        <aside className="flex w-[80px] lg:w-[260px] flex-col border-r border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark transition-all duration-300">
            {/* Logo */}
            <div className="flex h-20 items-center justify-center lg:justify-start px-0 lg:px-6 border-b border-gray-100 dark:border-gray-800/50">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <span className="material-symbols-outlined text-[24px]">storefront</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-primary dark:text-white hidden lg:block">
                        Saori<span className="font-light opacity-70">ERP</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-1 flex-col justify-between py-6 px-3 overflow-y-auto">
                <nav className="flex flex-col gap-1">
                    {/* Main Navigation */}
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary dark:text-white'
                                    : 'text-text-secondary-light hover:bg-gray-100 dark:text-text-secondary-dark dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

                    {/* Próximamente */}
                    <p className="px-3 text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2 hidden lg:block">
                        Próximamente
                    </p>
                    {proximamenteItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className="group flex items-center gap-3 rounded-lg px-3 py-3 text-text-secondary-light/50 hover:bg-gray-100 dark:text-text-secondary-dark/50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                            <span className="ml-auto text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full hidden lg:block">
                                Pronto
                            </span>
                        </NavLink>
                    ))}

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

                    {/* Admin Only - Logs */}
                    {isAdmin() && adminOnlyItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary dark:text-white'
                                    : 'text-text-secondary-light hover:bg-gray-100 dark:text-text-secondary-dark dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                            <span className="ml-auto text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full hidden lg:block">
                                Admin
                            </span>
                        </NavLink>
                    ))}

                    {/* Bottom Items */}
                    {bottomItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary dark:text-white'
                                    : 'text-text-secondary-light hover:bg-gray-100 dark:text-text-secondary-dark dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-1 lg:px-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-white font-semibold">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex flex-col overflow-hidden hidden lg:flex">
                        <h1 className="text-sm font-semibold truncate text-text-primary-light dark:text-white">
                            {user?.name || 'Usuario'}
                        </h1>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                            {user?.role ? roleLabels[user.role] || user.role : 'Rol'}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="ml-auto text-text-secondary-light hover:text-red-500 dark:text-text-secondary-dark dark:hover:text-red-400 hidden lg:block"
                        title="Cerrar sesión"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

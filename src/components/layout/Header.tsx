import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'

export default function Header() {
    const user = useAuthStore((state) => state.user)
    const { isDark, toggle } = useThemeStore()

    return (
        <header className="flex-none px-6 py-6 lg:px-10 border-b border-gray-100 dark:border-gray-800 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Greeting */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-text-primary-light dark:text-white">
                        Hola, {user?.name?.split(' ')[0] || 'Usuario'}
                    </h2>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Aquí está lo que sucede con tu negocio hoy.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary-light">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="pl-10 pr-4 py-2 text-sm rounded-lg border-0 bg-white dark:bg-surface-dark shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary w-64 transition-shadow"
                        />
                    </div>

                    {/* Date Range */}
                    <button className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm font-medium text-text-primary-light dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span className="hidden sm:inline">Hoy</span>
                        <span className="material-symbols-outlined text-[18px] text-gray-400">expand_more</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggle}
                        className="flex items-center justify-center bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg size-10 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    >
                        <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">
                            {isDark ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    {/* Quick Add */}
                    <button className="flex items-center justify-center bg-primary text-white rounded-lg size-10 shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

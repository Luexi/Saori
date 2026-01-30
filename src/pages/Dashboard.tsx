import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts'

// Mock data
const salesData = [
    { month: 'May', value: 18000 },
    { month: 'Jun', value: 24000 },
    { month: 'Jul', value: 21000 },
    { month: 'Ago', value: 32000 },
    { month: 'Sep', value: 38000 },
    { month: 'Oct', value: 42500 },
]

const metrics = [
    {
        title: 'Ingresos Totales',
        value: '$124,500',
        change: 12,
        changeType: 'positive' as const,
        icon: 'payments',
    },
    {
        title: 'Nuevos Clientes',
        value: '45',
        change: 5,
        changeType: 'positive' as const,
        icon: 'person_add',
    },
    {
        title: 'Productos Vendidos',
        value: '328',
        change: 0,
        changeType: 'neutral' as const,
        icon: 'inventory_2',
    },
    {
        title: 'Ticket Promedio',
        value: '$380',
        change: -3,
        changeType: 'negative' as const,
        icon: 'receipt',
    },
]

const recentActivity = [
    {
        id: 1,
        type: 'sale',
        message: 'Venta registrada',
        detail: 'Cliente: María García - $1,250',
        time: 'Hace 5 min',
        icon: 'point_of_sale',
        color: 'emerald',
    },
    {
        id: 2,
        type: 'customer',
        message: 'Nuevo cliente registrado',
        detail: 'TechCorp México',
        time: 'Hace 2 horas',
        icon: 'person_add',
        color: 'blue',
    },
    {
        id: 3,
        type: 'stock',
        message: 'Stock bajo',
        detail: 'Producto: Laptop HP 15" - 3 unidades',
        time: 'Hace 3 horas',
        icon: 'warning',
        color: 'amber',
    },
    {
        id: 4,
        type: 'payment',
        message: 'Pago recibido',
        detail: 'Factura #1024 - $4,500',
        time: 'Hace 5 horas',
        icon: 'payments',
        color: 'emerald',
    },
]

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                    <MetricCard key={metric.title} {...metric} />
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="xl:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl shadow-floating border border-gray-100 dark:border-gray-800">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-text-primary-light dark:text-white">
                                Resumen de Ventas
                            </h3>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 flex items-center gap-2">
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">+8%</span>
                                vs mes anterior
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-white">
                                Mensual
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded-md text-text-secondary-light hover:bg-gray-100 dark:text-text-secondary-dark dark:hover:bg-gray-800">
                                Trimestral
                            </button>
                        </div>
                    </div>
                    <div className="p-6 h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#295570" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#295570" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7880', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7880', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#2d3339',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                    }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ventas']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#295570"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-floating border border-gray-100 dark:border-gray-800 flex flex-col max-h-[500px]">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-white">
                            Actividad Reciente
                        </h3>
                        <button className="text-primary hover:text-primary-dark text-sm font-medium">
                            Ver todo
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="relative pl-2">
                            {/* Timeline line */}
                            <div className="absolute left-[19px] top-2 bottom-6 w-[2px] bg-gray-100 dark:bg-gray-800" />

                            {recentActivity.map((activity, index) => (
                                <ActivityItem
                                    key={activity.id}
                                    {...activity}
                                    isLast={index === recentActivity.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Metric Card Component
function MetricCard({
    title,
    value,
    change,
    changeType,
    icon
}: {
    title: string
    value: string
    change: number
    changeType: 'positive' | 'negative' | 'neutral'
    icon: string
}) {
    const changeColors = {
        positive: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
        negative: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    }

    const changeIcons = {
        positive: 'trending_up',
        negative: 'trending_down',
        neutral: 'remove',
    }

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-floating hover:-translate-y-1 transition-transform duration-300 border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                        {title}
                    </p>
                    <h3 className="text-3xl font-bold text-text-primary-light dark:text-white mt-1">
                        {value}
                    </h3>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${changeColors[changeType]}`}>
                    <span className="material-symbols-outlined text-[14px]">
                        {changeIcons[changeType]}
                    </span>
                    {Math.abs(change)}%
                </span>
            </div>
            <div className="flex items-center gap-2 text-primary dark:text-primary-light">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    vs período anterior
                </span>
            </div>
        </div>
    )
}

// Activity Item Component
function ActivityItem({
    message,
    detail,
    time,
    icon,
    color,
    isLast,
}: {
    message: string
    detail: string
    time: string
    icon: string
    color: string
    isLast: boolean
}) {
    const colorClasses: Record<string, string> = {
        emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    }

    return (
        <div className={`relative flex gap-4 ${isLast ? '' : 'pb-6'}`}>
            <div className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-surface-dark ${colorClasses[color]}`}>
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </div>
            <div className="flex flex-col pt-1 flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary-light dark:text-white">
                    {message}
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5 truncate">
                    {detail}
                </p>
                <span className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70 mt-1">
                    {time}
                </span>
            </div>
        </div>
    )
}

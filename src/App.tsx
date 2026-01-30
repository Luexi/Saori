import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import Layout from '@/components/layout/Layout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Proximamente from '@/pages/Proximamente'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="ventas" element={<Proximamente titulo="Ventas" />} />
                    <Route path="pos" element={<Proximamente titulo="Punto de Venta" />} />
                    <Route path="clientes" element={<Proximamente titulo="CRM - Clientes" />} />
                    <Route path="productos" element={<Proximamente titulo="Inventario" />} />
                    <Route path="finanzas" element={<Proximamente titulo="Finanzas" />} />
                    <Route path="reportes" element={<Proximamente titulo="Reportes" />} />
                    <Route path="proveedores" element={<Proximamente titulo="Proveedores" />} />
                    <Route path="usuarios" element={<Proximamente titulo="Usuarios" />} />
                    <Route path="facturacion" element={<Proximamente titulo="Facturación Electrónica" proximamente />} />
                    <Route path="nomina" element={<Proximamente titulo="Nómina" proximamente />} />
                    <Route path="contabilidad" element={<Proximamente titulo="Contabilidad" proximamente />} />
                    <Route path="configuracion" element={<Proximamente titulo="Configuración" />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

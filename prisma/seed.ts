import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Crear sucursal principal
    const branch = await prisma.branch.upsert({
        where: { id: 'main-branch' },
        update: {},
        create: {
            id: 'main-branch',
            name: 'Sucursal Principal',
            address: 'Calle Principal #123',
            phone: '555-123-4567',
            isMain: true,
        },
    })
    console.log('✓ Sucursal creada:', branch.name)

    // Crear usuario admin
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@saori.local' },
        update: {},
        create: {
            email: 'admin@saori.local',
            password: hashedPassword,
            name: 'Administrador',
            role: 'ADMIN',
            branchId: branch.id,
        },
    })
    console.log('✓ Usuario admin creado:', admin.email)

    // Crear categorías de productos
    const categorias = await Promise.all([
        prisma.category.upsert({
            where: { id: 'cat-general' },
            update: {},
            create: { id: 'cat-general', name: 'General', color: '#6b7280' },
        }),
        prisma.category.upsert({
            where: { id: 'cat-electronica' },
            update: {},
            create: { id: 'cat-electronica', name: 'Electrónica', color: '#3b82f6' },
        }),
        prisma.category.upsert({
            where: { id: 'cat-alimentos' },
            update: {},
            create: { id: 'cat-alimentos', name: 'Alimentos', color: '#22c55e' },
        }),
    ])
    console.log('✓ Categorías creadas:', categorias.length)

    // Crear productos de ejemplo
    const productos = [
        { code: 'PROD-001', name: 'Laptop HP 15"', price: 12500, cost: 10000, categoryId: 'cat-electronica' },
        { code: 'PROD-002', name: 'Mouse Inalámbrico', price: 350, cost: 200, categoryId: 'cat-electronica' },
        { code: 'PROD-003', name: 'Teclado Mecánico', price: 850, cost: 500, categoryId: 'cat-electronica' },
        { code: 'PROD-004', name: 'Monitor 24"', price: 4500, cost: 3500, categoryId: 'cat-electronica' },
        { code: 'PROD-005', name: 'Café Molido 500g', price: 120, cost: 80, categoryId: 'cat-alimentos' },
    ]

    for (const prod of productos) {
        const product = await prisma.product.upsert({
            where: { code: prod.code },
            update: {},
            create: prod,
        })

        // Crear stock inicial
        await prisma.productStock.upsert({
            where: {
                productId_branchId: {
                    productId: product.id,
                    branchId: branch.id,
                },
            },
            update: {},
            create: {
                productId: product.id,
                branchId: branch.id,
                quantity: Math.floor(Math.random() * 50) + 10,
            },
        })
    }
    console.log('✓ Productos creados:', productos.length)

    // Crear categorías de gastos
    const expenseCategories = await Promise.all([
        prisma.expenseCategory.upsert({
            where: { id: 'exp-renta' },
            update: {},
            create: { id: 'exp-renta', name: 'Renta', description: 'Pagos de alquiler' },
        }),
        prisma.expenseCategory.upsert({
            where: { id: 'exp-servicios' },
            update: {},
            create: { id: 'exp-servicios', name: 'Servicios', description: 'Luz, agua, internet' },
        }),
        prisma.expenseCategory.upsert({
            where: { id: 'exp-nomina' },
            update: {},
            create: { id: 'exp-nomina', name: 'Nómina', description: 'Sueldos y salarios' },
        }),
    ])
    console.log('✓ Categorías de gastos creadas:', expenseCategories.length)

    console.log('\n🎉 Seed completado!')
    console.log('\n📋 Credenciales de acceso:')
    console.log('   Email: admin@saori.local')
    console.log('   Password: admin123')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

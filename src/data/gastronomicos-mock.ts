import { RestaurantConfig } from '@/types/gastronomicos'

export const mockConfig: RestaurantConfig = {
  header: {
    mode: 'preset',
    preset: 'noche',
    title: 'Comidas KAI',
    subtitle: 'Cocina de autor · Mar del Plata',
  },
  pedidosYaGenericLink:
    'https://www.pedidosya.com.ar/restaurantes/mar-del-plata/comidas-kai',
  categories: [
    {
      id: 'cat-1',
      name: 'Entradas',
      items: [
        {
          id: 'item-1',
          name: 'Tabla de fiambres',
          description: 'Jamón, salame, quesos y aceitunas marinadas',
          price: 3200,
          visible: true,
          badges: [],
          photo:
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&w=300&h=300&fit=crop&q=80',
        },
        {
          id: 'item-2',
          name: 'Provoleta a la parrilla',
          description: 'Queso provolone con orégano y ají molido',
          price: 2800,
          visible: true,
          badges: ['vegetariano'],
          photo:
            'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&w=300&h=300&fit=crop&q=80',
        },
        {
          id: 'item-3',
          name: 'Croquetas veganas de papa',
          description: 'Con dip de aioli de cajú y ciboulette',
          price: 2400,
          visible: true,
          badges: ['vegano', 'sinTacc'],
          photo:
            'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&w=300&h=300&fit=crop&q=80',
        },
      ],
    },
    {
      id: 'cat-2',
      name: 'Principales',
      items: [
        {
          id: 'item-4',
          name: 'Lomo a la pimienta',
          description: 'Tierno lomo con salsa de pimienta verde y papas fritas',
          price: 7500,
          visible: true,
          badges: ['sinTacc'],
          photo:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&w=300&h=300&fit=crop&q=80',
          pedidosYaLink:
            'https://www.pedidosya.com.ar/restaurantes/mar-del-plata/comidas-kai',
        },
        {
          id: 'item-5',
          name: 'Pollo relleno',
          description: 'Pechuga rellena de espinaca y ricota, con ensalada de estación',
          price: 5800,
          visible: true,
          badges: [],
          photo:
            'https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&w=300&h=300&fit=crop&q=80',
        },
        {
          id: 'item-6',
          name: 'Risotto de hongos',
          description: 'Arroz arbóreo con hongos de estación, manteca y parmesano',
          price: 5200,
          visible: true,
          badges: ['vegetariano', 'sinTacc'],
          photo:
            'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&w=300&h=300&fit=crop&q=80',
        },
      ],
    },
    {
      id: 'cat-3',
      name: 'Postres',
      items: [
        {
          id: 'item-7',
          name: 'Tiramisú',
          description: 'Clásico italiano con café espresso y mascarpone',
          price: 2200,
          visible: true,
          badges: ['vegetariano'],
          photo:
            'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&w=300&h=300&fit=crop&q=80',
        },
        {
          id: 'item-8',
          name: 'Brownie sin azúcar',
          description: 'Brownie tibio con helado de vainilla',
          price: 2600,
          visible: true,
          badges: ['sinAzucar', 'vegetariano'],
          photo:
            'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&w=300&h=300&fit=crop&q=80',
        },
      ],
    },
    {
      id: 'cat-4',
      name: 'Bebidas',
      items: [
        {
          id: 'item-9',
          name: 'Agua mineral',
          description: 'Con o sin gas, 500ml',
          price: 800,
          visible: true,
          badges: ['vegano', 'sinTacc', 'sinAzucar'],
          photo:
            'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&w=300&h=300&fit=crop&q=80',
        },
        {
          id: 'item-10',
          name: 'Gaseosas',
          description: 'Coca-Cola, Sprite, Fanta o Tónica',
          price: 900,
          visible: true,
          badges: ['vegano'],
          photo:
            'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&w=300&h=300&fit=crop&q=80',
        },
        {
          id: 'item-11',
          name: 'Vino de la casa',
          description: 'Copa de tinto o blanco seleccionado',
          price: 1800,
          visible: true,
          badges: ['vegano', 'sinTacc', 'sinAzucar'],
          photo:
            'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&w=300&h=300&fit=crop&q=80',
        },
      ],
    },
  ],
  links: [
    {
      id: 'link-carta',
      type: 'carta',
      label: 'Ver Carta',
      url: '/gastronomicos/carta',
      active: true,
    },
    {
      id: 'link-google',
      type: 'google',
      label: 'Calificanos en Google',
      url: 'https://g.page/r/comidaskai/review',
      active: true,
    },
    {
      id: 'link-pedidosya',
      type: 'pedidosya',
      label: 'Pedidos Ya',
      url: 'https://www.pedidosya.com.ar/restaurantes/mar-del-plata/comidas-kai',
      active: true,
    },
    {
      id: 'link-instagram',
      type: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/comidaskai',
      active: true,
    },
    {
      id: 'link-whatsapp',
      type: 'whatsapp',
      label: 'WhatsApp',
      url: 'https://wa.me/5492236000000',
      active: true,
    },
    {
      id: 'link-web',
      type: 'web',
      label: 'Nuestro Sitio Web',
      url: '/gastronomicos',
      active: true,
    },
  ],
}
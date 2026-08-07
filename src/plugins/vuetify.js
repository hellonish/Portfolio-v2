import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

// Single accent, neutral surfaces. Deliberately restrained.
const light = {
  dark: false,
  colors: {
    background: '#FBFAF7',
    surface: '#FFFFFF',
    'surface-variant': '#F4F2EC',
    primary: '#3D5A80',
    secondary: '#5A6470',
    'on-background': '#14181A',
    'on-surface': '#14181A',
  },
}

const dark = {
  dark: true,
  colors: {
    background: '#0E1113',
    surface: '#14181A',
    'surface-variant': '#1C2124',
    primary: '#8FB8DE',
    secondary: '#8B949E',
    'on-background': '#D8DEE9',
    'on-surface': '#D8DEE9',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: { light, dark },
    variations: { colors: ['primary'], lighten: 2, darken: 2 },
  },
  defaults: {
    VCard: { flat: true, rounded: 'lg' },
    VBtn: { rounded: 'lg', class: 'text-none', style: 'letter-spacing:0' },
    VChip: { size: 'small', variant: 'tonal', rounded: 'sm' },
  },
})

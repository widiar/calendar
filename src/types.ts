export interface EventItem {
  id: string
  title?: string
  startDate: string // Format: YYYY-MM-DD
  endDate: string // Format: YYYY-MM-DD (Sama dengan startDate jika hanya 1 hari)
  time?: string
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'gray' | 'red' | 'orange'
  tag: 'event' | 'libur' | 'freeze' | 'wfh' | 'major' | 'imple'
  badge?: {
    text: string // 1 Karakter huruf, misal: 'L', 'M', 'P'
    color: string // Class warna Tailwind teks, misal: 'text-rose-500'
  }
}

export const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/50',
  green:
    'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50',
  purple:
    'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/50',
  amber:
    'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/50',
  gray: 'bg-gray-200 dark:bg-gray-950/40 text-gray-700 dark:text-gray-300 border-gray-200/60 dark:border-gray-800/50',
  yellow:
    'bg-yellow-500 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 border-yellow-200/60 dark:border-yellow-800/50',
  red: 'bg-red-500 dark:bg-red-950/50 text-white dark:text-red-300 border-red-200/60 dark:border-red-800/50',
  orange:
    'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/50',
  teal: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/50',
  pink: 'bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-200/60 dark:border-pink-800/50',
}

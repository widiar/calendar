export interface EventItem {
  id: string
  title: string
  startDate: string // Format: YYYY-MM-DD
  endDate: string // Format: YYYY-MM-DD (Sama dengan startDate jika hanya 1 hari)
  time?: string
  color: 'blue' | 'green' | 'purple' | 'amber' | 'gray'
  badge?: {
    text: string // 1 Karakter huruf, misal: 'L', 'M', 'P'
    color: string // Class warna Tailwind teks, misal: 'text-rose-500'
  }
}

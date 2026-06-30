<template>
  <div
    class="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800"
  >
    <!-- HEADER KALENDER -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h2
        class="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 capitalize text-center sm:text-left"
      >
        {{ currentMonthName }} {{ currentYear }}
      </h2>
      <div
        class="flex items-center justify-between sm:justify-end gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-xs border border-slate-200 dark:border-slate-700 w-full sm:w-auto"
      >
        <button
          @click="previousMonth"
          class="p-2.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex-1 sm:flex-none text-center"
        >
          &larr;
        </button>
        <button
          @click="goToToday"
          class="px-4 py-1.5 sm:py-1 text-xs md:text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          Hari Ini
        </button>
        <button
          @click="nextMonth"
          class="p-2.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex-1 sm:flex-none text-center"
        >
          &rarr;
        </button>
      </div>
    </div>

    <!-- NAMA HARI -->
    <div
      class="grid grid-cols-7 gap-y-2 mb-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
    >
      <div v-for="(day, index) in weekDays" :key="day">
        <span class="sm:hidden">{{ weekDaysMobile[index] }}</span>
        <span class="hidden sm:inline">{{ day }}</span>
      </div>
    </div>

    <!-- GRID TANGGAL -->
    <div
      class="grid grid-cols-7 gap-y-1 sm:gap-y-2 gap-x-0 border border-slate-200/60 dark:border-slate-700/50 rounded-tl-xl rounded-bl-xl overflow-hidden"
    >
      <div
        v-for="blank in blankDays"
        :key="'blank-' + blank"
        class="min-h-[60px] sm:min-h-[115px] p-1 sm:p-2 bg-slate-100/40 dark:bg-slate-850/10 border-slate-200/60 dark:border-slate-700/50 opacity-20 pointer-events-none"
      ></div>

      <!-- Tanggal Bulan Berjalan -->
      <div
        v-for="day in daysInMonth"
        :key="day.dateString"
        @click="openDayDetails(day.dateString)"
        :class="[
          'min-h-[65px] sm:min-h-[115px] py-1.5 sm:py-2 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 transition cursor-pointer flex flex-col justify-between group relative select-none rounded-md',
          day.isToday
            ? 'border-indigo-500 ring-2 ring-indigo-500/20 dark:ring-indigo-400/20'
            : 'border-slate-200/60 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500',
          day.isWeekend ? 'bg-red-50' : 'bg-white',
        ]"
      >
        <div class="flex items-center justify-between w-full px-1 sm:px-2">
          <!-- Nomor Tanggal -->
          <span
            :class="[
              'text-xs sm:text-sm font-bold inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-colors',
              day.isToday
                ? 'bg-indigo-600 text-white'
                : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
            ]"
          >
            {{ day.dayNumber }}
          </span>

          <!-- INDIKATOR LABEL -->
          <span
            v-if="getBadgeForDate(day.dateString)"
            :class="[
              'text-xs text-white font-bold mr-1 rounded-full transition-colors w-5 h-5 inline-flex items-center justify-center',
              getBadgeForDate(day.dateString)?.color,
            ]"
          >
            {{ getBadgeForDate(day.dateString)?.text }}
          </span>
        </div>

        <!-- LIST JADWAL -->
        <div class="mt-2 space-y-1 overflow-hidden flex-1 flex flex-col justify-end w-full">
          <div
            v-for="event in getEventsForDate(day.dateString).slice(0, 2)"
            :key="event.id"
            :class="[
              'py-1 text-[11px] font-semibold truncate border-y shadow-xs transition-all w-full block',
              colorClasses[event.color],
              event.startDate === day.dateString
                ? 'rounded-l-lg pl-2 pr-0 border-l ml-1 w-[calc(100%-4px)]'
                : '',
              event.endDate === day.dateString
                ? 'rounded-r-lg pr-2 pl-0 border-r mr-1 w-[calc(100%-4px)]'
                : '',
              event.startDate !== day.dateString && event.endDate !== day.dateString
                ? 'rounded-none px-0 border-x-0 mx-0 w-full'
                : '',
            ]"
          >
            <span
              v-if="event.startDate === day.dateString || new Date(day.dateString).getDay() === 0"
              class="px-2"
            >
              {{ event.title }}
            </span>
            <span v-else class="invisible">&nbsp;</span>
          </div>

          <!-- Indikator Sisa Jadwal -->
          <div
            v-if="getEventsForDate(day.dateString).length > 2"
            class="text-[10px] text-slate-400 font-medium pl-2 pb-1"
          >
            +{{ getEventsForDate(day.dateString).length - 2 }} lagi
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/40 backdrop-blur-xs" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all border border-slate-100 dark:border-slate-700"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-bold text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-700 pb-3"
                >
                  {{ selectedDateFormatted }}
                </DialogTitle>

                <!-- Daftar Jadwal di dalam Modal -->
                <div class="mt-4 space-y-3">
                  <div
                    v-if="selectedDateEvents.length === 0"
                    class="text-sm text-slate-400 text-center py-6"
                  >
                    Tidak ada jadwal untuk hari ini.
                  </div>

                  <div
                    v-for="event in selectedDateEvents"
                    :key="event.id"
                    :class="[
                      'p-3 rounded-xl border flex flex-col gap-1',
                      colorClasses[event.color],
                    ]"
                  >
                    <div class="text-sm font-semibold">{{ event.title }}</div>
                    <div class="text-xs opacity-80 flex flex-col gap-0.5">
                      <div v-if="event.startDate !== event.endDate">
                        📅 {{ formatDateRange(event.startDate, event.endDate) }}
                      </div>
                      <div v-if="event.time">⏰ Jam: {{ event.time }}</div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end">
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition"
                    @click="closeModal"
                  >
                    Tutup
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import type { EventItem } from './types'

// Mock Data Jadwal / Events
const events = ref<EventItem[]>([
  {
    id: '1',
    title: 'Workshop Vue 3 & TS',
    startDate: '2026-07-07',
    endDate: '2026-07-09',
    time: '09:00 - 15:00',
    color: 'blue',
    badge: { text: 'W', color: 'bg-blue-600' },
  },
  {
    id: '2',
    title: 'Cuti Bersama',
    startDate: '2026-07-15',
    endDate: '2026-07-17',
    color: 'amber',
    badge: { text: 'L', color: 'bg-rose-600' },
  },
  {
    id: '2',
    title: 'Freeze',
    startDate: '2026-08-15',
    endDate: '2026-08-17',
    color: 'gray',
    badge: { text: 'L', color: 'bg-rose-600' },
  },
  {
    id: '3',
    title: 'Evaluasi Kuartal',
    startDate: '2026-07-28',
    endDate: '2026-07-28',
    time: '13:00',
    color: 'purple',
    badge: { text: 'M', color: 'bg-purple-600' },
  },
])

const currentDate = ref(new Date())

const isOpen = ref(false)
const selectedDate = ref('')

// Skema Warna
const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/50',
  green:
    'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50',
  purple:
    'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/50',
  amber:
    'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/50',
  gray: 'bg-gray-200 dark:bg-gray-950/40 text-gray-700 dark:text-gray-300 border-gray-200/60 dark:border-gray-800/50',
}

const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const weekDaysMobile = ['M', 'S', 'S', 'R', 'K', 'J', 'S']

// Tahun dan Bulan
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(currentDate.value)
})

// Menghitung hari kosong (padding) sebelum tanggal 1
const blankDays = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1).getDay()
  return firstDayOfMonth
})

// Menyusun array objek tanggal dalam bulan berjalan
const daysInMonth = computed(() => {
  const numberOfDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const today = new Date()

  return Array.from({ length: numberOfDays }, (_, i) => {
    const dayNum = i + 1
    const dateObj = new Date(currentYear.value, currentMonth.value, dayNum)

    // Format YYYY-MM-DD local manual agar presisi bebas masalah timezone UTC
    const yearStr = dateObj.getFullYear()
    const monthStr = String(dateObj.getMonth() + 1).padStart(2, '0')
    const dayStr = String(dateObj.getDate()).padStart(2, '0')
    const dateString = `${yearStr}-${monthStr}-${dayStr}`

    const isToday =
      today.getDate() === dayNum &&
      today.getMonth() === currentMonth.value &&
      today.getFullYear() === currentYear.value

    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6

    return {
      dayNumber: dayNum,
      dateString,
      isToday,
      isWeekend,
    }
  })
})

// Fungsi filter jadwal per tanggal
const getEventsForDate = (dateString: string) => {
  const targetDate = new Date(dateString).getTime()
  return events.value.filter((event) => {
    const start = new Date(event.startDate).getTime()
    const end = new Date(event.endDate).getTime()
    return targetDate >= start && targetDate <= end
  })
}

//badge
const getBadgeForDate = (dateString: string) => {
  const activeEvents = getEventsForDate(dateString)
  const eventWithBadge = activeEvents.find((e) => e.badge)
  return eventWithBadge ? eventWithBadge.badge : null
}

// Navigasi Bulan
const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}
const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}
const goToToday = () => {
  currentDate.value = new Date()
}

// Logika Interaksi Modal Detail Jadwal
const selectedDateEvents = computed(() => {
  return getEventsForDate(selectedDate.value)
})

const selectedDateFormatted = computed(() => {
  if (!selectedDate.value) return ''
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(
    new Date(selectedDate.value),
  )
})

const formatDateRange = (startStr: string, endStr: string) => {
  const start = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(
    new Date(startStr),
  )
  const end = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(
    new Date(endStr),
  )
  return `${start} s/d ${end}`
}

const openDayDetails = (dateString: string) => {
  selectedDate.value = dateString
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}
</script>

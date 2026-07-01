<template>


  <nav
    class="mb-5 sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 transition-colors duration-300 bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">

    <div class="flex items-center space-x-2">
      <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Calendar
      </span>
    </div>

    <div class="flex items-center space-x-3">

      <div class="flex items-center">
        <Switch v-model="isDark" :class="isDark ? 'bg-indigo-600' : 'bg-slate-200'"
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-indigo-400 dark:focus:ring-offset-slate-900">
          <span class="sr-only">Toggle Dark Mode</span>

          <span aria-hidden="true" :class="isDark ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none relative inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out">
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              class="h-3.5 w-3.5 text-yellow-500 transition-opacity duration-200">
              <path fill="currentColor"
                d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.41 1.41a.996.996 0 1 0 1.41-1.41L5.99 4.58zm12.02 12.02a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.41 1.41a.996.996 0 1 0 1.41-1.41l-1.41-1.41zm-1.41-12.02c.39-.39.39-1.02 0-1.41c-.39-.39-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41c.39.39 1.02.39 1.41 0l1.41-1.41zM5.99 19.42c.39.39 1.02.39 1.41 0c.39-.39.39-1.02 0-1.41l-1.41-1.41c-.39-.39-1.02-.39-1.41 0c-.39.39-.39 1.02 0 1.41l1.41 1.41z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              class="h-3.5 w-3.5 text-indigo-100 transition-opacity duration-200">
              <path fill="currentColor"
                d="M12 21c-4.97 0-9-4.03-9-9c0-.85.12-1.68.35-2.47c1.37.95 3.02 1.47 4.65 1.47c3.9 0 7.08-3.08 7.08-6.91c0-1.39-.41-2.71-1.12-3.8c3.21.65 5.64 3.47 5.64 6.9c.01 4.97-4.02 9-9.01 9z" />
            </svg>

          </span>
        </Switch>
      </div>
    </div>

  </nav>
  <div
    class="w-full max-w-7xl mx-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800">
    <!-- HEADER KALENDER -->
    <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 mb-6">
      <!-- KIRI: Tombol Tambah Jadwal -->
      <div class="flex justify-start order-2 sm:order-1">
        <button @click="openAddEventModal"
          class="px-4 py-2 text-xs md:text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center gap-1.5 shadow-xs w-full sm:w-auto cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Jadwal
        </button>
      </div>

      <!-- TENGAH: Judul Bulan dan Tahun -->
      <div class="text-center order-1 sm:order-2">
        <h2 class="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 capitalize">
          {{ currentMonthName }} {{ currentYear }}
        </h2>
      </div>

      <!-- KANAN: Navigasi Kalender -->
      <div class="flex justify-end order-3">
        <div
          class="flex items-center justify-between sm:justify-end gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-xs border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
          <button @click="previousMonth"
            class="p-2.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex-1 sm:flex-none text-center cursor-pointer">
            &larr;
          </button>
          <button @click="goToToday"
            class="px-4 py-1.5 sm:py-1 text-xs md:text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer">
            Hari Ini
          </button>
          <button @click="nextMonth"
            class="p-2.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex-1 sm:flex-none text-center cursor-pointer">
            &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- NAMA HARI -->
    <div
      class="grid grid-cols-7 gap-y-2 mb-2 text-center text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
      <div v-for="(day, index) in weekDays" :key="day">
        <span class="sm:hidden">{{ weekDaysMobile[index] }}</span>
        <span class="hidden sm:inline">{{ day }}</span>
      </div>
    </div>

    <!-- GRID TANGGAL -->
    <div
      class="grid grid-cols-7 gap-y-1 sm:gap-y-2 gap-x-0 p-5 border-slate-200/60 dark:border-slate-700/50 rounded-tl-xl rounded-bl-xl overflow-hidden">
      <div v-for="blank in blankDays" :key="'blank-' + blank"
        class="min-h-[60px] sm:min-h-[115px] p-1 sm:p-2 bg-slate-100/40 dark:bg-slate-850/10 border-slate-200/60 dark:border-slate-700/50 opacity-0 pointer-events-none">
      </div>

      <!-- Tanggal Bulan Berjalan -->
      <div v-for="day in daysInMonth" :key="day.dateString" @click="openDayDetails(day.dateString)" :class="[
        'min-h-[65px] sm:min-h-[115px] py-1.5 sm:py-2 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 transition cursor-pointer flex flex-col justify-between group relative select-none rounded-md',
        day.isToday
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 dark:ring-indigo-400/20'
          : 'border-slate-200/60 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500',
        day.isWeekend ? 'bg-red-50' : 'bg-white',
      ]">
        <div class="flex items-center justify-between w-full px-1 sm:px-2">
          <!-- Nomor Tanggal -->
          <span :class="[
            'text-xs sm:text-sm font-bold inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-colors',
            day.isToday
              ? 'bg-indigo-600 text-white'
              : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
          ]">
            {{ day.dayNumber }}
          </span>

          <!-- INDIKATOR LABEL -->
          <span v-if="getBadgeForDate(day.dateString)" :class="[
            'text-xs text-white font-bold mr-1 rounded-full transition-colors w-5 h-5 inline-flex items-center justify-center',
            getBadgeForDate(day.dateString)?.color,
          ]">
            {{ getBadgeForDate(day.dateString)?.text }}
          </span>
        </div>

        <!-- LIST JADWAL -->
        <div class="mt-2 space-y-1 overflow-hidden flex-1 flex flex-col justify-end w-full">
          <div v-for="event in getEventsForDate(day.dateString).slice(0, 2)" :key="event.id" :class="[
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
          ]">
            <span v-if="event.startDate === day.dateString || new Date(day.dateString).getDay() === 0" class="px-2">
              {{ event.title }}
            </span>
            <span v-else class="invisible">&nbsp;</span>
          </div>

          <!-- Indikator Sisa Jadwal -->
          <div v-if="getEventsForDate(day.dateString).length > 2"
            class="text-[10px] text-slate-400 font-medium pl-2 pb-1">
            +{{ getEventsForDate(day.dateString).length - 2 }} lagi
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/40 backdrop-blur-xs" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all border border-slate-100 dark:border-slate-700">
                <DialogTitle as="h3"
                  class="text-lg font-bold text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-700 pb-3">
                  {{ selectedDateFormatted }}
                </DialogTitle>

                <!-- Daftar Jadwal di dalam Modal -->
                <div class="mt-4 space-y-3">
                  <div v-if="selectedDateEvents.length === 0" class="text-sm text-slate-400 text-center py-6">
                    Tidak ada jadwal untuk hari ini.
                  </div>

                  <div v-for="event in selectedDateEvents" :key="event.id" :class="[
                    'p-3 rounded-xl border flex flex-col gap-2 relative group transition-all',
                    colorClasses[event.color],
                    isActionLoading && loadingEventId === event.id ? 'opacity-60 cursor-wait' : ''
                  ]">
                    <!-- Normal View Mode -->
                    <div v-if="editingEventId !== event.id" class="flex justify-between items-start gap-4">
                      <div class="flex-1 min-w-0">
                        <div class="text-sm font-semibold break-words text-slate-900 dark:text-slate-100">{{ event.title
                        }}</div>
                        <div class="text-xs opacity-80 flex flex-col gap-0.5 mt-1 text-slate-700 dark:text-slate-300">
                          <div v-if="event.startDate !== event.endDate">
                            📅 {{ formatDateRange(event.startDate, event.endDate) }}
                          </div>
                          <div v-if="event.time">⏰ Jam: {{ event.time }}</div>
                        </div>
                      </div>

                      <!-- Action Buttons (Edit and Delete) -->
                      <div v-if="event.tag === 'event'" class="flex items-center gap-1 shrink-0">
                        <button @click="startEditing(event)" :disabled="isActionLoading"
                          class="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                          title="Edit Judul">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.83 18.25a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </button>
                        <button @click="deleteEvent(event.id)" :disabled="isActionLoading"
                          class="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-100/50 dark:text-rose-400 dark:hover:text-rose-300 dark:hover:bg-rose-950/30 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                          title="Hapus Jadwal">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- Inline Edit Mode -->
                    <div v-else class="flex flex-col gap-2">
                      <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">Edit Judul Jadwal</div>
                      <div class="flex items-center gap-2">
                        <input type="text" v-model="editingEventTitle" :disabled="isActionLoading"
                          class="flex-1 px-2.5 py-1 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                          placeholder="Masukkan judul baru..." required />

                        <button @click="saveEditEvent" :disabled="isActionLoading || !editingEventTitle.trim()"
                          class="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100/50 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-950/30 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                          title="Simpan Judul">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </button>

                        <button @click="cancelEditing" :disabled="isActionLoading"
                          class="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                          title="Batal">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div v-if="editTitleError" class="text-xs text-red-500 font-medium">
                        ⚠️ {{ editTitleError }}
                      </div>
                    </div>

                    <!-- Loader Spinner overlay -->
                    <div v-if="isActionLoading && loadingEventId === event.id"
                      class="absolute inset-0 bg-white/40 dark:bg-slate-800/40 rounded-xl flex items-center justify-center">
                      <svg class="animate-spin h-6 w-6 text-indigo-600 dark:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end">
                  <button type="button" :disabled="isActionLoading"
                    class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    @click="closeModal">
                    Tutup
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>


      </Dialog>
    </TransitionRoot>

    <!-- MODAL KONFIRMASI HAPUS (NESTED) -->
    <TransitionRoot appear :show="isDeleteConfirmOpen" as="template">
      <Dialog as="div" @close="closeDeleteConfirmModal" class="relative z-60">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/40 backdrop-blur-xs" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-center align-middle shadow-xl transition-all border border-slate-100 dark:border-slate-700">

                <!-- Icon Warning -->
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>

                <DialogTitle as="h3" class="text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Hapus Jadwal?
                </DialogTitle>

                <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Apakah Anda yakin ingin menghapus jadwal ini? Tindakan ini tidak dapat dibatalkan.
                </p>

                <!-- Buttons -->
                <div class="flex justify-center gap-3">
                  <button type="button" :disabled="isDeleteLoading"
                    class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    @click="closeDeleteConfirmModal">
                    Batal
                  </button>
                  <button type="button" :disabled="isDeleteLoading" @click="confirmDeleteEvent"
                    class="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-rose-600 hover:bg-rose-700 transition flex items-center gap-1.5 disabled:bg-slate-400 dark:disabled:bg-slate-750 disabled:cursor-not-allowed cursor-pointer">
                    <svg v-if="isDeleteLoading" class="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Ya, Hapus
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- MODAL TAMBAH JADWAL -->
    <TransitionRoot appear :show="isAddOpen" as="template">
      <Dialog as="div" @close="closeAddModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/40 backdrop-blur-xs" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-xl transform overflow-visible rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all border border-slate-100 dark:border-slate-700">
                <DialogTitle as="h3"
                  class="text-lg font-bold text-slate-900 dark:text-slate-50 border-b border-slate-100 dark:border-slate-700 pb-3">
                  Tambah Jadwal Baru
                </DialogTitle>

                <form @submit.prevent="saveEvent" class="mt-4 space-y-4">
                  <!-- Judul -->
                  <div>
                    <label for="event-title"
                      class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Judul Jadwal
                    </label>
                    <input id="event-title" type="text" v-model="formTitle" :disabled="isSaving"
                      placeholder="Masukkan judul jadwal" :class="[
                        'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 disabled:opacity-50',
                        titleError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                      ]" />
                    <div v-if="titleError" class="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                      {{ titleError }}
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <!-- Tanggal Awal -->
                    <div>
                      <label for="start-date"
                        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Tanggal Awal
                      </label>
                      <input id="start-date" type="date" v-model="formStartDate" :disabled="isSaving" :class="[
                        'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 disabled:opacity-50',
                        startDateError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                      ]" />
                      <div v-if="startDateError" class="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                        {{ startDateError }}
                      </div>
                    </div>

                    <!-- Tanggal Akhir -->
                    <div>
                      <label for="end-date"
                        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Tanggal Akhir
                      </label>
                      <input id="end-date" type="date" v-model="formEndDate" :disabled="isSaving" :class="[
                        'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 disabled:opacity-50',
                        endDateError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                      ]" />
                      <div v-if="endDateError" class="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                        {{ endDateError }}
                      </div>
                    </div>
                  </div>

                  <!-- Tipe Dropdown (Headless UI Listbox) -->
                  <div>
                    <label
                      class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Tipe Jadwal
                    </label>
                    <Listbox v-model="formType" :disabled="isSaving">
                      <div class="relative mt-1">
                        <ListboxButton :class="[
                          'relative w-full cursor-pointer rounded-lg border py-2.5 pl-3 pr-10 text-left text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 disabled:opacity-50',
                          typeError ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                        ]">
                          <span class="block truncate capitalize">{{ getTypeName(formType) }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                              stroke="currentColor" class="w-4 h-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </ListboxButton>

                        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                          leave-to-class="opacity-0">
                          <ListboxOptions
                            class="absolute z-60 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border border-slate-200 dark:border-slate-700">
                            <ListboxOption v-slot="{ active, selected }"
                              v-for="typeOption in ['libur', 'imple', 'freeze']" :key="typeOption" :value="typeOption"
                              as="template">
                              <li :class="[
                                active ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200' : 'text-slate-900 dark:text-slate-100',
                                'relative cursor-pointer select-none py-2 pl-10 pr-4 text-sm'
                              ]">
                                <span
                                  :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate capitalize']">
                                  {{ getTypeName(typeOption) }}
                                </span>
                                <span v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                    <div v-if="typeError" class="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                      {{ typeError }}
                    </div>
                  </div>

                  <!-- Jam / Waktu (Hanya tampil jika tipe adalah Imple) -->
                  <div v-if="formType === 'imple'" class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="start-time"
                        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Jam Mulai
                      </label>
                      <input id="start-time" type="time" v-model="formStartTime" :disabled="isSaving" :class="[
                        'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 disabled:opacity-50',
                        startTimeError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                      ]" />
                      <div v-if="startTimeError" class="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                        {{ startTimeError }}
                      </div>
                    </div>

                    <div>
                      <label for="end-time"
                        class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Jam Selesai
                      </label>
                      <input id="end-time" type="time" v-model="formEndTime" :disabled="isSaving" :class="[
                        'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 disabled:opacity-50',
                        endTimeError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                      ]" />
                      <div v-if="endTimeError" class="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                        {{ endTimeError }}
                      </div>
                    </div>
                  </div>

                  <!-- Buttons -->
                  <div class="mt-6 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                    <button type="button" :disabled="isSaving"
                      class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition disabled:opacity-50 cursor-pointer"
                      @click="closeAddModal">
                      Batal
                    </button>
                    <button type="submit" :disabled="isSaving"
                      class="px-4 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition flex items-center gap-2 disabled:bg-slate-400 dark:disabled:bg-slate-750 disabled:cursor-not-allowed cursor-pointer">
                      <svg v-if="isSaving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild, Switch, Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import type { EventItem } from './types'
import { toast } from 'vue3-toastify'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const isDark = ref(false)
watch(isDark, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

// Mock Data Jadwal / Events
const events = ref<EventItem[]>([
  {
    id: '2a',
    title: 'Cuti Bersama',
    startDate: '2026-06-15',
    endDate: '2026-06-17',
    color: 'amber',
    tag: 'libur',
    badge: { text: 'L', color: 'bg-rose-600' },
  },
  {
    id: '1',
    title: 'Workshop Vue 3 & TS',
    startDate: '2026-07-07',
    endDate: '2026-07-09',
    time: '09:00 - 15:00',
    color: 'blue',
    tag: 'event',
    badge: { text: 'W', color: 'bg-blue-600' },
  },
  {
    id: '2',
    title: 'Cuti Bersama',
    startDate: '2026-07-15',
    endDate: '2026-07-17',
    color: 'amber',
    tag: 'libur',
    badge: { text: 'L', color: 'bg-rose-600' },
  },
  {
    id: '2',
    title: 'Freeze',
    startDate: '2026-08-15',
    endDate: '2026-08-17',
    color: 'gray',
    tag: 'freeze',
    badge: { text: 'L', color: 'bg-rose-600' },
  },
  {
    id: '3',
    title: 'Evaluasi Kuartal',
    startDate: '2026-07-28',
    endDate: '2026-07-28',
    time: '13:00',
    color: 'purple',
    tag: 'event',
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
  if (selectedDateEvents.value.length === 0) return
  isOpen.value = true
}

const closeModal = () => {
  if (isActionLoading.value || isDeleteConfirmOpen.value) return
  isOpen.value = false
}

// Modal Detail Jadwal Edit/Hapus State
const isActionLoading = ref(false)
const loadingEventId = ref<string | null>(null)
const editingEventId = ref<string | null>(null)
const editingEventTitle = ref('')
const editTitleError = ref('')

const startEditing = (event: EventItem) => {
  editingEventId.value = event.id
  editingEventTitle.value = event.title
  editTitleError.value = ''
}

const cancelEditing = () => {
  editingEventId.value = null
  editingEventTitle.value = ''
  editTitleError.value = ''
}

const saveEditEvent = async () => {
  if (!editingEventId.value) return
  const titleTrimmed = editingEventTitle.value.trim()
  if (!titleTrimmed) {
    editTitleError.value = 'Judul jadwal tidak boleh kosong.'
    return
  }

  isActionLoading.value = true
  loadingEventId.value = editingEventId.value
  editTitleError.value = ''

  try {
    // Mock API Call (1.5 seconds delay)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const eventToEdit = events.value.find((e) => e.id === editingEventId.value)
    if (eventToEdit) {
      eventToEdit.title = titleTrimmed
    }

    toast.success('Judul jadwal berhasil diperbarui!', {
      position: 'top-right'
    })

    cancelEditing()
  } catch (error) {
    console.error('Failed to edit event:', error)
    toast.error('Gagal memperbarui judul jadwal.', {
      position: 'top-right'
    })
  } finally {
    isActionLoading.value = false
    loadingEventId.value = null
  }
}

// Modal Konfirmasi Hapus State
const isDeleteConfirmOpen = ref(false)
const isDeleteLoading = ref(false)
const eventIdToDelete = ref<string | null>(null)

const getTypeName = (type: string) => {
  if (type === 'libur') return 'Libur'
  if (type === 'imple') return 'Imple'
  if (type === 'freeze') return 'Freeze'
  return type
}

const closeDeleteConfirmModal = () => {
  if (isDeleteLoading.value) return
  isDeleteConfirmOpen.value = false
  eventIdToDelete.value = null
}

const deleteEvent = (eventId: string) => {
  eventIdToDelete.value = eventId
  isDeleteConfirmOpen.value = true
}

const confirmDeleteEvent = async () => {
  if (!eventIdToDelete.value) return

  isDeleteLoading.value = true
  isActionLoading.value = true
  loadingEventId.value = eventIdToDelete.value

  try {
    // Mock API Call (1.5 seconds delay)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    events.value = events.value.filter((e) => e.id !== eventIdToDelete.value)

    toast.success('Jadwal berhasil dihapus!', {
      position: 'top-right'
    })

    isDeleteConfirmOpen.value = false
  } catch (error) {
    console.error('Failed to delete event:', error)
    toast.error('Gagal menghapus jadwal.', {
      position: 'top-right'
    })
  } finally {
    isDeleteLoading.value = false
    isActionLoading.value = false
    loadingEventId.value = null
    eventIdToDelete.value = null
  }
}

// Modal Tambah Jadwal State
const isAddOpen = ref(false)
const isSaving = ref(false)

// Default to today helper
const getTodayStr = () => {
  const today = new Date()
  const yearStr = today.getFullYear()
  const monthStr = String(today.getMonth() + 1).padStart(2, '0')
  const dayStr = String(today.getDate()).padStart(2, '0')
  return `${yearStr}-${monthStr}-${dayStr}`
}

// Yup Validation Schema
const schema = yup.object({
  title: yup.string().required('Judul jadwal wajib diisi.').trim(),
  startDate: yup.string().required('Tanggal awal wajib diisi.'),
  endDate: yup.string()
    .required('Tanggal akhir wajib diisi.')
    .test('date-range', 'Tanggal akhir tidak boleh lebih awal dari tanggal awal.', function (value) {
      const { startDate } = this.parent
      if (!startDate || !value) return true
      return value >= startDate
    }),
  eventType: yup.string().oneOf(['libur', 'imple', 'freeze']).required('Tipe jadwal wajib diisi.'),
  startTime: yup.string().nullable().when('eventType', {
    is: 'imple',
    then: (schema) => schema.required('Jam mulai wajib diisi untuk Imple.'),
    otherwise: (schema) => schema.nullable().notRequired()
  }),
  endTime: yup.string().nullable().when('eventType', {
    is: 'imple',
    then: (schema) => schema.test('time-range', 'Jam selesai tidak boleh lebih awal dari jam mulai.', function (value) {
      const { startTime } = this.parent
      if (!startTime || !value) return true
      return value >= startTime
    }),
    otherwise: (schema) => schema.nullable().notRequired()
  })
})

const { handleSubmit, errors, resetForm: resetVeeForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    startDate: getTodayStr(),
    endDate: getTodayStr(),
    eventType: 'libur' as 'libur' | 'imple' | 'freeze',
    startTime: '',
    endTime: ''
  }
})

// Bindings for template inputs using useField
const { value: formTitle, errorMessage: titleError } = useField<string>('title')
const { value: formStartDate, errorMessage: startDateError } = useField<string>('startDate')
const { value: formEndDate, errorMessage: endDateError } = useField<string>('endDate')
const { value: formType, errorMessage: typeError } = useField<'libur' | 'imple' | 'freeze'>('eventType')
const { value: formStartTime, errorMessage: startTimeError } = useField<string>('startTime')
const { value: formEndTime, errorMessage: endTimeError } = useField<string>('endTime')

const resetForm = () => {
  resetVeeForm({
    values: {
      title: '',
      startDate: getTodayStr(),
      endDate: getTodayStr(),
      eventType: 'libur',
      startTime: '',
      endTime: ''
    }
  })
}

const openAddEventModal = () => {
  resetForm()
  isAddOpen.value = true
}

const closeAddModal = () => {
  if (isSaving.value) return
  isAddOpen.value = false
}

const saveEvent = handleSubmit(async (values) => {
  isSaving.value = true

  try {
    // Mock API Call (2 seconds delay)
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock a 5% chance of API error to demonstrate error toast handling
        if (Math.random() < 0.05) {
          reject(new Error('Koneksi database terputus.'))
        } else {
          resolve(true)
        }
      }, 2000)
    })

    let formattedTime: string | undefined = undefined
    if (values.eventType === 'imple') {
      if (values.startTime && values.endTime) {
        formattedTime = `${values.startTime} - ${values.endTime}`
      } else if (values.startTime) {
        formattedTime = values.startTime
      }
    }

    const newEvent: EventItem = {
      id: Date.now().toString(),
      title: values.title.trim(),
      startDate: values.startDate,
      endDate: values.endDate,
      color: values.eventType === 'libur' ? 'amber' : values.eventType === 'imple' ? 'blue' : 'gray',
      tag: 'event',
      badge: {
        text: values.eventType === 'libur' ? 'L' : values.eventType === 'imple' ? 'I' : 'F',
        color: values.eventType === 'libur' ? 'bg-rose-600' : values.eventType === 'imple' ? 'bg-blue-600' : 'bg-gray-600',
      },
      ...(formattedTime ? { time: formattedTime } : {}),
    }

    events.value.push(newEvent)

    // Show success toast notification
    toast.success('Jadwal baru berhasil disimpan!', {
      position: 'top-right',
    })

    isAddOpen.value = false
    resetForm()
  } catch (error: any) {
    console.error('Failed to save event:', error)
    // Show error toast notification
    toast.error(`Gagal menyimpan jadwal: ${error.message || 'Server error'}`, {
      position: 'top-right',
    })
  } finally {
    isSaving.value = false
  }
})
</script>

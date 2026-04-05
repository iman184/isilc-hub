import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // ── Navigation ──────────────────────────────────────────────────
      activeTab: 'resources',
      setActiveTab: (tab) => set({ activeTab: tab }),

      // ── Resources filters ────────────────────────────────────────────
      resourceSearch: '',
      resourceFilter: 'all',
      setResourceSearch: (search) => set({ resourceSearch: search }),
      setResourceFilter: (filter) => set({ resourceFilter: filter }),

      // ── Module progress ──────────────────────────────────────────────
      /** @type {Record<string, boolean>} key: `${moduleId}-${resourceKey}` */
      progress: {},
      toggleProgress: (moduleId, resourceKey) => {
        const key = `${moduleId}-${resourceKey}`
        set((state) => ({
          progress: { ...state.progress, [key]: !state.progress[key] },
        }))
      },
      getProgress: (moduleId, resourceKey) => {
        return get().progress[`${moduleId}-${resourceKey}`] ?? false
      },

      // ── Bookmarks ────────────────────────────────────────────────────
      /** @type {string[]} */
      bookmarks: [],
      toggleBookmark: (moduleId) => {
        set((state) => ({
          bookmarks: state.bookmarks.includes(moduleId)
            ? state.bookmarks.filter((id) => id !== moduleId)
            : [...state.bookmarks, moduleId],
        }))
      },
      isBookmarked: (moduleId) => get().bookmarks.includes(moduleId),

      // ── Notes ────────────────────────────────────────────────────────
      /** @type {Record<string, string>} */
      notes: {},
      setNote: (moduleId, text) => {
        set((state) => ({
          notes: { ...state.notes, [moduleId]: text },
        }))
      },

      // ── Grades (calculator) ──────────────────────────────────────────
      /** @type {Record<string, {td: string, exam: string}>} */
      grades: {},
      setGrade: (moduleId, field, value) => {
        set((state) => ({
          grades: {
            ...state.grades,
            [moduleId]: { ...(state.grades[moduleId] ?? {}), [field]: value },
          },
        }))
      },

      // ── Timetable group ──────────────────────────────────────────────
      selectedGroup: 'G1',
      setSelectedGroup: (group) => set({ selectedGroup: group }),

      // ── Announcements ────────────────────────────────────────────────
      /** @type {number[]} */
      dismissedAnnouncements: [],
      dismissAnnouncement: (id) => {
        set((state) => ({
          dismissedAnnouncements: [...state.dismissedAnnouncements, id],
        }))
      },
    }),
    {
      name: 'isil-hub-v1',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        progress: state.progress,
        notes: state.notes,
        grades: state.grades,
        selectedGroup: state.selectedGroup,
        dismissedAnnouncements: state.dismissedAnnouncements,
        activeTab: state.activeTab,
      }),
    }
  )
)

export default useStore

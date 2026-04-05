import useStore from './app/store'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ResourcesPage } from './pages/ResourcesPage'
import { TimetablePage } from './pages/TimetablePage'
import { CalculatorPage } from './pages/CalculatorPage'
import { BookmarksPage } from './pages/BookmarksPage'
import { ProfilePage } from './pages/ProfilePage'

const PAGE_MAP = {
  resources: ResourcesPage,
  timetable: TimetablePage,
  calculator: CalculatorPage,
  bookmarks: BookmarksPage,
  profile: ProfilePage,
}

export default function App() {
  const activeTab = useStore((s) => s.activeTab)
  const ActivePage = PAGE_MAP[activeTab] ?? ResourcesPage

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <main className="flex-1">
        <ActivePage />
      </main>
      <Footer />
    </div>
  )
}

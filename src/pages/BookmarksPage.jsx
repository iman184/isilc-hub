import useStore from '../app/store'
import { BookmarksList } from '../features/bookmarks/BookmarksList'
import { PageHeader } from '../components/common/PageHeader'

export function BookmarksPage() {
  const bookmarks = useStore((s) => s.bookmarks)

  return (
    <section className="max-w-[1100px] mx-auto px-5 py-7">
      <PageHeader
        title="Favoris"
        subtitle={
          bookmarks.length > 0
            ? `${bookmarks.length} module${bookmarks.length !== 1 ? 's' : ''} sauvegardé${bookmarks.length !== 1 ? 's' : ''}`
            : 'Tes modules favoris apparaîtront ici'
        }
      />
      <BookmarksList />
    </section>
  )
}

import { ProfileView } from '../features/profile/ProfileView'
import { PageHeader } from '../components/common/PageHeader'

export function ProfilePage() {
  return (
    <section className="max-w-[1100px] mx-auto px-5 py-7">
      <PageHeader />
      <ProfileView />
    </section>
  )
}

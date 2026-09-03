import { Helmet } from 'react-helmet-async'
import { ProfileHeader } from '../components/ProfileHeader'
import { ProjectsSection } from '../components/ProjectsSection'
import { SiteFooter } from '../components/SiteFooter'
import { projects } from '../data/projects'
import { externalLinks } from '../data/externalLinks'
import { profile } from '../data/profile'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>{profile.title}</title>
        <meta name="description" content={profile.description} />
      </Helmet>

      <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#ffb6f9,#a0e9ff,#caa8ff)] bg-[length:300%_300%] text-slate-900 animate-gradientMove">
        <section className="flex min-h-screen items-center justify-center px-5 py-20">
          <ProfileHeader
            name={profile.name}
            role={profile.role}
            bio={profile.bio}
            githubUrl={profile.githubUrl}
            externalLinks={externalLinks}
          />
        </section>

        <ProjectsSection projects={projects} />

        <SiteFooter name={profile.name} />
      </main>
    </>
  )
}

import fs from 'fs'
import path from 'path'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import Projects from '../components/projects/projects'

export default function IndexPage({projects}) {
  return (
    <Layout>
      <div className='lg:text-center'>
        <h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10'>
          Liste des projets réalisés
        </h3>
        <p className='mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto'>
          Pour chacun d’entre eux, il y a une vidéo, la documentation ou le code source.
        </p>
      </div>
      <div className='mt-10 container mx-auto'>
        <ul className='md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-x-8 md:gap-y-10'>
          {projects.map(project => <Projects key={project.id} project={project} />)}
        </ul>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const projectsDirectory = path.join(process.cwd(), 'lib')
  const [filename] = fs.readdirSync(projectsDirectory)
  const filePath = path.join(projectsDirectory, filename)
  const rawContents = fs.readFileSync(filePath, 'utf8')
  const projects = JSON.parse(rawContents)

  return {
    props: {
      projects
    }
  }
}

IndexPage.propTypes = {
  projects: PropTypes.array
}

IndexPage.defaultProps = {
  projects: null
}

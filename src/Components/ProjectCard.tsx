import './ProjectCard.css'
import { ICardProject } from '../Types/Types'

const ProjectCard:React.FC<ICardProject> = ({id, name, imgPath}) => {

  return (
    <div className="project-card" key={id}>
        <img className='project-card-img' src={imgPath} alt={imgPath} />
        <label>
            {name}
        </label>
    </div>
  )
}

export default ProjectCard
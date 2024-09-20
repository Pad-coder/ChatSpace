
import SearchInput from './SearchInput'
import Conversations from '../conversation/Conversations'

const sidebar = () => {
  return (
  <div className='sticky top-0 left-0  md:h-[620px] flex flex-col border-r border-gray-700 w-30 md:w-full'>
     <SearchInput/>
     <div className='divider px-1'></div>
     <Conversations /> 
  </div>
  )
}

export default sidebar
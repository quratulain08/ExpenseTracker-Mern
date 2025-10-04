import React,{useContext} from 'react'
import Navbar from './Navbar'
import { UserContext } from '../../context/userContext'
import SideMenu from './SideMenu'

const DashBoardLayout = ({children}) => {
  const { user, isLoading } = useContext(UserContext)

  return (
    <div className='flex'>
      {/* Sidebar always visible on md+ */}
      <div className='hidden md:block'>
        <SideMenu />
      </div>

      {/* Main content */}
      <div className='flex-1 flex flex-col'>
        <Navbar />
        
        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <p>Loading...</p>
          </div>
        ) : user ? (
          <div className='p-5'>{children}</div>
        ) : (
          <div className='flex justify-center items-center h-64'>
            <p>Please log in to access the dashboard.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashBoardLayout

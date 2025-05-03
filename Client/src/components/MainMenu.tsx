import { Link } from 'react-router-dom';

export default function MainMenu() {
  return (
    <div className='flex justify-between items-center py-2'>
      <Link to="/" className='flex justify-center items-center pr-1'><i className="hn hn-home-solid text-[25px]"></i></Link>
      <Link to="/addclimb" className='flex justify-center items-center px-1'><i className="hn hn-plus-solid text-[25px]"></i></Link>
      <Link to="/activity" className='flex justify-center items-center px-1'><i className="hn hn-clock-solid text-[25px]"></i></Link>
      <Link to="/settings" className='flex justify-center items-center px-1'><i className="hn hn-brightness-high text-[25px]"></i></Link>
      <Link to="/moonboard" className='flex justify-center items-center pl-1'><span>moonboard</span></Link>
    </div>
  )
}
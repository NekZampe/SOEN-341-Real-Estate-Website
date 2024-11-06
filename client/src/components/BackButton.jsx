import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/Broker' }) => {
  return (
    <div className='flex'>
      <Link to={destination} className='bg-blue-500 text-white px-4 py-1 rounded-lg w-fit'>
        <BsArrowLeft className='text-2xl' />
        <span className='hover:after:bg-blue-500 hover:content-["Go Back"] hover:bg-opacity-100 hover:px-2 hover:rounded-lg hover:w-fit hover:inline-block hover:transform hover:-translate-x-2 hover:transition-transform hover:duration-300'>Go Back</span>
      </Link>
    </div>
  );
};

export default BackButton;

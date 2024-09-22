import LogoComponent from '@/components/Icons/logo/LogoComponent';
import './index.css'


const TopBarComponent = () => {
  return (
    <div className='flex flex-row w-screen items-center topbar-component h-20'>
      <div className='flex flex-row px-6 gap-28'>
        <LogoComponent />
        <div className='flex items-center gap-6'>
          {/* for loop: */}


        </div>
      </div>
      <div>
        <p>user</p>
      </div>

    </div>
  );
}

export default TopBarComponent;


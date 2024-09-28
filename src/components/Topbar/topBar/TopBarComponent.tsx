import LogoComponent from '@/components/Icons/logo/LogoComponent';
import { Routes } from '@/utils/routes';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import './index.css'
import ProfilePicComponent from '@/components/Icons/profilePic/ProfilePicComponent';


const TopBarComponent = () => {
  const [routes] = useState<[string, string][]>(
    () => Object.entries(Routes) as [string, string][]
  );

  return (
    <div className='flex flex-row w-screen items-center topbar-component h-16'>
      <div className='flex flex-row px-6 gap-14'>
        <LogoComponent />
        <div className='flex items-center gap-6'>
          {
            routes.map(([key, value]) => (
              <Link href={value} key={key} className='anchor-box text-box'>
                <p>{ key }</p>
              </Link>
            ))
          }
        </div>
      </div>
      <div className='flex flex-row gap-3 h-3/4 items-center mr-6'>
        {/* gets subject from localstorage */}
        <div className='h-12 w-12 mt-1 cursor-pointer'>
          <ProfilePicComponent subject='none' />
        </div>
        <div className='flex flex-col gap-1 text-box'>
          <p>username</p>
          <p>role</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TopBarComponent);


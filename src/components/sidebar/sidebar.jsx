import { useUser } from '@clerk/clerk-react';
import { useShowChat } from '../providers/ShowChatProvider';
import { Fragment, useState } from 'react';



function SideBarIcon({ handleClick, label, imageUrl, user }) {
  return (
    <div className="lg:w-auto" onClick={handleClick}>
      <img className="w-7 block mx-auto pb-1" src={imageUrl} alt="" />
      {<p className={`${user && 'lg:hidden'} text-center text-[.6rem]`}>{label}</p>}
    </div>
  );
}
export function Sidebar({ openModal, openIssueModal }) {
  const { user } = useUser();
  const { showChat } = useShowChat();

  return (
    <div
      className={`bg-white backdrop-blur-sm lg:w-20 flex bottom-0 lg:bottom-auto left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-full  lg:flex-col lg:justify-start  items-center fixed lg:relative lg:max-h-[100vh]  border border-gray-200  justify-center gap-8 lg:py-4  z-10  py-4 ${
        showChat && 'hidden'
      }`}
    >
      <SideBarIcon imageUrl={user.imageUrl} label={user.firstName} user />

      <div className="flex lg:flex-1  lg:flex-col  h-auto lg:h-20 p-0 lg:pt-14 lg:gap-8 gap-8 [&>*]:w-7 lg:w-6  py-0">
        <SideBarIcon imageUrl="/icons/home.svg" label="home" />
        <SideBarIcon handleClick={openIssueModal} imageUrl="/icons/add-issue.svg" label="New" />
        <SideBarIcon imageUrl="/icons/repo.svg" label="Repo" />
      </div>
      <SideBarIcon handleClick={openModal} imageUrl="/icons/settings.svg" label="Settings" />
    </div>
  );
}

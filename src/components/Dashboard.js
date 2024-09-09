import React from 'react';
import Board from './Board';

function Dashboard() {
  return (
    <div className='h-screen w-full bg-white'>
      <div className='absolute  h-10 w-full  bg-[#65a2fcdc]'>
        <div className='flex justify-center items-center h-full shadow-md'>
          <span className='font-semibold font-serif text-blue-700'>
            PLAN AND TRACK PROGRESS
          </span>
        </div>
      </div>
      <div className='h-full w-full pt-10  text-white flex justify-center items-center'>
        <div className='w-1/5 h-full bg-[#65a2fcdc] border-t border-[#c2d8f1] block'>
          <div className='w-fit items-start h-10 '>
            <div className='h-10 w-full  rounded-md bg-blue-500 m-2 flex justify-between px-10 items-center text-white font-semibold '>
              <span>{'>'}</span>
              <span>Plan and Track Board</span>
            </div>
          </div>
          <div className='w-fit items-start h-10 '>
            <div className='h-10 w-full  rounded-md bg-blue-500 m-2 flex justify-between px-10 items-center text-white font-semibold '>
              <span>{'>'}</span>
              <span>other</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center w-4/5 h-full bg-blue-200 '>
          <Board />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

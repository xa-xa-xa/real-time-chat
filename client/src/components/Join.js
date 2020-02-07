import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);

  // Render
  return (
    <div className='w-11/12 sm:w-5/12 mx-auto my-auto'>
      <div className='w-full'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h1 className='text-2xl text-center mb-6 text-gray-800'>
            Welcome to Chat!
          </h1>

          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'
            >
              Choose a room you want to join:
            </label>
            <input
              onChange={e => setRoom(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='joinRoom'
              type='text'
              placeholder='choose room'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Name:
            </label>
            <input
              onChange={e => setName(e.target.value)}
              className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              name='name'
              placeholder='please type your name'
            />
            {/* <p className='text-red-500 text-xs italic'>
              Please choose a password.
            </p> */}
          </div>
          <Link
            to={`/chat?name=${name}&room=${room}`}
            onClick={e => (!name || !room ? e.preventDefault() : null)}
            className='flex items-center justify-between'
          >
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Join Chat
            </button>
            <button
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              href='#'
            >
              ?
            </button>
          </Link>
        </form>
        <p className='text-center text-gray-500 text-xs'>
          ©2020 created by AlexK.
        </p>
      </div>
    </div>
  );
};

export default Join;

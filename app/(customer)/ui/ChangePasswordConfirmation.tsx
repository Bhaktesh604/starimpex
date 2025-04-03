import Spinner from '@/components/Spinner';
import React from 'react';

const ChangePasswordConfirmation = ({
  onCancel = () => {},
  onSend = () => {},
  isLoading = false,
}: {
  onCancel: () => void;
  onSend: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-[3] flex justify-center items-center h-full shadow-sm w-dvh' onClick={() => {onCancel();}}>
      <div className='bg-white max-w-xl w-full rounded-[10px] mx-2'>
        <div className='text-tertiary border-b border-primary/50 p-4'>
          <h3 className='font-medium text-2xl text-center'>Change Password</h3>
        </div>
        <div className='py-7'>
          <h2 className='font-medium text-lg text-tertiary text-center mb-2'>
            Are you sure you want to change your password?
          </h2>
          <p className='font-poppins font-normal text-sm text-center mb-7'>
            An email will be sent to reset your password.
          </p>
          <div className='flex justify-center items-center gap-2'>
            <button 
              className='btn border !rounded-md' 
              onClick={onCancel} 
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className='btn btn-tertiary !rounded-md !px-8'
              onClick={(e)=> {e.stopPropagation(); onSend();}} 
              disabled={isLoading}
            >
              {isLoading? <Spinner className='!w-5 !h-5'/> : null} Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordConfirmation;

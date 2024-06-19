import React from 'react';
import { Button, Spinner } from '@nextui-org/react';

const ButtonSubmit = ({ handler, isLoading = true }) => {
  return (
    <div className="relative">
      <Button
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
        onClick={handler}
        // disabled={isLoading}
        isLoading={isLoading}
      >
        Submit
      </Button>
      {/* {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : null} */}
    </div>
  );
};

export default ButtonSubmit;

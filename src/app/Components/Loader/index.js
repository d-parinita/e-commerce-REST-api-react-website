'use client'
import { useLoader } from '@/app/context/LoaderContext';
import React from 'react'
import { DotLoader } from 'react-spinners';

export default function Loader() {

  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <>
    <div className='h-screen flex justify-center items-center'>
        <DotLoader
            color='#fff'
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
    </>
  )
}

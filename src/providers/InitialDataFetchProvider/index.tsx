'use client'
import { useAppDispatch } from '@/redux/hooks';
import { addBrandsAction, addModels } from '@/redux/slices/car.slice';
import { getHomeInitialData } from '@/services/api/vehicle';
import React, { useCallback, useEffect } from 'react'
import { addSyntheticLeadingComment } from 'typescript';
interface InitialDataFetcherProviderProps {
  children: React.ReactNode
}
const InitialDataFetcherProvider = ({ children }: InitialDataFetcherProviderProps) => {
  const dispatch = useAppDispatch()
  const GetInitialData = useCallback(async () => {
    try {
      const res = await getHomeInitialData();
      console.log(res.data);
      dispatch(addBrandsAction(res.data.brand))
      dispatch(addModels(res.data.model))
    } catch (error: any) {
      console.error(error.message);
    }
  }, [dispatch]);
  useEffect(() => {
    GetInitialData();
  }, [GetInitialData]);
  return (
    <div>{children}</div>
  )
}

export default InitialDataFetcherProvider
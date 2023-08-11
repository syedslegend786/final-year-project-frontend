import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ISearch {
    start_date: Date,
    end_date: Date
    brand: string
    model: string
    city: string
    page?: number
    limit?: number
}
interface ICarSlice {
    search: ISearch
    models: string[],
    brands: string[]
}
const initialState: ICarSlice = {
    search: {
        start_date: new Date(),
        brand: "",
        end_date: new Date(),
        model: "",
        city: "",
        limit: 6,
        page: 1
    },
    models: [],
    brands: []
}
const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        addCarFormStateAction: (state, action: PayloadAction<ISearch>) => {
            state.search = action.payload
        },
        addBrandsAction: (state, action: PayloadAction<string[]>) => {
            state.brands = action.payload
        },
        addModels: (state, action: PayloadAction<string[]>) => {
            state.models = action.payload
        }
    }
})


export const { addCarFormStateAction, addBrandsAction, addModels } = carSlice.actions

export default carSlice.reducer


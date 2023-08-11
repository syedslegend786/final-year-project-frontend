import httpCommon from "../httpCommon"

export const createFeedBackApi = async (data: any) => {
    return httpCommon.post("/feedback/create", data)
}
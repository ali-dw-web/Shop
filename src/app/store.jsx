import { create } from 'zustand'
const useStore = create((set) => ({
    finalOrders: [],
    increasePopulation: (code) =>
        set((state) => ({
            finalOrders: state.finalOrders.map((val) => {
                if (val.code === code) {
                    if (val.orders < val.InStock) {
                        return {
                            ...val,
                            orders: Number(val.orders) + 1,
                        }
                    }
                    return val 
                }
                return val 
            }),
        })),


    decreasePopulation: (code) =>
        set((state) => ({
            finalOrders: state.finalOrders.map((val) => {
                if (val.code === code) {
                    if (val.orders > 1) {
                        return {
                            ...val,
                            orders: Number(val.orders) - 1,
                        }
                    }
                    return val 
                }
                return val 
            }),
        })),
    AddOrders: (val) => set((state) => {
        const exist = state.finalOrders.some((t) => t.code == val.code)
        if (!exist) {
            return { finalOrders: [...state.finalOrders, val] }
        } else {
            return state
        }

    }),
    removeOrders: (code) => set((state) => {
        const current = state.finalOrders.filter((s)=> s.code !== code)
        return {finalOrders : current}
    }),

}))
export default useStore
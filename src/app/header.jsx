import { useRouter } from "next/navigation"
export default function Header({ addWishList, cart, blu, finalOrders, wishlist }) {
    const Router = useRouter()

    return (
        <>
            <div className="w-full h-[70px]  bg-[white]  flex justify-between items-center">
                <div className="sm:w-[250px] w-full h-full  flex justify-center items-center">
                    <div className="w-[20%] h-full flex justify-center items-center">
                        <div className="w-[35px] h-[20px]  bg-[#ffd783] rounded-2xl relative">
                            <div className="h-[12px] w-[12px] rounded-[50%] bg-[black] absolute top-[50%] right-[2px] transform translate-y-[-50%]"></div>
                        </div>
                    </div>
                    <div className="sm:w-[50%] w-full h-full flex justify-center items-center">
                        <img className="sm:w-full w-[30%] h-[40%]" src="https://maraviyainfotech.com/projects/mantu-html/assets/img/logo/logo.png" alt="" />
                    </div>
                </div>
                <div className="lg:w-[60%]  h-full  flex justify-end items-center">
                    <div className='w-[50px] h-[50%]  flex sm:hidden text-[black] justify-center items-center icofont-navigation-menu text-[20px] '></div>
                    <div className="w-[60%] h-full  hidden lg:flex justify-around items-center *:text-[black]">
                        <div className="w-[100px] h-[30px] font-[500]  flex justify-center items-center text-[14px]">Home</div>
                        <div className="w-[100px] h-[30px] font-[500] flex justify-center items-center text-[14px]">categories</div>
                        <div className="w-[100px] h-[30px] font-[500] flex justify-center items-center text-[14px]">Pages</div>
                        <div className="w-[100px] h-[30px] font-[500]  flex justify-center items-center text-[14px]">products </div>
                    </div>
                    <div className="w-[200px] h-full  hidden sm:flex  justify-around items-center *:text-[black]">
                        <div className="w-[50px] h-[50px] flex justify-center items-center text-[24px] icofont-search"></div>
                        <div className="w-[50px] h-[50px] flex justify-center items-center text-[24px] icofont-ui-user"></div>
                        <div onClick={addWishList} className="w-[50px] h-[50px] flex justify-center items-center text-[25px] icofont-heart relative">
                            <div className='w-[15px] h-[15px] rounded-[50%] text-[white] flex justify-center items-center text-[13px] bg-[#f90c4c] absolute top-[5px] right-[5px]'>
                                {wishlist?.length}
                            </div>
                        </div>
                        <div onClick={
                            ()=> {
                                    Router.push('./cart')
                            }
                        } className="w-[50px] h-[50px] flex justify-center items-center text-[26px] icofont-shopping-cart relative">
                            <div className='w-[15px] h-[15px] rounded-[50%] text-[white] flex justify-center items-center text-[13px] bg-[#f90c4c] absolute top-[5px] right-[5px]'>{finalOrders.length}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
'use client'
import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import useStore from './store';
import Header from './header';
import { useRouter } from 'next/navigation'



export default function Main() {
    const loading = useRef()
    const [scroll, setScroll] = useState(false)
    const Router = useRouter()
    const last = useRef(0)
    const src = useRef()
    const [data, setData] = useState([])
    const bar = useRef([])
    const blur = useRef()
    const [minor, setMinor] = useState([])
    const minorView = useRef()
    const [wishlist, setWishlist] = useState([])
    const error = useRef()
    const error2 = useRef()
    const error3 = useRef()
    const wishlistMenu = useRef()
    const cart = useRef()
    const { AddOrders, finalOrders, increasePopulation, decreasePopulation, removeOrders } = useStore()




    function changeColor2(e) {
        e.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[1].style.zIndex = '150'

        e.target.parentElement.style.border = '1px solid blue'
        e.target.parentElement.previousElementSibling.style.border = '1px solid grey'
    }
    function changeColor1(e) {

        e.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[1].style.zIndex = '50'

        e.target.parentElement.style.border = '1px solid blue'
        e.target.parentElement.nextElementSibling.style.border = '1px solid grey'
    }
    useEffect(() => {
        const exist = localStorage.getItem('whishlist');
        if (exist && exist !== 'undefined') {
            setWishlist(JSON.parse(exist));
        }
    }, []);
    useEffect(() => {
        bar.current.forEach((val, i) => {
            val.addEventListener('click', (e) => {
                bar.current.forEach((val) => {
                    if (!(e.target.nextElementSibling.getAttribute('data-num') == i)) {
                        val.nextElementSibling.style.height = '0px'
                    }
                })
            })
        })
        fetch('https://6980665e6570ee87d50f1602.mockapi.io/products')
            .then(res => res.json())
            .then(val => {
                if (loading.current) {
                    loading.current.style.display = 'none'
                }
                setData(val)

            })
        const el = src.current;
        if (!el) return;

        const handleMouseDown = () => setScroll(true);
        const handleMouseUp = () => setScroll(false);
        const handleMouseMove = (e) => {
            if (!scroll) return;
            if (e.clientX > last.current) {
                el.scrollBy(-(e.clientX / 55), 0);
            } else {
                el.scrollBy(e.clientX / 55, 0);
            }
            last.current = e.clientX;
        };

        el.addEventListener('mousedown', handleMouseDown);
        el.addEventListener('mouseup', handleMouseUp);
        el.addEventListener('mousemove', handleMouseMove);

        return () => {
            el.removeEventListener('mousedown', handleMouseDown);
            el.removeEventListener('mouseup', handleMouseUp);
            el.removeEventListener('mousemove', handleMouseMove);
        };
    }, [scroll]);
    useEffect(() => {
        localStorage.setItem('whishlist', JSON.stringify(wishlist))
    }, [wishlist])

    function remove() {

        minorView.current.style.transform = 'translateY(150px)'
        minorView.current.style.opacity = '0'
        minorView.current.style.pointerEvents = "none"


        blur.current.style.display = 'none'

    }
    function overview(val, i) {
        setMinor(val)
        minorView.current.style.transform = 'translateY(-25%)'
        minorView.current.style.opacity = '1'
        minorView.current.style.pointerEvents = "auto"
        blur.current.style.display = 'block'



    }
    function plus() {
        setMinor((prev) => {
            let x = Number(prev.orders)
            if (x < prev.InStock) {
                x++
            }
            else {
                error.current.style.right = '20px'
                error.current.style.opacity = '0.8'
                setTimeout(() => {
                    if (error.current) {
                        error.current.style.right = '-300px'
                        error.current.style.opacity = '0'
                    }
                }, 3000)
            }
            return { ...prev, orders: x }




        })
    }
    function minus() {
        setMinor((prev) => {
            let x = Number(prev.orders)
            if (x > 1) {
                x--
            }
            return { ...prev, orders: x }
        })
    }
    function addToWishlist(val) {

        const exist = wishlist.some((s) => Number(s.code) == Number(val.code))
        if (!exist) {
            setWishlist((prev) => [...prev, val])
            error3.current.style.right = '20px'
            error3.current.style.opacity = '0.8'
            setTimeout(() => {
                error3.current.style.right = '-300px'
                error3.current.style.opacity = '0'
            }, 3000)
        } else {
            error2.current.style.right = '20px'
            error2.current.style.opacity = '0.8'
            setTimeout(() => {
                error2.current.style.right = '-300px'
                error2.current.style.opacity = '0'
            }, 3000)
        }

    }
    function removeFromWishlist(val) {


        setWishlist((prev) => {
            const state = prev.filter((s) => s.code !== val.code)
            return state
        })


    }
    function removeWishList() {
        wishlistMenu.current.style.right = '-400px'
        wishlistMenu.current.style.opacity = '0'
        blur.current.style.display = 'none'
    }
    function addWishList() {
        wishlistMenu.current.style.right = '0px'
        wishlistMenu.current.style.opacity = '1'
        blur.current.style.display = 'block'
    }



    return (
        <>
            <div ref={loading} className='w-[100%] h-[100vh] z-[5115595959]  bg-[white] fixed top-0 right-0 flex justify-center items-center'>
                <img className='w-[70px] h-[70px]' src="/loading2.svg" alt="" />
            </div>
            <div ref={blur} className='w-[100%] hidden h-[100%] bg-[black]/70 fixed top-0 right-0 z-[10000000]'></div>
            <div ref={error} className='w-[250px] opacity-0 duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#f90c4c]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-300px] text-[18px] text-[black]'>Out of Stock</div>
            <div ref={error2} className='min-w-[250px] px-3 opacity-0 duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#f90c4c]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-300px] text-[18px] text-[black]'>It is already Selected</div>
            <div ref={error3} className='min-w-[250px] px-3 opacity-0 duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#0be00b]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-300px] text-[18px] text-[black]'>Added to the whishlist</div>
            <div ref={wishlistMenu} className=' duration-300 h-[100%] w-[350px]  bg-[white] fixed top-0 right-[-400px]  z-[10000400]'>
                <div onClick={removeWishList} className='w-[45px] h-[20px] flex justify-center items-center text-[black] icofont-close absolute top-[10px] right-[10px]'></div>
                <div className='w-[100%] h-[40px] pl-3.5 flex justify-start items-center font-[600]  text-[16px] text-[#313b50]'>My WishList</div>
                <div className='w-[93%] h-[80%]  mx-auto flex justify-center content-start flex-wrap scroll23 overflow-y-scroll'>
                    {wishlist?.length == 0 ? <div className='w-[100%] h-[100%] text-[black] flex justify-center content-center flex-wrap'>
                        <div className='w-[100%] flex justify-center items-center text-[20px] text-[#9c9b9b]'>No Selected Item</div>
                        <div className='icofont-prestashop w-[100%] flex justify-center items-center text-[100px] text-[grey]'></div>
                    </div> :
                        wishlist?.map((val, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <div className='w-[100%] h-[100px] border border-[#dbd9d9] rounded-[10px] flex justify-center items-center mt-3'>
                                        <div className='w-[25%] h-[95%] flex justify-center items-center'>
                                            <img className='w-[60px] h-[60px] rounded-[10px] object-fill' src={val.img} alt="" />
                                        </div>
                                        <div className='w-[50%] h-[95%]  flex justify-center content-center flex-wrap'>
                                            <div onClick={() => {
                                                Router.push(`/${val.id}product`)
                                            }} className='w-[100%] h-[30px] hover:text-[#ffd783] duration-300 cursor-pointer text-[14px] text-[#313b50] font-[600] flex justify-start items-center'>{val.productname}</div>
                                            <div className='w-[100%] h-[30px]   flex justify-center items-center'>
                                                <div className='w-[48%] h-[100%]  text-[15px] font-[800]  flex start items-center text-[#313b50]'>${val.price}.00</div>
                                                <span className='text-[black]'>-</span>
                                                <div style={val.InStock > 10 ? { color: 'green' } : { color: 'red' }} className='w-[48%] h-[100%]  font-[600] text-[11px] flex justify-start items-center'>{val.InStock} in stock</div>
                                            </div>
                                        </div>
                                        <div className='w-[25%] h-[95%]  flex justify-end items-start '>
                                            <div onClick={() => removeFromWishlist(val)} className='w-[15px] h-[15px] text-[#7a7a7a] items-center icofont-close mr-[3px]'></div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>

            <div ref={minorView} className=' duration-500  w-[350px] lg:w-[700px] lg:h-[55%] h-[500px] border border-[white] bg-[white] fixed z-[100000000] top-[50%] left-[50%] transform translate-x-[-50%] opacity-0 pointer-events-none translate-y-[-20%] rounded-[25px] bg-[#ffffff] flex justify-around items-center lg:flex-nowrap flex-wrap '>
                <div onClick={remove} className='w-[18px] h-[18px] rounded-[50%] border-3 border-[#e98383] top-[10px] right-[10px] absolute flex justify-center items-center'>
                    <div className='w-[8px] h-[8px] rounded-[50%] bg-[#e98383]'></div>
                </div>
                <div className='lg:w-[40%] w-[80%] lg:h-[90%] h-[50%]  flex justify-center items-center'>
                    <img className='lg:w-[95%] w-[100%] h-[100%] rounded-2xl object-cover' src={minor.img} alt="" />
                </div>
                <div className='lg:w-[55%] h-[90%] w-[80%]'>
                    <div className='
                            w-[100%] lg:min-h-[45px] h-[auto]  text-[#302f2f] text-[20px] lg:text-[25px] flex items-center font-[400]'>
                        {minor.productname}
                    </div>
                    <div className='lg:mt-3.5 w-[100%]'>⭐⭐⭐⭐⭐</div>
                    <div className=' w-[100%] min-h-[45px] lg:mt-3.5 mt-1 lg:text-[15px] text-[14px]  text-[#858282] flex items-center '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1900s.</div>
                    <div className='w-[100%] lg:mt-3.5 mt-1 lg:text-[22px] text-[16px] font-[700] text-[#313b50]  '>${minor.price}</div>
                    <div className='w-[100%] h-[45px]  lg:mt-[30px] mt-[5px] flex justify-start items-center relativve '>

                        <div className='w-[85px] h-[100%] border border-[#858383] rounded-2xl flex justify-center items-center'>
                            <div onClick={plus} className='w-[25%] h-[100%]  flex justify-center items-center text-[black] text-[12px] icofont-plus'></div>
                            <div className='w-[50%] h-[100%]  flex justify-center items-center text-[black]'>{minor.orders}</div>
                            <div onClick={minus} className='w-[25 %] h-[100%]  flex justify-center text-[12px] text-[black] items-center icofont-minus'></div>
                        </div>
                        <div className='w-[130px] h-[100%] hover:*:text-[white]   rounded-[10px] ml-2.5 flex justify-between items-center bg-[#ffd783] hover:bg-[#3a4ee5] duration-400'>
                            <span className='text-[black] w-[30%] icofont-prestashop duration-400 flex justify-end items-center text-[22px]'>

                            </span>
                            <span onClick={() => {
                                Router.push(`/${minor.id}product`)
                            }} className=' w-[70%] text-[black] text-[14px] duration-500 flex justify-start items-center'>Add to Cart</span>
                        </div>
                    </div>
                </div>
            </div>

            <Header addWishList={addWishList} cart={cart} blu={blur} finalOrders={finalOrders} wishlist={wishlist} />
            <div className='w-[98%] lg:h-[75vh] sm:h-[60vh] h-[50vh] border-2 border-[black] mx-auto overflow-hidden rounded-2xl mt-[33px]'>
                <App />
            </div>
            <div className='w-full h-[50px]  mt-7 flex justify-center items-center '>
                <div className='w-[98%] h-full border-b-2 border-[#0000002d] flex justify-center items-center'>
                    <div className='w-[10%] h-full flex justify-around items-center *:text-[18px]'><span className=' text-[black] font-[600]'>New</span><span className='text-[blue] font-[600]'>Arrivals</span></div>
                    <div className='w-[90%] h-full'></div>
                </div>
            </div>
            <div ref={src} className='h-[450px]  mt-[25px] overflow-x-scroll flex justify-around items-center scroll-width-none'>
                <div className='h-full flex justify-around items-center drag-box'>
                    {data?.map((val, i) => {
                        return (
                            <React.Fragment key={`pr${i}`}>
                                <div className=' ml-[20px]  w-[285px] h-full overflow-hidden border border-[#726f6f86] rounded-2xl bg-[#ffffff] flex justify-center items-center'>
                                    <div className=' group h-full w-full  shrink-0 flex justify-center items-center flex-wrap relative' >

                                        <div className=' h-[17px]  absolute top-[5px] left-50% z-[1000000] rounded-[5px] bg-[white] text-[12px] flex justify-center text-[#f90c4c] items-center px-[10px] '>{val.type}</div>
                                        <figure className=' overflow-hidden  w-[90%] h-[60%]   rounded-2xl mt-4 relative'>

                                            <img className='z-[100] absolute top-0 right-0 ' src={val.img} alt="" />
                                            <img className='z-[50] absolute top-0 right-0' src={val.img2} alt="" />
                                        </figure>
                                        <div className='w-[90%] h-[35%]'>
                                            <div className='w-full h-[30px]  relative'>
                                                <div className=' hidden group-hover:flex absolute transform translate-x-[-50%] top-[-15px] left-[50%]  w-[100px] h-[25px]  rounded-[7px] bg-[white] z-[555] flex justify-center items-center'>
                                                    <div onClick={() => overview(val, i)} className=' text-[black] w-[30.33%] h-full  flex justify-center items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                        </svg>
                                                    </div>
                                                    <div className=' text-[black] w-[30.33%] h-full items-center flex justify-center icofont-rebuild'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-recycle" viewBox="0 0 16 16">
                                                            <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244z" />
                                                        </svg>
                                                    </div>
                                                    <div onClick={() => {
                                                        Router.push(`/${val.id}product`)

                                                    }
                                                    } style={{
                                                        color: finalOrders.some(s => s.code == val.code) ? 'blue' : 'black'
                                                    }} className=' w-[30.33%] h-full  flex justify-center icofont-shopping-cart items-center cursor-pointer'></div>
                                                </div>
                                            </div>
                                            <div className=' w-full h-[10px] flex justify-start items-center text-[#8a8888] font-[400] text-[13px]'>
                                                {val.category}
                                            </div>
                                            <div className=' w-full mt-1 h-[30px]   flex justify-start items-center text-[#201f1f] font-[500] text-[16px]'>{val.productname}</div>
                                            <div className='w-full mt-1 h-[30px]  flex justify-start items-center text-[#201f1f] font-[650] text-[16px]'>${val.price}</div>
                                            <div className='w-full h-[40px]   flex justify-start items-center'>
                                                <div className='w-[80%] h-[40px]  flex justify-start items-center'>
                                                    <div className='w-[25px] h-[25px] border border-[#858282]  rounded-[50%] flex justify-center items-center'>
                                                        <div onClick={changeColor1} style={{ backgroundColor: val.color1 }} className='w-[85%] h-[80%] rounded-[50%]'></div>
                                                    </div>
                                                    <div className='w-[25px] h-[25px] border border-[#858282]  rounded-[50%] ml-[5px] flex justify-center items-center'>
                                                        <div onClick={changeColor2} style={{ backgroundColor: val.color2 }} className='w-[85%] h-[85%] rounded-[50%]'></div>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    color: wishlist?.some(s => s.code == val.code) ? 'red' : 'black'
                                                }} onClick={() => addToWishlist(val)} className=' active:text-[20px] duration-75 w-[20%] h-full  text-[black]  flex justify-center items-center icofont-heart'>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>

            </div>
            <div className='w-full xl:h-[230px]  mt-5 flex justify-around items-center xl:flex-nowrap flex-wrap'>
                <div className='lg:w-[23%] sm:w-[48%] w-[98%] lg:h-[230px] h-[180px] border border-[#80808081] bg-[white] rounded-2xl'>
                    <div className='w-full h-[40%]  flex justify-center items-end'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="70%"
                            height="70%"
                            x="0"
                            y="0"

                            viewBox="0 0 512 512"
                            style={{ enableBackground: "new 0 0 512 512" }}
                            xmlSpace="preserve"

                        >
                            <g>
                                <path
                                    d="m476.158 286.938-13.259-53.035c3.625-.77 6.345-3.986 6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392v-17.637c0-9.136-7.432-16.568-16.568-16.568H246.32l68.24-27.296a8.017 8.017 0 0 0-5.955-14.887l-55.874 22.349c17.026-10.924 33.871-22.947 40.284-31.355 12.485-16.369 9.323-39.843-7.046-52.328-16.369-12.486-39.843-9.323-52.328 7.046-9.122 11.962-21.158 45.573-28.948 69.258-7.79-23.683-19.826-57.296-28.948-69.258-12.484-16.369-35.959-19.53-52.328-7.046-16.369 12.484-19.53 35.958-7.046 52.328 6.413 8.409 23.257 20.431 40.284 31.355l-55.874-22.349a8.014 8.014 0 0 0-10.421 4.466 8.016 8.016 0 0 0 4.466 10.421l68.24 27.296H50.772c-9.136 0-16.568 7.432-16.568 16.568v145.37a8.017 8.017 0 0 0 16.034 0v-145.37c0-.295.239-.534.534-.534h307.841c.295 0 .534.239.534.534v145.372a8.017 8.017 0 0 0 16.034 0v-9.088h94.566l.025.002.026-.001c11.636.009 21.516 7.647 24.908 18.171h-24.928a8.017 8.017 0 0 0-8.017 8.017v17.102c0 13.851 11.268 25.119 25.119 25.119h9.086v35.273h-20.962c-6.886-19.882-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205h-3.86V345.78a8.017 8.017 0 0 0-16.034 0v60.392H192.817c-6.886-19.882-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205H50.772a.534.534 0 0 1-.534-.534v-17.637h34.739a8.017 8.017 0 0 0 0-16.034H8.017a8.017 8.017 0 0 0 0 16.034h26.188v17.637c0 9.136 7.432 16.568 16.568 16.568h43.304c-.002.178-.014.355-.014.534 0 27.995 22.777 50.772 50.772 50.772s50.772-22.777 50.772-50.772c0-.18-.012-.356-.014-.534h180.67c-.002.178-.014.355-.014.534 0 27.995 22.777 50.772 50.772 50.772 27.995 0 50.772-22.777 50.772-50.772 0-.18-.012-.356-.014-.534h26.203a8.017 8.017 0 0 0 8.017-8.017v-85.511c.001-21.114-15.576-38.656-35.841-41.74zM172.9 121.059c-31.623-19.651-41.003-28.692-43.78-32.334-7.123-9.339-5.319-22.732 4.021-29.855a21.193 21.193 0 0 1 12.893-4.355c6.422 0 12.776 2.886 16.963 8.376 7.755 10.168 19.9 44.391 27.918 69.052a882.38 882.38 0 0 1-18.015-10.884zm45.573 10.883c8.018-24.66 20.163-58.882 27.917-69.052 7.123-9.339 20.516-11.142 29.855-4.02 9.34 7.123 11.143 20.516 4.021 29.855-2.777 3.641-12.157 12.683-43.778 32.333a881.445 881.445 0 0 1-18.015 10.884zm156.709 67.933h60.392c9.725 0 17.637 7.912 17.637 17.637v.534h-78.029v-18.171zm0 86.581V234.08h71.235l13.094 52.376h-84.329zM144.835 457.479c-19.155 0-34.739-15.584-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.584 34.739 34.739s-15.584 34.739-34.739 34.739zm282.188 0c-19.155 0-34.739-15.584-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.584 34.739 34.739s-15.584 34.739-34.739 34.739zm68.944-102.614h-9.086c-5.01 0-9.086-4.076-9.086-9.086v-9.086h18.171v18.172z"
                                    fill="blue"
                                    opacity="1"
                                    data-original="#000000"
                                />
                                <path
                                    d="M144.835 406.172c-9.136 0-16.568 7.432-16.568 16.568s7.432 16.568 16.568 16.568c9.136 0 16.568-7.432 16.568-16.568s-7.432-16.568-16.568-16.568zM427.023 406.172c-9.136 0-16.568 7.432-16.568 16.568s7.432 16.568 16.568 16.568c9.136 0 16.568-7.432 16.568-16.568s-7.432-16.568-16.568-16.568zM332.96 371.967H213.244a8.017 8.017 0 0 0 0 16.034H332.96a8.017 8.017 0 0 0 0-16.034zM127.733 337.763H25.119a8.017 8.017 0 0 0 0 16.034h102.614a8.017 8.017 0 0 0 0-16.034zM127.733 218.046H93.528a8.017 8.017 0 0 0-8.017 8.017v68.409a8.017 8.017 0 0 0 16.034 0v-26.188h17.637a8.017 8.017 0 0 0 0-16.034h-17.637v-18.17h26.188a8.017 8.017 0 0 0 0-16.034zM190.822 272.043c8.023-5.255 13.337-14.317 13.337-24.602 0-16.209-13.186-29.395-29.395-29.395h-21.378a8.017 8.017 0 0 0-8.017 8.017v68.409a8.017 8.017 0 0 0 16.034 0v-17.637h13.346l14.722 22.083a8.008 8.008 0 0 0 6.677 3.571 7.968 7.968 0 0 0 4.439-1.348 8.013 8.013 0 0 0 2.223-11.116l-11.988-17.982zm-16.058-11.241h-13.361V234.08h13.361c7.368 0 13.361 5.993 13.361 13.361s-5.993 13.361-13.361 13.361zM256 286.456h-26.188v-18.198c.177.012.354.027.534.027h17.102a8.017 8.017 0 0 0 0-16.034h-17.102c-.181 0-.357.015-.534.027V234.08H256a8.017 8.017 0 0 0 0-16.034h-34.205a8.017 8.017 0 0 0-8.017 8.017v68.409a8.017 8.017 0 0 0 8.017 8.017H256a8.017 8.017 0 0 0 0-16.033zM315.858 286.456H289.67v-18.171h9.086a8.017 8.017 0 0 0 0-16.034h-9.086V234.08h26.188a8.017 8.017 0 0 0 0-16.034h-34.205a8.017 8.017 0 0 0-8.017 8.017v68.409a8.017 8.017 0 0 0 8.017 8.017h34.205a8.017 8.017 0 0 0 0-16.033z"
                                    fill="blue"
                                    opacity="1"
                                    data-original="#000000"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className='w-full h-[20%]  text-[20px] font-[550] text-[black] flex justify-center items-center'>Free Shipping</div>
                    <div className='w-full min-h-[10%]   text-center flex justify-center items-center text-[15px] font-[400] text-[grey]'>Free shipping on all US order or order above $200</div>
                </div>
                <div className='lg:w-[23%] sm:w-[48%] w-[98%] lg:h-[230px] h-[180px] border border-[#8080808e] bg-[white] rounded-2xl sm:mt-0 mt-[20px]'>
                    <div className='w-full h-[40%]  flex justify-center items-end'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="60"
                            height="60"
                            x="0"
                            y="0"
                            viewBox="0 0 512 512"
                            style={{ enableBackground: "new 0 0 512 512" }}
                            xmlSpace="preserve"

                        >
                            <g fill="blue">
                                <path d="M255.107 65.06c5.562 0 10.071-4.509 10.071-10.071V10.071C265.178 4.509 260.669 0 255.107 0s-10.071 4.509-10.071 10.071v44.918c.001 5.562 4.51 10.071 10.071 10.071zM501.28 345.985l-17.791-17.741c-6.329-6.321-14.764-9.803-23.752-9.803-5.747 0-11.264 1.43-16.153 4.109l-33.526-33.486 1.633-1.631c13.601-13.628 13.596-35.773-.001-49.355a34.57 34.57 0 0 0-17.531-9.48 35.171 35.171 0 0 0 1.389-9.798c0-9.355-3.634-18.127-10.212-24.678a34.575 34.575 0 0 0-17.531-9.48 35.166 35.166 0 0 0 1.389-9.798c0-9.356-3.634-18.127-10.223-24.688a34.735 34.735 0 0 0-17.516-9.455c3.436-11.847.5-25.176-8.82-34.512-7.758-7.725-18.285-11.045-28.43-9.969L237.77 83.645c-10.132-1.922-22.785-3.193-30.772 4.092-.504.46-1.018.989-1.524 1.578-12.384-4.514-26.828-1.826-36.745 8.08-6.579 6.571-10.203 15.339-10.203 24.689 0 3.368.477 6.657 1.386 9.799a34.52 34.52 0 0 0-17.5 9.459c-6.592 6.565-10.227 15.323-10.234 24.662a35.112 35.112 0 0 0 1.39 9.826 34.596 34.596 0 0 0-17.522 9.45c-6.592 6.585-10.222 15.358-10.222 24.703 0 7.158 2.137 13.977 6.097 19.737a34.71 34.71 0 0 0-13.415 8.347c-13.61 13.593-13.615 35.739.009 49.387l1.627 1.62-33.53 33.469c-12.461-5.867-27.814-3.669-38.097 6.601l-17.802 17.752C4.381 353.22.895 361.656.894 370.649c0 8.994 3.487 17.431 9.819 23.756l22.217 22.19c3.935 3.931 10.312 3.927 14.242-.008 3.931-3.935 3.927-10.312-.008-14.242l-22.217-22.19c-2.522-2.519-3.911-5.895-3.911-9.505 0-3.609 1.389-6.984 3.905-9.497L42.744 343.4c4.448-4.443 11.256-5.105 16.426-2.014a10.023 10.023 0 0 0 4.161 3.563l102.093 101.943a10.04 10.04 0 0 0 2.02 2.922 10.024 10.024 0 0 0 2.835 1.984 13.325 13.325 0 0 1 3.352 8.885c0 3.61-1.389 6.985-3.911 9.504l-17.785 17.764c-5.255 5.232-13.803 5.231-19.042.016l-22.217-22.219c-3.933-3.933-10.309-3.933-14.242 0s-3.933 10.309 0 14.242l22.233 22.235c6.544 6.517 15.138 9.774 23.736 9.774 8.6 0 17.204-3.262 23.756-9.785l17.796-17.775c6.332-6.325 9.819-14.761 9.819-23.756 0-6.419-1.785-12.549-5.104-17.835l37.736-37.69.121-.123c4.321-4.467 16.354-3.631 27.991-2.823 8.268.575 17.486 1.214 26.492.176l41.324 41.275c-2.677 4.881-4.106 10.391-4.106 16.129 0 8.985 3.487 17.416 9.819 23.741l17.797 17.775c6.328 6.321 14.763 9.803 23.751 9.803 8.987 0 17.422-3.481 23.751-9.803l107.941-107.81c6.332-6.324 9.819-14.76 9.819-23.754-.001-8.993-3.488-17.429-9.826-23.759zm-267.26-242.55 43.687 8.269-26.149 26.139c-4.045-1.944-9.589-5.57-15.671-11.388-8.325-7.964-14.28-17.159-14.822-22.894l-.001-.009-.001-.003a8.798 8.798 0 0 1-.044-.992c1.317-.32 4.815-.675 13.001.878zm-51.058 8.211c5.102-5.097 13.028-5.685 18.793-1.781 3.267 13.698 14.952 26.113 20.209 31.143 3.896 3.728 16.397 14.905 29.015 17.977a14.685 14.685 0 0 1 2.636 8.442c0 3.965-1.525 7.672-4.304 10.448-2.771 2.776-6.484 4.304-10.456 4.304-3.973 0-7.686-1.528-10.47-4.317l-.001-.001-.005-.005-45.418-45.336c-2.769-2.765-4.294-6.472-4.294-10.436.001-3.965 1.526-7.672 4.295-10.438zm-26.316 43.947c2.771-2.775 6.48-4.304 10.446-4.304 3.971 0 7.692 1.532 10.481 4.318l36.572 36.499c5.759 5.768 5.759 15.154.02 20.902-2.786 2.775-6.512 4.303-10.491 4.303s-7.705-1.528-10.479-4.291l-.001-.001-27.745-27.739c-.043-.043-.09-.083-.134-.127l-8.68-8.676c-2.785-2.782-4.318-6.496-4.315-10.458.004-3.949 1.532-7.644 4.326-10.426zm-26.366 43.938c2.773-2.769 6.49-4.294 10.468-4.294 3.945 0 7.63 1.503 10.391 4.224l27.83 27.817c2.775 2.764 4.304 6.467 4.304 10.427 0 3.959-1.529 7.662-4.315 10.437-2.772 2.768-6.485 4.293-10.456 4.293-3.977 0-7.702-1.529-10.478-4.293l-10.089-10.077-.007-.007-17.647-17.626c-2.782-2.779-4.314-6.491-4.314-10.451 0-3.959 1.532-7.672 4.313-10.45zm-17.54 52.786c2.785-2.782 6.507-4.314 10.48-4.314 3.972 0 7.693 1.531 10.477 4.311l10.103 10.091c2.776 2.764 4.304 6.467 4.304 10.427s-1.529 7.662-4.325 10.448c-2.771 2.775-6.484 4.304-10.456 4.304-3.973 0-7.686-1.528-10.477-4.324l-1.265-1.26c-.017-.017-.03-.035-.046-.051l-.058-.052-8.727-8.693c-5.759-5.771-5.764-15.14-.01-20.887zm205.234 114.458c-3.931-3.936-10.308-3.939-14.242-.009l-8.96 8.949c-8.514 8.514-23.941 7.442-38.86 6.407-16.201-1.126-32.954-2.288-43.795 8.842l-37.095 37.05-92.763-92.627 32.828-32.769c5.426 3.326 11.687 5.109 18.238 5.109 9.359 0 18.135-3.628 24.69-10.195 6.599-6.572 10.234-15.343 10.234-24.699 0-.087-.006-.173-.006-.26.087.001.174.006.261.006 9.346 0 18.115-3.617 24.679-10.173 6.599-6.572 10.234-15.344 10.234-24.699 0-.087-.006-.173-.006-.26.088 0 .176.006.265.006 9.343 0 18.117-3.613 24.725-10.194 6.86-6.871 10.253-15.917 10.188-24.944.09.001.18.006.27.006 9.359-.001 18.134-3.628 24.699-10.205 6.579-6.571 10.203-15.339 10.203-24.689 0-6.539-1.778-12.79-5.093-18.205l28.773-28.761a14.775 14.775 0 0 1 7.559-4.028c.3-.032.596-.08.889-.138 4.446-.613 9.115.759 12.515 4.145 5.759 5.769 5.759 15.155.021 20.903l-8.763 8.727c-.029.029-.06.055-.089.084L299.48 160.23c-3.936 3.93-3.94 10.307-.009 14.242 3.932 3.936 10.308 3.939 14.242.009l8.798-8.786.006-.006 1.33-1.325c5.775-5.722 15.131-5.71 20.9.051 2.776 2.764 4.305 6.467 4.305 10.427 0 3.959-1.529 7.662-4.327 10.448l-8.813 8.831-.003.004-10.092 10.051c-3.941 3.925-3.954 10.302-.029 14.242 3.925 3.941 10.301 3.953 14.242.029l10.138-10.097c2.771-2.776 6.484-4.304 10.456-4.304 3.973 0 7.687 1.528 10.478 4.324 2.776 2.765 4.304 6.468 4.304 10.428 0 3.959-1.528 7.662-4.32 10.442l-17.57 17.577c-3.932 3.934-3.931 10.31.002 14.242a10.038 10.038 0 0 0 7.12 2.948c2.578 0 5.156-.984 7.122-2.951l8.611-8.614c.049-.047.102-.088.151-.137 2.771-2.776 6.484-4.304 10.456-4.304 3.973 0 7.686 1.528 10.467 4.314 5.753 5.747 5.748 15.117 0 20.875l-8.755 8.745-.01.009-.009.10-13.896 13.879c-3.935 3.931-3.939 10.308-.009 14.243a10.042 10.042 0 0 0 7.126 2.954c2.575 0 5.151-.982 7.117-2.945l6.797-6.789 32.577 32.539-92.755 92.642-33.234-33.194a39.602 39.602 0 0 0 6.615-5.323l8.955-8.944c3.937-3.929 3.941-10.306.01-14.241zm169.078 12.472-107.941 107.81c-2.525 2.522-5.905 3.911-9.517 3.911s-6.992-1.389-9.518-3.912l-17.797-17.775c-2.522-2.518-3.911-5.888-3.911-9.489 0-3.6 1.389-6.97 3.911-9.489l107.941-107.81c2.526-2.523 5.905-3.912 9.518-3.912 3.612 0 6.992 1.389 9.524 3.918l17.791 17.741c2.522 2.519 3.911 5.893 3.911 9.503-.001 3.611-1.39 6.986-3.912 9.504zM121.378 56.57a10.039 10.039 0 0 0 7.114 2.942c2.58 0 5.161-.986 7.128-2.957 3.929-3.937 3.923-10.313-.014-14.242L98.908 5.688c-3.936-3.929-10.313-3.924-14.242.014-3.929 3.937-3.923 10.313.014 14.242zM381.722 59.512c2.575 0 5.151-.982 7.117-2.945l36.67-36.626c3.935-3.93 3.939-10.307.008-14.242-3.93-3.935-10.306-3.939-14.242-.008l-36.67 36.626c-3.935 3.93-3.939 10.307-.008 14.242a10.039 10.039 0 0 0 7.125 2.953z"
                                    fill="blue"
                                    opacity="1"
                                />
                                <path d="M62.819 433.204c-3.899 3.966-3.845 10.343.122 14.242l.029.028a10.005 10.005 0 0 0 7.038 2.882c2.607 0 5.214-1.009 7.189-3.018 3.899-3.966 3.83-10.357-.136-14.256-3.965-3.899-10.341-3.844-14.242.122zM342.606 352.267c1.532 0 3.086-.349 4.545-1.084 4.966-2.505 6.961-8.561 4.457-13.527-2.505-4.966-8.562-6.962-13.527-4.457l-.056.028c-4.966 2.505-6.933 8.547-4.429 13.513 1.768 3.508 5.324 5.527 9.01 5.527z"
                                    fill="blue"
                                    opacity="1"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className='w-full h-[20%]   text-[20px] font-[550] text-[black] flex justify-center items-center'>24X7 Support</div>
                    <div className='w-full min-h-[10%]   text-center flex justify-center items-center text-[15px] font-[400] text-[grey]'>Contact us 24 hours live support, 7 days in a week</div>
                </div>
                <div className='lg:w-[23%] sm:w-[48%] w-[98%] lg:h-[230px] h-[180px] border border-[#8080807c] bg-[white] rounded-2xl lg:mt-0 mt-[20px]'>
                    <div className='w-full h-[40%]  flex justify-center items-end mt-[10px]'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="60"
                            height="60"
                            x="0"
                            y="0"
                            viewBox="0 0 512 511"
                            style={{ enableBackground: "new 0 0 512 512" }}
                            xmlSpace="preserve"

                        >
                            <g fill="#ff0000">
                                <path d="M506.813 111.23 307.405 1.734a10.005 10.005 0 0 0-9.625 0l-75.16 41.27a10.029 10.029 0 0 0-4.293 2.36L98.378 111.23a9.994 9.994 0 0 0-5.187 8.766v132.43c-20.234 6.328-38.777 17.488-54.195 32.91C-1.19 325.52-11.438 386.809 13.5 437.844c2.422 4.96 8.41 7.02 13.371 4.594 4.965-2.426 7.02-8.415 4.598-13.375-21.188-43.364-12.48-95.438 21.668-129.586 21.355-21.356 49.746-33.118 79.945-33.118s58.59 11.762 79.945 33.118c21.352 21.351 33.114 49.742 33.114 79.941s-11.762 58.59-33.118 79.945c-34.148 34.149-86.222 42.856-129.585 21.668-4.961-2.426-10.95-.367-13.372 4.594-2.425 4.965-.37 10.953 4.594 13.375a132.667 132.667 0 0 0 58.336 13.5c34.543-.004 68.625-13.45 94.172-38.996 11.715-11.715 20.973-25.23 27.523-39.922l43.09 23.66c1.5.824 3.156 1.235 4.813 1.235s3.316-.41 4.812-1.235L506.812 347.75a10.003 10.003 0 0 0 5.188-8.766v-69.496c0-5.523-4.477-10-10-10s-10 4.477-10 10v63.578l-179.375 98.497V235.39l59.2-32.508v51.531a9.996 9.996 0 0 0 10 10c1.655 0 3.316-.41 4.82-1.238l42.73-23.52a9.992 9.992 0 0 0 5.176-8.758v-62.46L492 136.895v52.597c0 5.524 4.477 10 10 10s10-4.476 10-10v-69.496a9.998 9.998 0 0 0-5.188-8.766zm-204.22-89.324 178.63 98.09-56.348 30.942-178.629-98.09zm0 196.176-178.628-98.086 58.414-32.078 178.633 98.086zm79.192-43.484L203.156 76.512l22.313-12.254 178.633 98.086zM227.168 285.336c-25.133-25.133-58.547-38.973-94.086-38.973-6.723 0-13.363.496-19.89 1.469V136.895l179.437 98.53v196.173l-31.145-17.102c3.067-11.289 4.653-23.062 4.653-35.078 0-35.54-13.84-68.953-38.969-94.082zm187.387-60.348-22.73 12.512v-45.598l22.73-12.48zm0 0"
                                    fill="blue"
                                    opacity="1"
                                />
                                <path d="M502 219.441a10.08 10.08 0 0 0-7.07 2.93 10.073 10.073 0 0 0-2.93 7.07 10.07 10.07 0 0 0 2.93 7.067c1.86 1.863 4.441 2.93 7.07 2.93s5.21-1.067 7.07-2.93a10.07 10.07 0 0 0 2.93-7.067c0-2.632-1.07-5.21-2.93-7.07a10.08 10.08 0 0 0-7.07-2.93zM99.457 389.418a9.973 9.973 0 0 0 7.07-2.926c3.907-3.906 3.907-10.238 0-14.144l-6.925-6.93h59.101c14.336 0 26 11.664 26 26s-11.664 26-26 26h-35.02c-5.523 0-10 4.477-10 10 0 5.520 4.477 9.996 10 9.996h35.02c25.363 0 46-20.633 46-45.996s-20.637-45.996-46-45.996H99.602l6.925-6.93c3.907-3.906 3.907-10.238 0-14.144-3.902-3.903-10.234-3.903-14.14 0l-24 24c-3.903 3.906-3.903 10.238 0 14.144l24 23.996a9.968 9.968 0 0 0 7.07 2.93zM46.074 476.45a9.953 9.953 0 0 1-7.64-3.56l-.02-.023c-3.555-4.226-3.008-10.531 1.219-14.086 4.226-3.558 10.535-3.011 14.09 1.215 3.55 4.23 3.015 10.547-1.211 14.102a9.979 9.979 0 0 1-6.438 2.351zm0 0"
                                    fill="blue"
                                    opacity="1"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className='w-full h-[20%]  text-[20px] font-[550] text-[black] flex justify-center items-center'>30Days Return</div>
                    <div className='w-full min-h-[10%]  text-center flex justify-center items-center text-[15px] font-[400] text-[grey]'>Simply return it within 30 days for an exchange</div>
                </div>
                <div className='lg:w-[23%] sm:w-[48%] w-[98%] lg:h-[230px] h-[180px] border border-[#80808079] bg-[white] rounded-2xl lg:mt-0 mt-[20px]'>
                    <div className='w-full h-[40%]  flex justify-center items-end mt-[10px]'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="60"
                            height="60"
                            x="0"
                            y="0"
                            viewBox="0 0 511 512"
                            style={{ enableBackground: "new 0 0 512 512" }}
                            xmlSpace="preserve"
                        >
                            <g fill="#3b82f6">
                                <path d="M235.793 347.266a10.013 10.013 0 0 0 0-14.149c-3.906-3.898-10.234-3.898-14.145 0-3.898 3.91-3.898 10.238 0 14.149 3.91 3.898 10.239 3.898 14.145 0zM188.45 109.969c0 60.636 49.331 109.972 109.968 109.972s109.969-49.336 109.969-109.972S359.055 0 298.418 0 188.449 49.332 188.449 109.969zm199.945 0c0 49.613-40.364 89.976-89.977 89.976s-89.977-40.363-89.977-89.976c0-49.61 40.364-89.973 89.977-89.973s89.977 40.363 89.977 89.973zm0 0"
                                    fill="#3b82f6"
                                    opacity="1"
                                />
                                <path d="M115.652 509.043c3.875 3.906 10.184 3.95 14.11.082l48.468-47.75c8.235-8.234 10.739-20.426 7.118-31.023l10.425-10.055a29.814 29.814 0 0 1 20.817-8.41h132.902c23.578 0 45.863-9.055 62.758-25.496.695-.676-5.277 6.359 90.668-108.313 14.23-16.836 12.102-42.117-4.75-56.363-16.746-14.113-41.832-12.086-56.102 4.46l-58.992 60.634c-7.449-9.168-18.808-14.883-31.082-14.883h-111.48c-15.864-6.637-32.696-9.996-50.063-9.996-48.14 0-90.176 22.234-112.734 63.922-9.504-1.801-19.528 1.074-26.738 8.285L3.418 381.836c-3.883 3.894-3.89 10.195-.016 14.102zm74.793-227.121c15.313 0 30.118 3.082 44.012 9.16a9.979 9.979 0 0 0 4.008.84h113.527c10.84 0 19.996 8.84 19.996 19.992 0 11.027-8.968 19.996-19.996 19.996h-81.566c-5.52 0-9.996 4.477-9.996 9.996 0 5.524 4.476 9.996 9.996 9.996h81.566c22.051 0 39.988-17.937 39.988-39.988 0-1.758-.125-3.5-.351-5.227 57.066-58.66 65.113-66.902 65.457-67.312 7.125-8.41 19.773-9.477 28.187-2.383 8.422 7.121 9.489 19.762 2.344 28.219L397.95 372.406c-13.094 12.57-30.285 19.489-48.457 19.489H216.59c-13.024 0-25.352 4.98-34.703 14.015l-8.496 8.2-78.32-78.317c18.304-34.34 52.652-53.871 95.374-53.871zm-125.32 66.344c3.297-3.297 8.36-3.891 12.379-1.407 1.73 1.055-3.238-3.468 86.59 86.235 3.996 3.996 3.781 10.363.054 14.09l-41.32 40.707-98.23-98.98zM286.422 49.988v11.715c-11.637 4.125-19.996 15.238-19.996 28.274 0 16.535 13.453 29.992 29.992 29.992 5.512 0 9.996 4.484 9.996 9.996 0 5.512-4.484 9.996-9.996 9.996-4.27 0-8.883-2.684-12.98-7.563-3.555-4.226-9.86-4.77-14.086-1.218-4.227 3.554-4.774 9.86-1.22 14.086 5.345 6.355 11.63 10.785 18.29 13.02v11.667c0 5.524 4.476 9.996 9.996 9.996s9.996-4.472 9.996-9.996v-11.715c11.637-4.129 19.996-15.242 19.996-28.273 0-16.54-13.453-29.992-29.992-29.992-5.512 0-9.996-4.485-9.996-9.996 0-5.512 4.484-10 9.996-10 3.543 0 7.281 1.808 10.812 5.226 3.97 3.84 10.297 3.734 14.137-.23 3.84-3.97 3.735-10.297-.23-14.137-5.075-4.91-10.153-7.688-14.723-9.203V49.988c0-5.523-4.477-10-9.996-10s-9.996 4.477-9.996 10zm0 0"
                                    fill="#blue"
                                    opacity="1"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className='w-full h-[20%]  text-[20px] font-[550] text-[black] flex justify-center items-center'>Payment Secure</div>
                    <div className='w-full min-h-[10%]  text-center flex justify-center items-center text-[15px] font-[400] text-[grey]'>Contact us 24 hours live support, 7 days in a week</div>
                </div>

            </div>
            <div className=" w-[98%] h-[300px] border border-[#b9b6b6] overflow-hidden  mt-7 mx-auto rounded-2xl bg-[#e1e5e9] relative flex justify-center items-center">
                <img className=' absolute top-0 right-0 w-[100%] h-[100%]' src="https://raw.githubusercontent.com/ali-dw-web/img/main/bg.png" alt="" />
                <div className='lg:w-[50%] sm:w-[70%] w-[90%] h-[70%] '>
                    <div className='w-[100%] h-[40%] flex justify-center items-center'>
                        <div className='w-[80px] h-[80px] rounded-[50%] overflow-hidden'>
                            <img className='max-w-full max-h-full object-contain align-middle' src="/img/m.jpg" alt="" />
                        </div>
                    </div>
                    <div className='w-[100%] h-[40%]   text-center flex justify-center items-center text-[#686767]'>A web developer focused on building clean , reliable experiences and turning ideas into real-world products</div>
                    <div className='w-[100%] h-[20%]   text-[#3a4ee5] font-[700] flex justify-center items-center text-[20px]'>Ali Salimi</div>
                    <div className='w-[100%] flex justify-center items-center text-[#7e7d7d]'> Developer</div>
                </div>
            </div>
            <div className='w-[98%] min-h-[330px]  mx-auto mt-4 flex lg:justify-around justify-between items-center lg:flex-nowrap flex-wrap '>
























                <div className='   lg:w-[300px] w-[98%] sm:w-[49%] h-[450px] sm:h-[400px] lg:h-[100%] border border-[#aca9a9b4] bg-[white] rounded-2xl overflow-hidden '>
                    <div className='sm:w-[100%]  lg:h-[200px] sm:h-[250px] h-[280px]   flex justify-center items-center'>
                        <div className='w-[90%] h-[85%] group  rounded-2xl flex justify-center items-center overflow-hidden'>
                            <img className=' w-[100%] h-[100%] group-hover:rotate-[-10deg] duration-400 group-hover:scale-[1.2] transform' src="https://raw.githubusercontent.com/ali-dw-web/img/main/bgd.jpg" alt="" />
                        </div>
                    </div>
                    <div className='w-[100%] h-[150px] '>
                        <div className='w-[90%] h-[20%]  mx-auto text-[grey] text-[13px] flex justify-start items-center '>December 10 , 2026 - Cosmetics</div>
                        <div className='w-[90%] h-[40%]  mx-auto text-[black] font-[600]'>
                            Best Ways to Solve business issue in market
                        </div>
                        <div className='w-[90%] h-[20%]  mx-auto flex justify-start items-center text-[blue] text-[13px]'>
                            Read More <span className=' text-[blue] icofont-curved-double-right'></span>
                        </div>
                    </div>
                </div>
                <div className=' lg:ml-2.5  lg:w-[300px] w-[98%] sm:w-[49%] h-[450px] sm:h-[400px]  lg:h-[100%] border border-[#aca9a9b4] bg-[white] rounded-2xl overflow-hidden sm:mt-0 mt-2.5'>
                    <div className='w-[100%] lg:h-[200px] sm:h-[250px] h-[280px]   flex justify-center items-center'>
                        <div className='w-[90%] h-[85%] group  rounded-2xl flex justify-center items-center overflow-hidden'>
                            <img className=' w-[100%] h-[100%] group-hover:rotate-[-10deg] duration-400 group-hover:scale-[1.2] transform' src="https://raw.githubusercontent.com/ali-dw-web/img/main/bgh.jpg" alt="" />
                        </div>
                    </div>
                    <div className='w-[100%] h-[150px] '>
                        <div className='w-[90%] h-[20%]  mx-auto text-[grey] text-[13px] flex justify-start items-center '>December 10 , 2026 - Cosmetics</div>
                        <div className='w-[90%] h-[40%]  mx-auto text-[black] font-[600]'>
                            Best Ways to Solve business issue in market
                        </div>
                        <div className='w-[90%] h-[20%]  mx-auto flex justify-start items-center text-[blue] text-[13px]'>
                            Read More <span className=' text-[blue] icofont-curved-double-right'></span>
                        </div>
                    </div>
                </div>
                <div className=' lg:ml-2.5  sm:mt-2.5 lg:mt-0 lg:w-[300px] w-[98%] sm:w-[49%] h-[450px] sm:h-[400px] lg:h-[100%] border border-[#aca9a9b4] bg-[white] rounded-2xl overflow-hidden sm:mt-0 mt-2.5 '>
                    <div className='w-[100%] lg:h-[200px] sm:h-[250px] h-[280px]   flex justify-center items-center'>
                        <div className='w-[90%] h-[85%] group  rounded-2xl flex justify-center items-center overflow-hidden'>
                            <img className=' w-[100%] h-[100%] group-hover:rotate-[-10deg] duration-400 group-hover:scale-[1.2] transform' src="https://raw.githubusercontent.com/ali-dw-web/img/main/ggc.jpg" alt="" />
                        </div>
                    </div>
                    <div className='w-[100%] h-[150px] '>
                        <div className='w-[90%] h-[20%]  mx-auto text-[grey] text-[13px] flex justify-start items-center '>December 10 , 2026 - Cosmetics</div>
                        <div className='w-[90%] h-[40%]  mx-auto text-[black] font-[600]'>
                            Best Ways to Solve business issue in market
                        </div>
                        <div className='w-[90%] h-[20%]  mx-auto flex justify-start items-center text-[blue] text-[13px]'>
                            Read More <span className=' text-[blue] icofont-curved-double-right'></span>
                        </div>
                    </div>
                </div>
                <div className=' lg:ml-2.5  sm:mt-2.5 lg:mt-0 lg:w-[300px] w-[98%] sm:w-[49%] h-[450px] sm:h-[400px] lg:h-[100%] border border-[#aca9a9b4] bg-[white] rounded-2xl overflow-hidden sm:mt-0 mt-2.5'>
                    <div className='w-[100%] lg:h-[200px] sm:h-[250px] h-[280px]   flex justify-center items-center'>
                        <div className='w-[90%] h-[85%] group  rounded-2xl flex justify-center items-center overflow-hidden'>
                            <img className=' w-[100%] h-[100%] group-hover:rotate-[-10deg] duration-400 group-hover:scale-[1.2] transform' src="https://raw.githubusercontent.com/ali-dw-web/img/main/bgc.jpg" alt="" />
                        </div>
                    </div>
                    <div className='w-[100%] h-[150px] '>
                        <div className='w-[90%] h-[20%]  mx-auto text-[grey] text-[13px] flex justify-start items-center '>December 10 , 2026 - Cosmetics</div>
                        <div className='w-[90%] h-[40%]  mx-auto text-[black] font-[600]'>
                            Best Ways to Solve business issue in market
                        </div>
                        <div className='w-[90%] h-[20%]  mx-auto flex justify-start items-center text-[blue] text-[13px]'>
                            Read More <span className=' text-[blue] icofont-curved-double-right'></span>
                        </div>
                    </div>
                </div>
            </div>



































        </>
    )
}
function App() {
    return (
        <>
            <Swiper
                speed={1500}
                dir="rtl"
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div style={{ backgroundImage: "url('/img/1.jpg')" }} className=' bg-cover bg-[position:50%_50%] w-full h-full bg-no-repeat flex justify-end items-center'>
                        <div className='w-[50%] h-full  '>
                            <div className='w-full lg:h-[150px] h-[100px] mt-[25px] flex justify-end items-center'>
                                <div className='w-[65px] h-[65px] rotate-[-20deg] animation  bg-[#ffd783]  relative rounded-[5px] ml-[50px] lg:ml-[80px] '>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0 transform rounded-[5px] z-[10000] flex justify-center items-center text-[17px] font-[700] text-[#444a55]'>50% OFF</div>

                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[30deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[60deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[90deg]'>

                                    </div>


                                </div>




                            </div>
                            <div className='w-full lg:h-[150px] h-[100px] flex justify-end items-center'>
                                <div className=' ml-[30px] sm:ml-[50px] lg:ml-[80px] w-[90%] lg:w-[70%] h-full text-[white] sm:text-[40px] text-[30px] font-[400] text-left'>
                                    Fashion Sale for women
                                </div>
                            </div>
                            <div className='  w-full h-[25px] hidden lg:flex justify-end items-center text-[white]'>
                                <div className='   ml-[80px] flex justify-end items-end text-[15px] w-[90%] lg:w-[90%]'>Elevate your every day. Style that speaks volumes.</div>
                            </div>
                            <div className='w-full flex justify-end items-center mt-5 lg:mt-2 '>
                                <div className=' ml-[30px]  sm:ml-[50px] lg:ml-[80px] w-[110px] rounded-xl h-[40px] text-[13px] text-[white] bg-[#3a4ee5]  flex justify-center items-center'>Shop Now</div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: "url('/img/2.jpg')" }} className='bg-cover bg-[position:50%_50%] w-full h-full bg-no-repeat flex justify-end items-center'>
                        <div className='w-[50%] h-full  '>
                            <div className='w-full lg:h-[150px] h-[100px] mt-[25px] flex justify-end items-center'>
                                <div className='w-[65px] h-[65px] rotate-[-20deg] animation  bg-[#ffd783]  relative rounded-[5px] ml-[50px] lg:ml-[80px] '>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0 transform rounded-[5px] z-[10000] flex justify-center items-center text-[17px] font-[700] text-[#444a55]'>50% OFF</div>

                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[30deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[60deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[90deg]'>

                                    </div>


                                </div>




                            </div>
                            <div className='w-full lg:h-[150px] h-[100px] flex justify-end items-center'>
                                <div className=' ml-[30px] sm:ml-[50px] lg:ml-[80px] w-[85%] lg:w-[60%] h-full text-[white] sm:text-[40px] text-[30px] font-[400] text-left'>
                                    Fashion Sale for men
                                </div>
                            </div>
                            <div className='  w-full h-[25px] hidden lg:flex justify-end items-center text-[white]'>
                                <div className=' ml-[80px] flex justify-end items-end text-[15px] w-[90%] lg:w-[90%]'>Wear the change.Fashion that feels good</div>
                            </div>
                            <div className='w-full flex justify-end items-center mt-5 lg:mt-2 '>
                                <div className=' ml-[30px]  sm:ml-[50px] lg:ml-[80px] w-[110px] rounded-xl h-[40px] text-[13px] text-[white] bg-[#3a4ee5]  flex justify-center items-center'>Shop Now</div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: "url('/img/3.jpg')" }} className=' bg-cover bg-[position:50%_50%] w-full h-full bg-no-repeat flex justify-end items-center'>
                        <div className='w-[50%] h-full  '>
                            <div className='w-full lg:h-[150px] h-[100px] mt-[25px] flex justify-end items-center'>
                                <div className='w-[65px] h-[65px] rotate-[-20deg] animation  bg-[#ffd783]  relative rounded-[5px] ml-[50px] lg:ml-[80px] '>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0 transform rounded-[5px] z-[10000] flex justify-center items-center text-[17px] font-[700] text-[#444a55]'>50% OFF</div>

                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[30deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[60deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[90deg]'>

                                    </div>


                                </div>




                            </div>
                            <div className='w-full lg:h-[150px] h-[100px] flex justify-end items-center'>
                                <div className=' ml-[30px] sm:ml-[50px] lg:ml-[80px] w-[90%] lg:w-[70%] h-full text-[white] sm:text-[40px] text-[30px] font-[400] text-left'>
                                    Fashion Sale for Children
                                </div>
                            </div>
                            <div className='  w-full h-[25px] hidden lg:flex justify-end items-center text-[white]'>
                                <div className=' ml-[80px] flex justify-end items-end text-[15px] w-[90%] lg:w-[90%]'>Elevate your every day. Style that speaks volumes.</div>
                            </div>
                            <div className='w-full flex justify-end items-center mt-5 lg:mt-2 '>
                                <div className=' ml-[30px]  sm:ml-[50px] lg:ml-[80px] w-[110px] rounded-xl h-[40px] text-[13px] text-[white] bg-[#3a4ee5]  flex justify-center items-center'>Shop Now</div>
                            </div>
                        </div></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: "url('/img/4.jpg')" }} className='bg-cover bg-[position:50%_50%] w-full h-full bg-no-repeat flex justify-end items-center'>
                        <div className='w-[50%] h-full  '>
                            <div className='w-full lg:h-[150px] h-[100px] mt-[25px] flex justify-end items-center'>
                                <div className='w-[65px] h-[65px] rotate-[-20deg] animation  bg-[#ffd783]  relative rounded-[5px] ml-[50px] lg:ml-[80px] '>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0 transform rounded-[5px] z-[10000] flex justify-center items-center text-[17px] font-[700] text-[#444a55]'>50% OFF</div>

                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[30deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[60deg] '></div>
                                    <div className='w-full h-full bg-[#ffd783] absolute top-0 right-0  rounded-[5px] rotate-[90deg]'>

                                    </div>


                                </div>




                            </div>
                            <div className='w-full lg:h-[150px] h-[100px] flex justify-end items-center'>
                                <div className=' ml-[30px] sm:ml-[50px] lg:ml-[80px] w-[90%] lg:w-[70%] h-full text-[white] sm:text-[40px] text-[30px] font-[400] text-left'>
                                    Fashion Sale for women
                                </div>
                            </div>
                            <div className='  w-full h-[25px] hidden lg:flex justify-end items-center text-[white]'>
                                <div className=' ml-[80px] flex justify-end items-end text-[15px] w-[90%] lg:w-[90%]'>Elevate your every day. Style that speaks volumes.</div>
                            </div>
                            <div className='w-full flex justify-end items-center mt-5 lg:mt-2 '>
                                <div className=' ml-[30px]  sm:ml-[50px] lg:ml-[80px] w-[110px] rounded-xl h-[40px] text-[13px] text-[white] bg-[#3a4ee5]  flex justify-center items-center'>Shop Now</div>
                            </div>
                        </div></div>
                </SwiperSlide>


            </Swiper>

        </>
    );

}


'use client'
import useStore from "../store";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Backup({ id }) {
    const [data, setData] = useState([])
    let num = parseInt(id.slug)
    const [pagination, setPagination] = useState(0)
    const [rating, setRating] = useState(1)
    const [related, setRelated] = useState([])
    const error = useRef()
    const sizeManagement = useRef([])
    const [sendToCart, setSendToCart] = useState(null)
    const { AddOrders, finalOrders } = useStore()
    const error2 = useRef()
    const error3 = useRef()
    const error4 = useRef()
    const error5 = useRef()
    const error6 = useRef()
    const error7 = useRef()
    const loading = useRef()
    const [reviewg, setReviewg] = useState([])

    useEffect(() => {
        fetch('https://699dd26283e60a406a478565.mockapi.io/ReviewShop')
            .then(res => res.json())
            .then(val => {
                setReviewg(val)

            })
        sizeManagement.current.map((val) => {
            val.addEventListener('click', (e) => {
                sizeManagement.current.map((val) => {
                    val.style.background = '#e1e5e9'
                    val.style.color = 'black'
                })
                e.target.style.background = '#3a4ee5'
                e.target.style.color = 'white'
                setSendToCart((prev) => {
                    return { ...prev, size: e.target.getAttribute('data-s') }
                })

            })

        })
        fetch('https://6980665e6570ee87d50f1602.mockapi.io/products')
            .then(res => res.json())
            .then(val => {
                setRelated(val)
            })
        fetch(`https://6980665e6570ee87d50f1602.mockapi.io/products/${num}`)
            .then(res => res.json())
            .then(val => {
                setData(val)
                if (loading.current) {
                    loading.current.style.display = 'none'
                }
            })

    }, [])

    useEffect(() => {
        if (data) {
            setSendToCart({
                code: data.code,
                orders: data.orders,
                color: '',
                size: '',
                img: data.img,
                price: data.price,
                productname: data.productname,
                InStock: data.InStock

            })
        }
    }, [data])
    function increase() {
        setData((prev) => {
            if (prev.orders < prev.InStock) {
                return { ...prev, orders: Number(prev.orders) + 1 }
            } else {
                error.current.style.right = '20px'
                error.current.style.opacity = '0.9'
                setTimeout(() => {
                    error.current.style.right = '-400px'
                    error.current.style.opacity = '0'
                }, 3000)
                return { ...prev }
            }
        })
    }
    function decrease() {
        setData((prev) => {
            if (prev.orders > 1) {
                return { ...prev, orders: Number(prev.orders) - 1 }
            } else {
                return { ...prev }
            }
        })
    }
    function Changepic1(e) {
        e.target.parentElement.previousElementSibling.children[0].style.zIndex = '20'


    }
    function Changepic2(e) {
        e.target.parentElement.previousElementSibling.children[0].style.zIndex = '15'

    }
    function checkout() {
        let check = []
        for (let x in sendToCart) {
            check.push(sendToCart[x])

        }

        const NotCompleted = check.some((s) => s == '')
        console.log(NotCompleted);
        if (NotCompleted == false) {
            const repetition = finalOrders.some((g) => g.code == sendToCart.code)
            if (repetition) {
                error4.current.style.right = '20px'
                error4.current.style.opacity = '1'
                setTimeout(() => {
                    if (error4.current) {
                        error4.current.style.right = '-600px'
                        error4.current.style.opacity = '0'
                    }
                }, 3000)
            } else {
                AddOrders(sendToCart)
                error3.current.style.right = '20px'
                error3.current.style.opacity = '1'
                setTimeout(() => {
                    if (error.current) {
                        error3.current.style.right = '-600px'
                        error3.current.style.opacity = '0'
                    }
                }, 3000)
            }
        } else {
            error2.current.style.right = '20px'
            error2.current.style.opacity = '1'
            setTimeout(() => {
                if (error2.current) {
                    error2.current.style.right = '-600px'
                    error2.current.style.opacity = '0'
                }
            }, 3000)
        }




    }

    function sendReview(e) {
        let name = e.target.previousElementSibling.previousElementSibling.previousElementSibling.children[0]
        let gmail = e.target.previousElementSibling.previousElementSibling.children[0]
        let code = data?.code
        let review = e.target.previousElementSibling.children[0]
        let point = rating
        let pack = [name, gmail, review]
        pack.map((val) => {
            if (val.value == null || val.value == '') {
                val.style.border = '1px solid  red'
            } else {
                val.style.border = '1px solid #838282'
            }
        })
        if (gmail.value.search(/@gmail\.com$/) == -1) {
            error5.current.style.right = '20px'
            error5.current.style.opacity = '1'
            setTimeout(() => {
                if (error5.current) {
                    error5.current.style.right = '-600px'
                    error5.current.style.opacity = '0'
                }
            }, 3000)
            gmail.style.border = '1px solid red'
        }
        if ((name.value !== null || name.value !== '')
            && (gmail.value !== null || gmail.value !== '')
            && (review.value !== null || review.value !== '')
            && (gmail.value.search(/@gmail\.com$/) !== -1)) {
            const exist = reviewg?.some((s) => s.code == code && s.gmail == gmail.value)
            if (exist == true) {
                error6.current.style.right = '20px'
                error6.current.style.opacity = '1'
                setTimeout(() => {
                    if (error6.current) {
                        error6.current.style.right = '-600px'
                        error6.current.style.opacity = '0'
                    }
                }, 3000)
            } else {
                const finalPack = {
                    name: name.value,
                    gmail: gmail.value,
                    code: code,
                    review: review.value,
                    point: point
                }
                fetch(`https://699dd26283e60a406a478565.mockapi.io/ReviewShop`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify(finalPack)
                })
                    .then(res => {
                        if (res.ok) {
                            error7.current.style.right = '20px'
                            error7.current.style.opacity = '1'
                            setTimeout(() => {
                                if (error7.current) {
                                    error7.current.style.right = '-600px'
                                    error7.current.style.opacity = '0'
                                }
                            }, 3000)
                            setReviewg((prev) => [...prev, finalPack])
                        }
                    })
            }
        }



    }
    return (
        <>
            <section className="w-[100%]">
                <div ref={loading} className='w-[100%] h-[100vh] z-[5115595959]  bg-[white] fixed top-0 right-0 flex justify-center items-center'>
                    <img className='w-[70px] h-[70px]' src="/loading2.svg" alt="" />
                </div>
                <div ref={error} className='w-[250px]  duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#f90c4c]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-600px] text-[18px] text-[black]'>Out of Stock</div>
                <div ref={error5} className='w-[250px]  duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#f90c4c]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-600px] text-[18px] text-[black]'> Gmail is not correct</div>
                <div ref={error6} className='w-[400px]  duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#f90c4c]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-600px] text-[18px] text-[black]'>You have submitted your review before</div>
                <div ref={error3} className=" p-5 min-w-[250px] duration-500  h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#06bb15] z-50 border-b-5 flex justify-center items-center right-[-600px] text-[18px] text-[black] pointer-events-auto">
                    <div className="h-[100%] text-[20pxpx] flex justify-center items-center">
                        Added Successfully check
                    </div>
                    <div className=" h-[100%] flex justify-center items-center">
                        <Link className=" text-[blue] text-[px] pl-1.5 underline cursor-pointer relative z-10" href={'./../cart'}>Here</Link>
                    </div>
                </div>
                <div ref={error7} className=" p-5 min-w-[250px] duration-500  h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#06bb15] z-50 border-b-5 flex justify-center items-center right-[-600px] text-[18px] text-[black] pointer-events-auto">
                    <div className="h-[100%] text-[20pxpx] flex justify-center items-center">
                        Your review has been Successfully submitted
                    </div>
                </div>

                <div ref={error4} className='min-w-[250px] p-4  duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#e20707]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-600px] text-[18px] text-[black]'>This Item is already selected check <Link className="text-[blue] underline pl-1.5" href={'./../cart'}>Here</Link></div>
                <div ref={error2} className=' p-4 min-w-[250px]  duration-500 h-[70px] rounded-[10px] bg-[white] fixed top-[20px] border-2 border-[#f90c4c]  z-[10000000000000] border-b-5 flex justify-center items-center right-[-600px] text-[18px] text-[black]'>Check Color , size of the Selected Product</div>
                <div className="w-[95%] h-[70px] mt-5 flex justify-center items-center mx-auto">
                    <div className="lg:w-[100%] sm:w-[66%] w-[100%]  h-[100%] bg-[white] rounded-2xl border border-[#cecccc] flex justify-between items-center">
                        <div className="w-[130px]  h-[100%]   flex justify-center items-center text-[15px] font-[600] text-[black]">Product Page</div>
                        <div className="  h-[100%]   flex justify-center items-center">
                            <div className="w-[80px] h-[100%]  flex justify-center items-center  text-[black] font-[500]">
                                <Link href={'./..'}>Home</Link>
                            </div>
                            <div className="w-[10px] h-[20%] flex justify-center text-[25px] items-center text-[black] icofont-rounded-right "></div>
                            <div className="w-[150px]  h-[100%]   flex justify-center items-center text-[15px] text-[#696868]">Product Page</div>
                        </div>
                    </div>
                </div>
                <div className="w-[95%] lg:h-[80vh] min-h-[80vh] lg:flex-nowrap flex-wrap  mx-auto rounded-2xl mt-3.5  flex justify-around items-center">
                    <div className="  sm:w-[66%] w-[100%] lg:w-[35%] lg:h-[80vh] h-[90vh]  bg-[#f1f4f7]  flex justify-center items-center flex-wrap ">
                        <div className="w-[100%] h-[80%]  flex justify-center items-center rounded-2xl bg-[white] border border-[#cac8c8] relative">
                            <img className="object-fill absolute top-[50%] transform translate-x-[-50%] translate-y-[-50%] left-[50%] w-[90%] h-[90%]  rounded-2xl border border-[#c9c8c8] z-[20] " src={data?.img} alt="" />
                            <img className=" absolute top-[50%] transform translate-x-[-50%] translate-y-[-50%] left-[50%] w-[90%] h-[90%]  rounded-2xl border border-[#c9c8c8] z-[19] " src={data?.img2} alt="" />
                        </div>
                        <div className="w-[60%] h-[15%] border border-[#c4c2c2] rounded-2xl bg-[white] flex justify-center items-center">
                            <div onClick={Changepic1} className="w-[70px] h-[70px] border border-[#c4c0c0] rounded-2xl overflow-hidden object-fill">
                                <img className="w-[100%] h-[100%]" src={data?.img} alt="" />
                            </div>
                            <div onClick={Changepic2} className="w-[70px] h-[70px] border border-[#c4c3c3] rounded-2xl overflow-hidden object-fill ml-3">
                                <img className="w-[100%] h-[100%]" src={data?.img2} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-[66%] w-[100%] lg:w-[35%] h-[80vh]  *:ml-2.5  ">
                        <div className="w-[100%] h-[30px]  mt-3 text-[23px] font-[500] text-[black]">{data?.productname}</div>
                        <div className="w-[60%] h-[50px]  flex justify-start items-center">
                            <div className="w-[120px] h-[100%] flex justify-start items-center pr-2.5 ">
                                <div className="w-[20px]  h-[20px] icofont-star text-[#ffd783] flex justify-start items-center text-[20px] "></div>
                                <div className="w-[20px]  h-[20px]  icofont-star text-[#ffd783] flex justify-center items-center text-[20px] "></div>
                                <div className="w-[20px]  h-[20px]  icofont-star text-[#ffd783] flex justify-center items-center text-[20px] "></div>
                                <div className="w-[20px]  h-[20px]  icofont-star text-[#ffd783] flex justify-center items-center text-[20px] "></div>
                                <div className="w-[20px]  h-[20px]  icofont-star text-[#d1cece] flex justify-center items-center text-[20px] "></div>
                            </div>
                            <div className="w-[2px] h-[38%] bg-[#807e7e]"></div>
                            <div className="w-[42%] h-[100%] flex justify-center items-center   text-[black]
                            text-[13px] font-[500] duration-300 cursor-pointer hover:text-[#fabe3e]">12 Ratings</div>
                        </div>
                        <div className="w-[100%] h-[60px] flex justify-between items-center">
                            <div className="w-[100px] h-[100%]  text-[20px] font-[600]  flex items-center text-[#2c2c2c]">${data?.price}.00</div>
                            <div className="min-w-[100px] h-[100%]  font-[500]  flex items-center text-[17px] text-[blue]">{data?.InStock} IN STOCK</div>
                        </div>
                        <div className="w-[100%] h-[30px] flex justify-between items-center">
                            <div className="w-[150px] h-[100%]  text-[13px] font-[600]  flex items-center text-[#727272]">M.R.P. : $2,999.00</div>
                            <div className=" flex justify-center items-center w-[100px] h-[100%]  font-[800]  flex items-center text-[11px] text-[#6d6d6d]">
                                CODE : #{data?.code}
                            </div>
                        </div>
                        <div className="w-[100%] min-h-[60px]  mt-1.5 text-[14px] font-[400]  text-[#5a5959]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1990.</div>
                        <div className="w-[100%]  h-[75px] ">
                            <div className="w-[100%] h-[50%]  flex justify-start items-center">
                                <div className="w-[7px] h-[7px] border-2 border-[#504e4e] rounded-[50%]"></div>
                                <div className=" h-[100%]  font-[600] ml-1.5 text-[14px] text-[#5f5f5f]  flex justify-center items-center">
                                    Width : <div className="font-[400] text-[15px]"> Medium</div>
                                </div>
                            </div>
                            <div className="w-[100%] h-[13%]  flex justify-start items-center">
                                <div className="w-[7px] h-[7px] border-2 border-[#504e4e] rounded-[50%]"></div>
                                <div className=" h-[100%] font-[600] text-[14px] ml-1.5 text-[#5f5f5f]  flex justify-center items-center">
                                    Outer Material : <div className="font-[400] text-[14px]"> A-Grade Standard Quality</div>
                                </div>
                            </div>
                            <div className="w-[100%] h-[25px]  flex  font-[500] justify-start items-center text-[black] mt-2">SIZE</div>
                            <div className="w-[100%] h-[40px]  flex justify-start items-center">
                                <div ref={(el) => { sizeManagement.current[0] = el }} data-s='S' className="w-[35px] h-[20] text-[13px] cursor-pointer text-[black] border border-[#d6d4d4] rounded-2xl flex justify-center items-center bg-[#e1e5e9] ">S</div>
                                <div ref={(el) => { sizeManagement.current[1] = el }} data-s='M' className="w-[35px] h-[20] ml-1.5 cursor-pointer text-[13px] text-[black] border border-[#d6d4d4] rounded-2xl flex justify-center items-center bg-[#e1e5e9]">M</div>
                                <div ref={(el) => { sizeManagement.current[2] = el }} data-s='L' className="w-[35px] h-[20] ml-1.5 cursor-pointer text-[13px] text-[black] border border-[#d6d4d4] rounded-2xl flex justify-center items-center bg-[#e1e5e9] ">L</div>
                                <div ref={(el) => { sizeManagement.current[3] = el }} data-s='XL' className="w-[35px] h-[20] ml-1.5 cursor-pointer text-[13px] text-[black] border border-[#d6d4d4] rounded-2xl flex justify-center items-center bg-[#e1e5e9] ">XL</div>

                            </div>
                            <div className="w-[100%] h-[30px]  font-[500]  flex justify-start items-center text-[black]">Colors</div>
                            <div className="w-[100%] h-[30px]  flex justify-start items-center">
                                <div className="w-[30px] h-[30px] border border-[#4e4d4d] rounded-[50%] relative">
                                    <div onClick={(e) => {
                                        e.target.parentElement.style.border = '2px solid blue'
                                        e.target.parentElement.nextElementSibling.style.border = '1px solid grey'
                                        setSendToCart((prev) => {
                                            return { ...prev, color: e.target.style.background }
                                        })




                                    }} style={{ background: data.color1 }} className="w-[25px] h-[25px] rounded-[50%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
                                </div>
                                <div className="w-[30px] h-[30px] border border-[#5f5e5e] rounded-[50%] relative ml-2">
                                    <div onClick={(e) => {
                                        e.target.parentElement.style.border = '2px solid blue'
                                        e.target.parentElement.previousElementSibling.style.border = '1px solid grey'
                                        setSendToCart((prev) => {
                                            return { ...prev, color: e.target.style.background }
                                        })




                                    }} style={{ background: data.color2 }} className="w-[25px] h-[25px] rounded-[50%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
                                </div>

                            </div>
                            <div className="w-[100%] h-[50px]  flex justify-start items-center mt-1">
                                <div className="w-[110px] h-[85%] bg-[white] border border-[#807e7e] rounded-xl flex justify-center items-center overflow-hidden">
                                    <div onClick={increase} className="w-[25%] h-[100%]  flex justify-center items-center text-[black] cursor-pointer">+</div>
                                    <div className="w-[50%] h-[100%]  flex justify-center items-center text-[black]">{data.orders}</div>
                                    <div onClick={decrease} className="w-[25%] h-[100%]  flex justify-center items-center text-[black] cursor-pointer">-</div>
                                </div>
                                <div onClick={checkout} className=" ml-[25px] hover:bg-[#ffd783] hover:text-[#11111b] duration-300 w-[140px] h-[85%]  font-[500] bg-[#3a4ee5] text-[white] cursor-pointer rounded-xl flex justify-center items-center"> ADD TO CART</div>
                            </div>

                        </div>

                    </div>
                    <div className="sm:w-[66%] w-[100%] lg:w-[35%] h-[80vh] flex lg:justify-end justify-center items-center 
                    ">
                        <div className="lg:w-[85%] w-[100%] h-[100%] border border-[#aaa8a8] bg-[white] rounded-2xl overflow-hidden flex justify-center content-start flex-wrap">
                            <div className=" w-[85%] h-[45px] border-[#d1d0d0] border-b text-[black] font-[500] text-[20px] flex  items-center">Filter</div>
                            <div className="w-[85%] h-[35px] mt-2   flex justify-between items-center">
                                <span className="font-[500] text-[15px] text-[#222222]">Cosmetics</span>
                                <span className="icofont-plus text-[#424242] text-[12px]"></span>
                            </div>
                            <div className="w-[85%] h-[35px] mt-2   flex justify-between items-center">
                                <span className="font-[500] text-[15px] text-[#222222]">Clothes</span>
                                <span className=" text-[#424242] text-[12px]">-12</span>
                            </div>
                            <div className="w-[85%] h-[35px] mt-2   flex justify-between items-center">
                                <span className="font-[500] text-[15px] text-[#222222]">Shoes</span>
                                <span className=" text-[#424242] text-[12px]">-57</span>
                            </div>
                            <div className="w-[85%] h-[35px] mt-2   flex justify-between items-center">
                                <span className="font-[500] text-[15px] text-[#222222]">Bag</span>
                                <span className="icofont-plus text-[#424242] text-[12px]"></span>
                            </div>
                            <div className="w-[85%] h-[35px] mt-2   flex justify-between items-center">
                                <span className="font-[500] text-[15px] text-[#222222]">Electronics</span>
                                <span className="icofont-plus text-[#424242] text-[12px]"></span>
                            </div>
                            <div className="w-[85%] h-[1px] bg-[#b3b1b1] mt-3"></div>
                            <div className=" w-[85%] h-[45px]  text-[black] font-[500] text-[20px] flex  items-center">Brands</div>
                            <div className="w-[85%] h-[35px]  flex justify-start items-center">
                                <input name="brand" className="w-[15px] h-[15px]" type="radio" />
                                <div className="text-[#474747] text-[14px] font-[500] ml-2.5">Zencart</div>
                            </div>
                            <div className="w-[85%] h-[35px] flex justify-start items-center mt-1.5">
                                <input name="brand" className="w-[15px] h-[15px]" type="radio" />
                                <div className="text-[#474747] text-[14px] font-[500] ml-2.5">Xeta store</div>
                            </div>
                            <div className="w-[85%] h-[35px]  flex justify-start items-center mt-1.5">
                                <input name="brand" className="w-[15px] h-[15px]" type="radio" />
                                <div className="text-[#474747] text-[14px] font-[500] ml-2.5">Pili Market</div>
                            </div>
                            <div className="w-[85%] h-[35px] flex justify-start items-center mt-1.5">
                                <input name="brand" className="w-[15px] h-[15px]" type="radio" />
                                <div className="text-[#474747] text-[14px] font-[500] ml-2.5">Indian Store</div>
                            </div>
                        </div>
                    </div>
                </div>

















                <div className="w-[95%]  mt-7 mx-auto">
                    <div className="w-[100%] h-[13vh]  flex justify-start items-center ">
                        <div onClick={() => {
                            setPagination(0)
                        }} style={pagination == 0 ? { backgroundColor: '#3a4ee5', color: 'white' } : null} className="bg-[white] text-[#131622] h-[65%] font-[500] px-3.5 border border-[#ddd9d9] flex justify-center items-center  rounded-2xl cursor-pointer">Detail</div>
                        <div onClick={() => {
                            setPagination(1)
                        }} style={pagination == 1 ? { backgroundColor: '#3a4ee5', color: 'white' } : null} className="bg-[white] text-[#131622] ml-2.5 h-[65%] font-[500] px-3.5 border border-[#ddd9d9] flex justify-center items-center text-[black] rounded-2xl cursor-pointer">Specifications</div>

                        <div onClick={() => {
                            setPagination(3)
                        }} style={pagination == 3 ? { backgroundColor: '#3a4ee5', color: 'white' } : null} className="bg-[white] text-[#131622] ml-2.5 h-[65%] font-[500] px-3.5 border border-[#ddd9d9] flex justify-center items-center text-[black] rounded-2xl cursor-pointer">Reviews</div>
                    </div>
                    <div className="w-[100%]   rounded-2xl relative overflow-hidden">
                        <div style={pagination == 0 ? { display: 'flex' } : { display: 'none' }} className=" text-[black] w-[100%] h-[80vh] bg-[white] flex justify-center content-start flex-wrap ">
                            <p className="p-6  font-[400] text-[14px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            <div className="w-[100%] h-[150px] ">
                                <div className="w-[100%] h-[25%]  flex justify-start items-center">
                                    <div className="w-[30px] h-[100%] ml-6 flex justify-center items-center">
                                        <div className="w-[7px] h-[7px]  bg-[#8b8a8a] rounded-[50%]"></div>
                                    </div>
                                    <div className=" h-[100%]  text-[12px]  flex justify-center items-center">Any Product types that You want - Simple, Configurable</div>
                                </div>
                                <div className="w-[100%] h-[25%]  flex justify-start items-center">
                                    <div className="w-[30px] h-[100%] ml-6 flex justify-center items-center">
                                        <div className="w-[7px] h-[7px] bg-[#8b8a8a] rounded-[50%]"></div>
                                    </div>
                                    <div className=" h-[100%] text-[12px]  flex justify-center items-center">Downloadable/Digital Products, Virtual Products</div>
                                </div>
                                <div className="w-[100%] h-[25%]  flex justify-start items-center">
                                    <div className="w-[30px] h-[100%] ml-6 flex justify-center items-center">
                                        <div className="w-[7px] h-[7px] bg-[#8b8a8a] rounded-[50%]"></div>
                                    </div>
                                    <div className=" h-[100%] text-[12px] flex justify-center items-center">Flatlock seams throughout.</div>
                                </div>
                                <div className="w-[100%] h-[25%]  flex justify-start items-center">
                                    <div className="w-[30px] h-[100%] ml-6 flex justify-center items-center">
                                        <div className="w-[7px] h-[7px] bg-[#8b8a8a] rounded-[50%]"></div>
                                    </div>
                                    <div className=" h-[100%] text-[12px] flex justify-center items-center">Inventory Management with Backordered items</div>
                                </div>
                            </div>
                            <div className="w-[100%] h-[45%] text-[14px]  p-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</div>
                        </div>
                        <div style={pagination == 1 ? { display: 'flex' } : { display: 'none' }} className=" text-[black] w-[100%] min-h-[47vh] bg-[white] flex flex-wrap content-center items-center ">
                            <div className="w-[100%] min-h-[25vh] p-6 text-[15px] text-[#535353] ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum omnis ex repellendus quia inventore placeat autem consequuntur deleniti fuga. Autem fugit, perspiciatis laborum soluta quidem architecto dolore corrupti deserunt vero.</div>
                            <div className="w-[100%]  h-[20vh] flex justify-start items-center px-6">
                                <div className="w-[100px] h-[100%]  flex justify-center content-start flex-wrap">
                                    <div className="w-[100%] h-[22%]  flex justify-start items-center">
                                        <div className="w-[20%] h-[100%]  flex justify-center items-center">
                                            <div className="w-[7px] h-[7px]  rounded-[50%]  bg-[#7e7d7d]"></div>
                                        </div>
                                        <div className="w-[80%] h-[100%]  flex justify-center items-center text-[15px] font-[500]">Model</div>
                                    </div>
                                    <div className="w-[100%] h-[22%]  flex justify-start items-center">
                                        <div className="w-[20%] h-[100%]  flex justify-center items-center">
                                            <div className="w-[7px] h-[7px]  rounded-[50%]  bg-[#7e7d7d]"></div>
                                        </div>
                                        <div className="w-[80%] h-[100%] flex justify-center items-center text-[15px] font-[500]">weight</div>
                                    </div>
                                    <div className="w-[100%] h-[22%]  flex justify-start items-center">
                                        <div className="w-[20%] h-[100%]  flex justify-center items-center">
                                            <div className="w-[7px] h-[7px]  rounded-[50%]  bg-[#7e7d7d]"></div>
                                        </div>
                                        <div className="w-[80%] h-[100%]  flex justify-center items-center text-[15px] font-[500]">Size</div>
                                    </div>
                                    <div className="w-[100%] h-[22%]  flex justify-start items-center">
                                        <div className="w-[20%] h-[100%]  flex justify-center items-center">
                                            <div className="w-[7px] h-[7px]  rounded-[50%]  bg-[#7e7d7d]"></div>
                                        </div>
                                        <div className="w-[80%] h-[100%]  flex justify-center items-center  text-[15px] font-[500]">Color</div>
                                    </div>
                                </div>
                                <div className="w-[150px] h-[100%] ">
                                    <div className="w-[100%] h-[22%] flex justify-start items-center">

                                        <div className="w-[80%] h-[100%]  flex justify-center items-center text-[#636262] text-[14px] font-[500]">#{data?.code}</div>
                                    </div>
                                    <div className="w-[100%] h-[22%]  flex justify-start items-center">

                                        <div className="w-[80%] h-[100%]  flex justify-center items-center text-[#636262] text-[14px] font-[500]">{data?.Weight}</div>
                                    </div>
                                    <div className="w-[100%] h-[22%]  flex justify-start items-center">

                                        <div className="w-[80%] h-[100%]  flex justify-center items-center text-[#636262] text-[14px] font-[500]">{data?.size}</div>
                                    </div>
                                    <div className="w-[100%] h-[22%]  flex justify-start items-center">

                                        <div className="w-[80%] h-[100%]  flex justify-center items-center text-[#636262] text-[14px] font-[500]">{data?.color}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={pagination == 3 ? { display: 'flex' } : { display: 'none' }} className=" text-[black] w-[100%] h-[100%] bg-[white] justify-center items-center flex-wrap rounded-2xl ">
                            <div className="w-[100%] min-h-[30vh]">
                                {reviewg?.map((val, i) => {
                                    if (val.code == data.code) {
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="w-[95%]  min-h-[25vh] mx-auto mt-2">
                                                    <div className="w-[100%] h-[70px]  flex justify-start items-center">
                                                        <div className="h-[100%] w-[80px]  flex justify-center items-center">
                                                            <div className="w-[50px] h-[50px] border border-[#eeecec] rounded-xl flex justify-center items-center icofont-ui-user bg-[#dde4fa] text-[white] text-[20px]"></div>
                                                        </div>
                                                        <div className="min-w-[150px] h-[100%]  flex justify-center content-center flex-wrap">
                                                            <div className="w-[100%] h-[38%] text-[16px] font-[600] flex justify-start items-center">{val.name}</div>
                                                            <div className="w-[100%] h-[38%]  flex justify-start items-center">
                                                                <span style={val.point >= 1 ? { color: '#ffd783' } : { color: 'grey' }} className="icofont-star text-[#ffd783]"></span>
                                                                <span style={val.point >= 2 ? { color: '#ffd783' } : { color: 'grey' }} className="icofont-star text-[#ffd783]"></span>
                                                                <span style={val.point >= 3 ? { color: '#ffd783' } : { color: 'grey' }} className="icofont-star text-[#ffd783]"></span>
                                                                <span style={val.point >= 4 ? { color: '#ffd783' } : { color: 'grey' }} className="icofont-star text-[#ffd783]"></span>
                                                                <span style={val.point >= 5 ? { color: '#ffd783' } : { color: 'grey' }} className="icofont-star text-[#ffd783]"></span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-[100%] min-h-[90px] text-[13px] border-b border-[#aaa9a9] p-4 font-[500] text-[#414141]">{val.review} </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </div>
                            <div className="w-[100%] h-[70vh]">
                                <div className="mt-1.5 p-4 w-[95%] h-[35px]  mx-auto flex justify-start items-center text-[20px] font-[600]">
                                    Add a Review
                                </div>
                                <div className="w-[95%] h-[80%]  mx-[auto]">
                                    <div className="w-[100%] h-[35px]  flex justify-start items-center  p-4">
                                        <div className="w-[110px] h-[100%]  text-[13px] flex items-center text-[#474747]">Your rating : </div>
                                        <div className="w-[90px] h-[100%] text-[15px] justify-around flex items-center text-[#474747]">
                                            {[1, 2, 3, 4, 5].map((val, i) => {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <span style={rating >= val ? { color: '#ffd783' } : null} onClick={() => {
                                                            setRating(val)
                                                        }} className="icofont-star text-[#949191]"></span>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>

                                    </div>
                                    <div className="w-[100%] h-[50px] flex justify-start items-center mt-[15px]">
                                        <input placeholder="Name" className="w-[100%] h-[85%] pl-2  border border-[#838282] rounded-xl focus:outline-0" type="text" />
                                    </div>
                                    <div className="w-[100%] h-[50px] flex justify-start items-center">
                                        <input placeholder="Email" className="w-[100%] h-[85%] pl-2  border border-[#838282] rounded-xl focus:outline-0" type="text" />
                                    </div>
                                    <div className="w-[100%] h-[180px]">
                                        <textarea placeholder="enter your comment" className="w-[100%] h-[100%]  pl-2  border border-[#838282] rounded-xl focus:outline-0"></textarea>
                                    </div>
                                    <div onClick={sendReview} className="w-[80px] h-[40px] text-[white]  mt-2 rounded-xl bg-[#3a4ee5] flex justify-center items-center">Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[100%] h-[50px]  flex justify-start items-center ">
                        <span className="text-[17px] font-[600] text-[black]">Related </span>
                        <span className="text-[#3a4ee5] font-[600] pl-1.5"> Product</span>
                    </div>
                    <div className="w-[100%]  flex lg:justify-start items-center lg:flex-nowrap flex-wrap justify-center">
                        {related?.map((val, i) => {
                            if (i > 3 && i <= 6) {
                                return (
                                    <React.Fragment key={i}>
                                        <div className="lg:mt-0 mt-2.5 lg:ml-3 lg:w-[350px] sm:w-[66%] w-[100%] h-[120px] border border-[#a19f9f] rounded-2xl bg-[white] flex justify-center items-center">
                                            <div className="w-[30%] h-[100%]  flex justify-center items-center">
                                                <img className="w-[75px] h-[75px] border border-[#e4e2e2] rounded-xl object-fill" src={val.img} alt="" />
                                            </div>
                                            <div className="w-[70%] h-[100%]  flex justify-center content-center flex-wrap">
                                                <div className="w-[100%] h-[28px] text-[#525151] text-[14px] font-[500]  flex items-center">{val?.productname}</div>
                                                <div className="w-[100%] h-[28px]  flex  items-center">
                                                    <span className=" h-[100%]  icofont-star text-[#ffd783] flex justify-center items-center"></span>
                                                    <span className=" h-[100%]  icofont-star text-[#ffd783] flex justify-center items-center"></span>
                                                    <span className=" h-[100%]  icofont-star text-[#ffd783] flex justify-center items-center"></span>
                                                    <span className=" h-[100%]  icofont-star text-[#ffd783] flex justify-center items-center"></span>
                                                    <span className=" h-[100%]  icofont-star text-[#ffd783] flex justify-center items-center"></span>
                                                </div>
                                                <div className="w-[100%] h-[28px] text-[13px] font-[600] text-[black] flex items-center">${val.price}</div>
                                            </div>
                                        </div>

                                    </React.Fragment>
                                )
                            }
                        })}

                    </div>
                </div>
























            </section>
        </>
    )
}
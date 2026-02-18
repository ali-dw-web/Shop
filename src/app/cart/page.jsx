'use client'
import Link from "next/link";

import useStore from "../store";
import React from "react";
import { useEffect, useState } from "react";
export default function Cart() {

    const [total, setTotal] = useState(0)
    const { finalOrders, increasePopulation, decreasePopulation, AddOrders, removeOrders } = useStore()
    useEffect(() => {
        let x = 0
        finalOrders.map((val) => {
            x += val.price * val.orders
        })
        setTotal(x)
    }, [finalOrders])
    return (
        <>
            <section className="w-[100%] min-h-[100vh]">
                <div className="lg:w-[95%] w-[99%] h-[65px]  mx-auto mt-2.5">
                    <div className="lg:w-[100%] sm:w-[85%] w-[100%] h-[60px]  mx-auto  bg-[white] rounded-xl flex justify-between items-center">
                        <div className="w-[130px] h-[100%]  flex items-center justify-center text-[black] font-[600]"> Cart Page</div>
                        <div className="w-[160px] h-[100%]  flex items-center justify-center">
                            <Link href={'./..'} className="text-[black] h-[100%] flex justify-center items-center">Home</Link>
                            <div className="w-[15%] h-[100%]  icofont-curved-double-right flex justify-center text-[black] items-center"></div>
                            <div className=" h-[100%]  flex justify-center items-center text-[black]  text-[13px]">Cart Page</div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-[95%] w-[99%]  mx-auto mt-3.5 flex lg:justify-between justify-center items-center flex-wrap ">
                    <div className="lg:w-[69%] sm:w-[85%] w-[100%] lg:h-[80vh]  bg-[white] rounded-2xl flex justify-center content-start flex-wrap">
                        <div className="w-[95%] h-[50px]  mt-2.5 rounded-2xl bg-[#f1f4f7] flex justify-around items-center">
                            <div className="w-[35%] h-[100%] font-[500] text-[black] flex justify-start items-center pl-2.5">Product</div>
                            <div className="w-[20%] h-[100%] font-[500] text-[black] flex justify-center items-center">Price</div>
                            <div className="w-[20%] h-[100%] font-[500] text-[black] flex justify-center items-center">Quantity</div>
                            <div className="w-[25%] h-[100%] font-[500] text-[black] flex justify-start items-center sm:ml-0 ml-6">total</div>
                        </div>ّ
                        <div className="w-[95%] lg:h-[85%]">
                            {finalOrders.length == 0 ?
                                <div className="w-[100%] h-[100%] flex justify-center content-center flex-wrap">
                                    <div className="text-[#6d6c6c] w-[100%] text-[100px] icofont-prestashop flex justify-center items-center"></div>
                                    <div className="text-[black]  w-[100%] flex justify-center items-center">There is nothing in the cart</div>
                                </div> : finalOrders.map((val , i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <div className=" border-b rounded-2xl border-[#c0bfbf] rounded-2xl mt-3 w-[100%] h-[100px] mt-2.5  bg-[white] flex justify-around items-center flex-wrap overflow-hidden">
                                                <div className="w-[100%] h-[70%]    bg-[white] flex justify-around items-center">
                                                    <div className="w-[35%] h-[100%] font-[500]   text-[black] flex justify-start items-center">
                                                        <div className="w-[35%] h-[100%]  flex justify-center items-center">
                                                            <img className="w-[55px] h-[55px] rounded-xl" src={val.img} alt="" />
                                                        </div>
                                                        <div className="w-[65%] h-[100%]  text-[13px] text-[#555454] flex justify-start items-center">{val.productname}</div>
                                                    </div>
                                                    <div className="w-[20%] h-[100%] font-[500]   text-[#292828] flex justify-center items-center">
                                                        ${val.price}
                                                    </div>
                                                    <div className="w-[20%] h-[100%] font-[500]   text-[black] flex justify-center items-center ">
                                                        <div className="w-[80px] h-[40px] border border-[#979797] rounded-xl flex justify-center items-center overflow-hidden">
                                                            <div className="w-[70%] h-[100%]  flex justify-center items-center ">{val.orders}</div>
                                                            <div className="w-[30%] h-[100%]  ">
                                                                <div onClick={() => increasePopulation(val.code)} className="w-[100%] h-[50%]  icofont-rounded-up text-[black]"></div>
                                                                <div onClick={() => decreasePopulation(val.code)} className="w-[100%] h-[50%]   icofont-rounded-down"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" sm:ml-0 ml-6 w-[25%] h-[100%] font-[500]   text-[black] flex justify-between items-center">
                                                        <span>${val.price * val.orders}</span>
                                                        <span onClick={() => removeOrders(val.code)} className=" w-[30px] icofont-bin hover:text-[#ff9d9d] duration-200 text-[21px] text-[#3a4ee5]"></span>
                                                    </div>
                                                </div>
                                                <div className="w-[100%] h-[30%]  flex justify-between  items-center pl-4">
                                                    <div className="w-[100px] h-[100%] flex justify-start items-center">
                                                        <span className="text-[14px] text-[black]">Color : </span>
                                                        <div className="w-[25px] h-[25px] border border-[#a8a8a8] rounded-[50%] ml-2 flex justify-center items-center">
                                                            <span style={{ backgroundColor: val.color }} className="w-[21px] h-[21px] rounded-[50%] "></span>
                                                        </div>
                                                    </div>
                                                    <div className="w-[100px] h-[100%]  flex justify-center items-center *:flex *:justify-center *:items-center *:text-[black]">
                                                        <span >Size : </span>
                                                        <span className="ml-2.5">{val.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                        </div>

                    </div>
                    <div className="lg:w-[29%] sm:w-[85%] w-[100%] h-[80vh]  bg-[white] rounded-2xl lg:mt-0 mt-3">
                        <div className="w-[100%] h-[50px]    text-[black] pl-2 text-[20px] flex  items-center">Summary</div>
                        <div className="w-[100%] h-[20px] pl-2  flex items-center text-[13px] text-[grey]">Enter your destination to get a shipping estimate</div>
                        <div className="w-[100%] h-[20px]  mt-2 text-[black] text-[15px] pl-2 mt-4">*Country</div>
                        <div className="w-[100%] h-[50px] flex justify-center items-center mt-1.5 ">
                            <select className="text-[black] w-[95%] h-[50px] outline-0 border rounded-xl border-[#bebdbd] mx-auto" name="country" id="">
                                <option value="">United State</option>
                                <option value="">United knigdom</option>
                                <option value="">Canada</option>
                                <option value="">Russia</option>
                                <option value="">Iran</option>
                            </select>
                        </div>
                        <div className="w-[100%] h-[20px]  mt-2 text-[black] text-[15px] pl-2 mt-4">*Province</div>
                        <div className="w-[100%] h-[50px] flex justify-center items-center mt-1.5 ">
                            <select className="text-[black] w-[95%] h-[50px] outline-0 border rounded-xl border-[#bebdbd] mx-auto" name="country" id="">
                                <option value="">Region1 / state1</option>
                                <option value="">Region2 / state2</option>
                                <option value="">Region3 / state3</option>
                                <option value="">Region4 / state4</option>

                            </select>
                        </div>
                        <div className="w-[100%] h-[20px]  mt-2 text-[black] text-[15px] pl-2 mt-4">*ZipCode</div>
                        <div className="w-[100%] h-[50px] flex justify-center items-center mt-1.5 ">
                            <select className="text-[black] w-[95%] h-[50px] outline-0 border rounded-xl border-[#bebdbd] mx-auto" name="country" id="">
                                <option value="">Zipcode1</option>
                                <option value="">Zipcode2</option>
                                <option value="">Zipcode3</option>
                                <option value="">Zipcode4</option>


                            </select>
                        </div>
                        <div className=" mx-auto w-[95%] h-[150px]  ">
                            <div className="w-[100%] h-[20px]  flex justify-between items-center mt-4">
                                <div className=" text-[black] text-[13px] w-[80px] h-[100%]  flex justify-center items-center">SubTotal</div>
                                <div className=" text-[black] text-[13px] w-[80px] h-[100%]  flex justify-center items-center">{total}</div>
                            </div>
                            <div className="w-[100%] h-[20px]  flex justify-between items-center mt-2.5">
                                <div className="pl-2.5 text-[black] text-[13px]  h-[100%]  flex justify-center items-center">Delivery Charges</div>
                                <div className=" text-[black] text-[13px] w-[80px] h-[100%]  flex justify-center items-center">
                                    {finalOrders.length == 0 ? '$0' : '80$'}
                                </div>
                            </div>
                            <div className="w-[100%] h-[30px] flex justify-center items-center">
                                <div className="w-[100%] h-[1px] bg-[grey]"></div>
                            </div>
                            <div className="w-[100%] h-[20px]  flex justify-between items-center ">
                                <div className=" text-[black] text-[18px] w-[80px] h-[100%]  flex justify-center items-center font-[600]">Total</div>
                                <div className=" text-[black] text-[13px] w-[80px] h-[100%] text-[18px] font-[600] flex justify-center items-center">${finalOrders.length == 0 ? '0' : total + 80}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}